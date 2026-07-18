(() => {
  const drawers = window.VisualDirectionRuntime?.drawers;
  const canvases = [...document.querySelectorAll("canvas[data-hero-canvas]")];
  if (!drawers || !canvases.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frameInterval = 1000 / 30;
  const testCost = Math.max(0, Number(new URLSearchParams(location.search).get("motionTestCost")) || 0);
  let animationFrame = 0;
  let resizeFrame = 0;

  const states = canvases.map((canvas) => ({
    canvas,
    ctx: canvas.getContext("2d"),
    kind: canvas.dataset.heroCanvas,
    width: 0,
    height: 0,
    ratio: 1,
    time: 0,
    lastFrame: 0,
    quality: initialQuality(),
    drawSamples: [],
    sampleCount: 0,
    startedAt: 0,
    visible: true,
  })).filter((state) => state.ctx && drawers[state.kind]);

  function initialQuality() {
    return window.innerWidth <= 680 ? .65 : 1;
  }

  function resize(state) {
    const rect = state.canvas.getBoundingClientRect();
    const ratioLimit = window.innerWidth <= 680 ? 1 : 1.5;
    const ratio = Math.min(window.devicePixelRatio || 1, ratioLimit);
    const width = Math.max(1, Math.round(rect.width * ratio));
    const height = Math.max(1, Math.round(rect.height * ratio));
    if (state.canvas.width !== width || state.canvas.height !== height) {
      state.canvas.width = width;
      state.canvas.height = height;
    }
    state.width = rect.width;
    state.height = rect.height;
    state.ratio = ratio;
    state.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(state, trackPerformance = false) {
    resize(state);
    const startedAt = performance.now();
    drawers[state.kind](state, state.time);
    state.canvas.dataset.heroQuality = state.quality.toFixed(2);
    state.canvas.dataset.heroSamples = String(state.sampleCount);
    if (!trackPerformance) return;

    if (testCost) {
      const deadline = performance.now() + testCost;
      while (performance.now() < deadline) {}
    }

    const drawMs = performance.now() - startedAt;
    state.drawSamples.push(drawMs);
    state.sampleCount += 1;
    state.canvas.dataset.heroSamples = String(state.sampleCount);
    if (state.drawSamples.length > 120) state.drawSamples.shift();
    if (state.sampleCount % 15 !== 0) return;

    const recent = state.drawSamples.slice(-15);
    const averageDrawMs = recent.reduce((sum, sample) => sum + sample, 0) / recent.length;
    if (averageDrawMs > 28) state.quality = .45;
    else if (averageDrawMs > 18) state.quality = Math.max(.45, state.quality - .15);
  }

  function canRun(state) {
    return state.visible && !document.hidden && !reduceMotion.matches;
  }

  function loop(time) {
    animationFrame = 0;
    let needsNextFrame = false;
    for (const state of states) {
      if (!canRun(state)) continue;
      needsNextFrame = true;
      const elapsed = state.lastFrame ? time - state.lastFrame : frameInterval;
      if (elapsed < frameInterval - .5) continue;
      state.lastFrame = time;
      state.time += Math.min(elapsed, 80) * 1.35;
      if (!state.startedAt) state.startedAt = performance.now();
      draw(state, true);
    }
    if (needsNextFrame) animationFrame = requestAnimationFrame(loop);
  }

  function schedule() {
    const hasRunningState = states.some(canRun);
    for (const state of states) state.canvas.dataset.heroRunning = String(canRun(state));
    if (hasRunningState && !animationFrame) animationFrame = requestAnimationFrame(loop);
    if (hasRunningState) return;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    for (const state of states) state.lastFrame = 0;
  }

  function redrawStatic() {
    for (const state of states) {
      state.quality = initialQuality();
      draw(state);
    }
  }

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const state = states.find((item) => item.canvas === entry.target);
          if (state) state.visible = entry.isIntersecting;
        }
        schedule();
      }, { rootMargin: "80px 0px" })
    : null;

  for (const state of states) {
    draw(state);
    state.canvas.dataset.heroRunning = String(canRun(state));
    observer?.observe(state.canvas);
  }

  document.addEventListener("visibilitychange", schedule);
  const onMotionChange = () => {
    if (reduceMotion.matches) redrawStatic();
    schedule();
  };
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", onMotionChange);
  else reduceMotion.addListener?.(onMotionChange);
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      redrawStatic();
      schedule();
    });
  }, { passive: true });

  window.__heroCanvasPerformance = {
    snapshot() {
      return states.map((state) => {
        const averageDrawMs = state.drawSamples.length
          ? state.drawSamples.reduce((sum, sample) => sum + sample, 0) / state.drawSamples.length
          : 0;
        const elapsedSeconds = state.startedAt ? Math.max((performance.now() - state.startedAt) / 1000, .001) : 0;
        return {
          kind: state.kind,
          running: canRun(state),
          samples: state.sampleCount,
          fps: elapsedSeconds ? Number((state.sampleCount / elapsedSeconds).toFixed(1)) : 0,
          quality: Number(state.quality.toFixed(2)),
          averageDrawMs: Number(averageDrawMs.toFixed(2)),
          maxDrawMs: Number(Math.max(0, ...state.drawSamples).toFixed(2)),
        };
      });
    },
  };

  schedule();
})();
