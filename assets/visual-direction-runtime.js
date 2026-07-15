(() => {
function clear(state) {
  state.ctx.clearRect(0, 0, state.width, state.height);
}

function getQuality(state) {
  return Math.max(.45, Math.min(1, state.quality ?? 1));
}


function drawDots(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  const quality = getQuality(state);
  const gap = (w < 560 ? 22 : 25) * (1 + (1 - quality) * 1.3);
  const phase = time * .00035;
  for (let y = gap; y < h; y += gap) {
    for (let x = gap; x < w; x += gap) {
      const nx = x / w;
      const ny = y / h;
      const wave = Math.sin(nx * 12 - phase * 9 + ny * 4);
      const radial = Math.sin(Math.hypot(nx - .64, ny - .46) * 24 - phase * 12);
      const energy = Math.max(0, (wave + radial + 1.1) / 3.1);
      const safe = .25 + Math.min(1, Math.abs(nx - .5) * 2.2);
      const r = .8 + energy * 2.7;
      ctx.fillStyle = `rgba(154, 186, 255, ${(.12 + energy * .62) * safe})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}


function drawGlyph(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  const glyphs = "01AXF7KQMPVZ<>[]{}+=/";
  const quality = getQuality(state);
  const cell = (w < 560 ? 16 : 18) * (1 + (1 - quality) * 1.25);
  const phase = Math.floor(time / 180);
  ctx.font = `${w < 560 ? 9 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let y = cell; y < h; y += cell) {
    for (let x = cell; x < w; x += cell) {
      const nx = x / w;
      const centerFade = Math.min(1, Math.abs(nx - .5) * 2.5);
      const band = .35 + .65 * Math.sin((x + y) * .025 + phase * .11) ** 2;
      const alpha = (.05 + band * .3) * (.22 + centerFade * .78);
      const index = Math.abs((Math.floor(x / cell) * 7 + Math.floor(y / cell) * 13 + phase) % glyphs.length);
      ctx.fillStyle = `rgba(126, 218, 164, ${alpha})`;
      ctx.fillText(glyphs[index], x, y + Math.sin(x * .02 + phase * .08) * 4);
    }
  }
  const shade = ctx.createRadialGradient(w * .5, h * .5, 10, w * .5, h * .5, w * .34);
  shade.addColorStop(0, "rgba(8,12,11,.92)");
  shade.addColorStop(.58, "rgba(8,12,11,.52)");
  shade.addColorStop(1, "rgba(8,12,11,0)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, w, h);
}


function drawLiquidGradient(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0b0e0f";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00017;
  const quality = getQuality(state);
  const layers = [
    { center: .2, colorA: "47,182,154", colorB: "70,115,208", alpha: .62, direction: 1 },
    { center: .5, colorA: "74,108,211", colorB: "190,78,159", alpha: .58, direction: -1 },
    { center: .79, colorA: "190,76,155", colorB: "231,139,78", alpha: .54, direction: 1 }
  ];

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = `blur(${w < 560 ? 12 : 19}px)`;
  for (let layerIndex = 0; layerIndex < layers.length; layerIndex += 1) {
    const layer = layers[layerIndex];
    const centerX = w * (layer.center + Math.sin(phase * layer.direction + layerIndex) * .055);
    const centerY = h * (.5 + Math.cos(phase * .8 + layerIndex * 1.8) * .055);
    const radiusX = w * (.31 + Math.sin(phase * .7 + layerIndex) * .035);
    const radiusY = h * (.36 + Math.cos(phase * .9 + layerIndex) * .045);
    const gradient = ctx.createLinearGradient(centerX - radiusX, centerY - radiusY, centerX + radiusX, centerY + radiusY);
    gradient.addColorStop(0, `rgba(${layer.colorA},0)`);
    gradient.addColorStop(.3, `rgba(${layer.colorA},${layer.alpha})`);
    gradient.addColorStop(.7, `rgba(${layer.colorB},${layer.alpha * .86})`);
    gradient.addColorStop(1, `rgba(${layer.colorB},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    const points = Math.round(36 + quality * 36);
    for (let point = 0; point <= points; point += 1) {
      const angle = point / points * Math.PI * 2;
      const ripple = 1
        + Math.sin(angle * 3 + phase * 1.4 * layer.direction + layerIndex) * .13
        + Math.sin(angle * 5 - phase * .8 + layerIndex * 2) * .055;
      const x = centerX + Math.cos(angle) * radiusX * ripple;
      const y = centerY + Math.sin(angle) * radiusY * ripple;
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  const vignette = ctx.createRadialGradient(w * .5, h * .5, h * .08, w * .5, h * .5, w * .74);
  vignette.addColorStop(0, "rgba(4,7,7,0)");
  vignette.addColorStop(.68, "rgba(4,7,7,.05)");
  vignette.addColorStop(1, "rgba(4,7,7,.58)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}


function organicPath(w, h, centerX, centerY, radiusX, radiusY, phase, lobes = 5, quality = 1) {
  const path = new Path2D();
  const points = Math.round(36 + Math.max(.45, Math.min(1, quality)) * 60);
  for (let point = 0; point <= points; point += 1) {
    const angle = point / points * Math.PI * 2;
    const ripple = 1
      + Math.sin(angle * lobes + phase) * .09
      + Math.sin(angle * (lobes + 2) - phase * .7) * .035;
    const x = centerX + Math.cos(angle) * radiusX * ripple;
    const y = centerY + Math.sin(angle) * radiusY * ripple;
    if (point === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  }
  path.closePath();
  return path;
}


function drawLiquidGlass(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  const phase = time * .00018;
  const quality = getQuality(state);
  const background = ctx.createLinearGradient(0, 0, w, h);
  background.addColorStop(0, "#10211d");
  background.addColorStop(.42, "#18203a");
  background.addColorStop(.72, "#3a1c34");
  background.addColorStop(1, "#291914");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, w, h);

  const ambient = ctx.createRadialGradient(w * .28, h * .48, 0, w * .28, h * .48, w * .52);
  ambient.addColorStop(0, "rgba(111,225,194,.14)");
  ambient.addColorStop(.54, "rgba(104,142,226,.08)");
  ambient.addColorStop(1, "rgba(225,129,172,0)");
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, w, h);

  const panes = [
    { x: .34, y: .48, rx: .29, ry: .34, offset: 0 },
    { x: .68, y: .5, rx: .27, ry: .3, offset: 2.1 }
  ];
  for (const pane of panes) {
    const centerX = w * (pane.x + Math.sin(phase + pane.offset) * .025);
    const centerY = h * (pane.y + Math.cos(phase * .8 + pane.offset) * .03);
    const path = organicPath(w, h, centerX, centerY, w * pane.rx, h * pane.ry, phase + pane.offset, 5, quality);
    ctx.save();
    ctx.clip(path);
    ctx.translate(Math.sin(phase + pane.offset) * 18, Math.cos(phase + pane.offset) * 10);
    const refracted = ctx.createLinearGradient(centerX - w * pane.rx, centerY - h * pane.ry, centerX + w * pane.rx, centerY + h * pane.ry);
    refracted.addColorStop(0, "rgba(91,223,190,.18)");
    refracted.addColorStop(.42, "rgba(104,142,226,.32)");
    refracted.addColorStop(.72, "rgba(221,109,171,.26)");
    refracted.addColorStop(1, "rgba(242,176,112,.12)");
    ctx.fillStyle = refracted;
    ctx.fillRect(centerX - w * .4, centerY - h * .45, w * .8, h * .9);
    ctx.restore();

    ctx.save();
    ctx.lineWidth = w < 560 ? 2 : 3;
    const edge = ctx.createLinearGradient(centerX - w * pane.rx, centerY - h * pane.ry, centerX + w * pane.rx, centerY + h * pane.ry);
    edge.addColorStop(0, "rgba(229,255,246,.82)");
    edge.addColorStop(.35, "rgba(178,223,255,.12)");
    edge.addColorStop(.72, "rgba(255,196,229,.52)");
    edge.addColorStop(1, "rgba(255,225,183,.72)");
    ctx.strokeStyle = edge;
    ctx.shadowColor = "rgba(190,230,255,.4)";
    ctx.shadowBlur = 18;
    ctx.stroke(path);
    ctx.restore();
  }

  const glassShade = ctx.createRadialGradient(w * .5, h * .46, h * .08, w * .5, h * .46, w * .7);
  glassShade.addColorStop(0, "rgba(5,8,9,0)");
  glassShade.addColorStop(1, "rgba(5,8,9,.58)");
  ctx.fillStyle = glassShade;
  ctx.fillRect(0, 0, w, h);
}


function drawReactionDiffusion(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0a0f0d";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00022;
  const quality = getQuality(state);
  const cell = (w < 560 ? 13 : 11) * (1 + (1 - quality) * 1.8);
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);

  ctx.save();
  ctx.lineWidth = w < 560 ? 1 : 1.25;
  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const x = col * cell;
      const y = row * cell;
      const nx = x / w;
      const ny = y / h;
      const fieldA = Math.sin(nx * 22 + Math.sin(ny * 8 + phase) * 2.5);
      const fieldB = Math.cos(ny * 20 - Math.cos(nx * 9 - phase * .7) * 2.2);
      const reaction = Math.abs(fieldA + fieldB);
      if (reaction > .38 && reaction < .72) {
        const alpha = .08 + (1 - Math.abs(reaction - .55) / .17) * .32;
        const radius = cell * (.24 + alpha * .9);
        ctx.strokeStyle = `rgba(${90 + Math.round(nx * 70)}, ${188 + Math.round(ny * 42)}, ${139 + Math.round(nx * 68)}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x + Math.sin(ny * 13 + phase) * 2, y + Math.cos(nx * 11 - phase) * 2, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }
  ctx.restore();

  const reactionGlow = ctx.createRadialGradient(w * .52, h * .48, 0, w * .52, h * .48, Math.min(w, h) * .48);
  reactionGlow.addColorStop(0, "rgba(86,194,142,.1)");
  reactionGlow.addColorStop(.7, "rgba(33,79,61,.03)");
  reactionGlow.addColorStop(1, "rgba(4,7,6,0)");
  ctx.fillStyle = reactionGlow;
  ctx.fillRect(0, 0, w, h);
}


function drawCausticLight(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#091015";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00018;
  const quality = getQuality(state);
  const lineCount = Math.round((w < 560 ? 22 : 38) * (.45 + quality * .55));

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  for (let line = 0; line < lineCount; line += 1) {
    const seed = line / Math.max(lineCount - 1, 1);
    const startY = -h * .1 + seed * h * 1.2;
    const hue = 174 + seed * 28;
    ctx.strokeStyle = `hsla(${hue}, 74%, ${68 + seed * 18}%, ${.045 + Math.sin(seed * Math.PI) * .16})`;
    ctx.lineWidth = .6 + Math.sin(seed * Math.PI) * 1.4;
    ctx.shadowColor = `hsla(${hue}, 82%, 72%, .45)`;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    const steps = Math.round(24 + quality * 24);
    for (let step = 0; step <= steps; step += 1) {
      const progress = step / steps;
      const x = -w * .08 + progress * w * 1.16;
      const fold = Math.sin(progress * 8.2 + seed * 8.8 + phase * 1.7) * h * .1;
      const convergenceA = Math.exp(-((progress - .34) ** 2) / .018) * Math.sin(seed * Math.PI * 3 - phase) * h * .11;
      const convergenceB = Math.exp(-((progress - .72) ** 2) / .022) * Math.cos(seed * Math.PI * 4 + phase * .8) * h * .1;
      const y = startY + fold + convergenceA + convergenceB;
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  ctx.filter = `blur(${w < 560 ? 10 : 16}px)`;
  const pools = [
    [w * (.34 + Math.sin(phase) * .025), h * .46, "83,220,218"],
    [w * (.72 + Math.cos(phase * .8) * .025), h * .54, "124,170,241"]
  ];
  for (const [x, y, color] of pools) {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, h * .28);
    glow.addColorStop(0, `rgba(${color},.16)`);
    glow.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(x - h * .3, y - h * .3, h * .6, h * .6);
  }
  ctx.restore();

  const causticShade = ctx.createRadialGradient(w * .5, h * .48, h * .08, w * .5, h * .48, w * .72);
  causticShade.addColorStop(0, "rgba(3,7,9,0)");
  causticShade.addColorStop(1, "rgba(3,7,9,.68)");
  ctx.fillStyle = causticShade;
  ctx.fillRect(0, 0, w, h);
}


function drawLiquidMetal(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0b0d0e";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00016;
  const quality = getQuality(state);
  const centerX = w * (.52 + Math.sin(phase * .65) * .025);
  const centerY = h * (.49 + Math.cos(phase * .72) * .025);
  const path = organicPath(w, h, centerX, centerY, w * .39, h * .34, phase, 4, quality);

  ctx.save();
  ctx.clip(path);
  const metal = ctx.createLinearGradient(centerX - w * .4, centerY - h * .34, centerX + w * .4, centerY + h * .34);
  metal.addColorStop(0, "#11161a");
  metal.addColorStop(.13, "#7c8990");
  metal.addColorStop(.25, "#e7edf0");
  metal.addColorStop(.38, "#343b40");
  metal.addColorStop(.52, "#9e7e70");
  metal.addColorStop(.64, "#f4f7f4");
  metal.addColorStop(.76, "#586b72");
  metal.addColorStop(.9, "#171b1d");
  metal.addColorStop(1, "#8d9698");
  ctx.fillStyle = metal;
  ctx.fillRect(0, 0, w, h);

  ctx.globalCompositeOperation = "screen";
  for (let band = 0; band < 4; band += 1) {
    const x = centerX + Math.sin(phase * (1 + band * .13) + band * 1.7) * w * .24;
    const highlight = ctx.createRadialGradient(x, centerY - h * .12 + band * h * .08, 0, x, centerY, w * (.12 + band * .025));
    highlight.addColorStop(0, `rgba(${band % 2 ? "255,198,166" : "190,226,255"},${.42 - band * .055})`);
    highlight.addColorStop(.35, `rgba(235,242,241,${.18 - band * .025})`);
    highlight.addColorStop(1, "rgba(235,242,241,0)");
    ctx.fillStyle = highlight;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.restore();

  ctx.save();
  const metalEdge = ctx.createLinearGradient(centerX - w * .4, centerY, centerX + w * .4, centerY);
  metalEdge.addColorStop(0, "rgba(149,183,197,.18)");
  metalEdge.addColorStop(.26, "rgba(241,249,250,.78)");
  metalEdge.addColorStop(.58, "rgba(104,117,123,.24)");
  metalEdge.addColorStop(.82, "rgba(255,205,176,.66)");
  metalEdge.addColorStop(1, "rgba(103,116,121,.16)");
  ctx.strokeStyle = metalEdge;
  ctx.lineWidth = w < 560 ? 2 : 3;
  ctx.shadowColor = "rgba(218,235,240,.32)";
  ctx.shadowBlur = 14;
  ctx.stroke(path);
  ctx.restore();

  const metalShadow = ctx.createRadialGradient(centerX, centerY + h * .3, h * .02, centerX, centerY + h * .3, w * .38);
  metalShadow.addColorStop(0, "rgba(0,0,0,.46)");
  metalShadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = metalShadow;
  ctx.fillRect(0, 0, w, h);
}


function drawVolumetricHaze(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  const background = ctx.createLinearGradient(0, 0, w, h);
  background.addColorStop(0, "#07100d");
  background.addColorStop(.58, "#0b1512");
  background.addColorStop(1, "#080c0b");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00013;
  const quality = getQuality(state);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = `blur(${w < 560 ? 8 : 12}px)`;
  const beams = [
    { source: .02, top: .22, bottom: .72, alpha: .3, offset: 0 },
    { source: .18, top: .52, bottom: 1.02, alpha: .18, offset: 1.7 }
  ];
  for (const beam of beams) {
    const sourceY = h * (beam.source + Math.sin(phase + beam.offset) * .02);
    const light = ctx.createLinearGradient(0, sourceY, w, h * ((beam.top + beam.bottom) / 2));
    light.addColorStop(0, `rgba(178, 235, 204, ${beam.alpha})`);
    light.addColorStop(.48, `rgba(130, 211, 174, ${beam.alpha * .68})`);
    light.addColorStop(1, "rgba(104, 187, 151, 0)");
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.moveTo(-w * .08, sourceY - h * .035);
    ctx.lineTo(-w * .08, sourceY + h * .035);
    ctx.lineTo(w * 1.08, h * beam.bottom);
    ctx.lineTo(w * 1.08, h * beam.top);
    ctx.closePath();
    ctx.fill();
  }
  const cloudCount = Math.round(4 + quality * 3);
  for (let cloud = 0; cloud < cloudCount; cloud += 1) {
    const seed = cloud / Math.max(cloudCount - 1, 1);
    const x = w * (.12 + seed * .78 + Math.sin(phase * .8 + cloud) * .025);
    const y = h * (.3 + Math.sin(cloud * 1.9 + phase) * .18);
    const fog = ctx.createRadialGradient(x, y, 0, x, y, h * (.26 + seed * .08));
    fog.addColorStop(0, `rgba(154, 211, 181, ${.04 + Math.sin(seed * Math.PI) * .055})`);
    fog.addColorStop(1, "rgba(154, 211, 181, 0)");
    ctx.fillStyle = fog;
    ctx.fillRect(x - h * .4, y - h * .4, h * .8, h * .8);
  }
  ctx.restore();
  const safeShade = ctx.createRadialGradient(w * .5, h * .48, h * .05, w * .5, h * .48, w * .62);
  safeShade.addColorStop(0, "rgba(7, 12, 10, .22)");
  safeShade.addColorStop(.56, "rgba(7, 12, 10, .08)");
  safeShade.addColorStop(1, "rgba(4, 7, 6, .58)");
  ctx.fillStyle = safeShade;
  ctx.fillRect(0, 0, w, h);
}


function drawInkDiffusion(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0a0f0e";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00015;
  const quality = getQuality(state);
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = `blur(${w < 560 ? 2 : 4}px)`;
  ctx.fillStyle = "rgba(44, 147, 128, .16)";
  const plumeCount = Math.round(36 + quality * 36);
  for (let plume = 0; plume < plumeCount; plume += 1) {
    const progress = plume / Math.max(plumeCount - 1, 1);
    const drift = Math.sin(progress * 10.8 + phase * 2.1) * progress * .052
      + Math.sin(progress * 4.1 + 1.3) * .022;
    const x = w * (.12 + progress * .72);
    const y = h * (.5 + drift);
    const radiusX = w * (.022 + progress * .062);
    const radiusY = h * (.024 + progress * .05);
    const path = organicPath(w, h, x, y, radiusX, radiusY, phase * 1.3 + plume * .41, 6, quality);
    ctx.fill(path);
  }
  const source = ctx.createRadialGradient(w * .12, h * .5, 0, w * .12, h * .5, h * .18);
  source.addColorStop(0, "rgba(49, 158, 137, .44)");
  source.addColorStop(.48, "rgba(49, 158, 137, .18)");
  source.addColorStop(1, "rgba(49, 158, 137, 0)");
  ctx.fillStyle = source;
  ctx.fillRect(0, h * .32, w * .3, h * .36);
  ctx.restore();
  const shade = ctx.createRadialGradient(w * .5, h * .48, h * .06, w * .5, h * .48, w * .68);
  shade.addColorStop(0, "rgba(4, 8, 7, 0)");
  shade.addColorStop(1, "rgba(4, 8, 7, .66)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, w, h);
}


function drawHorizontalGradient(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0b1013";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00016;
  const quality = getQuality(state);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineCap = "round";
  const bandCount = Math.round(5 + quality * 5);
  const steps = Math.round(20 + quality * 20);
  for (let band = 0; band < bandCount; band += 1) {
    const seed = band / Math.max(bandCount - 1, 1);
    const hue = 165 + seed * 88;
    ctx.strokeStyle = `hsla(${hue}, 62%, ${62 + seed * 14}%, ${.035 + Math.sin(seed * Math.PI) * .12})`;
    ctx.lineWidth = h * (.012 + Math.sin(seed * Math.PI) * .018);
    ctx.beginPath();
    for (let step = 0; step <= steps; step += 1) {
      const progress = step / steps;
      const x = -w * .08 + progress * w * 1.16;
      const y = h * (.16 + seed * .7)
        + Math.sin(progress * 7 + seed * 5 + phase * 1.7) * h * .06
        + Math.sin(progress * 13 - phase * 1.1 + seed) * h * .022;
      if (step === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
  const centerSafe = ctx.createLinearGradient(0, 0, w, 0);
  centerSafe.addColorStop(0, "rgba(5, 8, 9, .48)");
  centerSafe.addColorStop(.35, "rgba(5, 8, 9, .18)");
  centerSafe.addColorStop(.5, "rgba(5, 8, 9, .62)");
  centerSafe.addColorStop(.65, "rgba(5, 8, 9, .18)");
  centerSafe.addColorStop(1, "rgba(5, 8, 9, .48)");
  ctx.fillStyle = centerSafe;
  ctx.fillRect(0, 0, w, h);
}


function drawSoftFocus(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0a0d11";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00012;
  const quality = getQuality(state);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.filter = `blur(${(w < 560 ? 10 : 18) * (.7 + quality * .3)}px)`;
  const lights = [
    [.24, .42, .2, "112, 202, 225"],
    [.5, .54, .28, "166, 142, 232"],
    [.78, .4, .22, "234, 169, 127"]
  ];
  for (let index = 0; index < lights.length; index += 1) {
    const [x, y, radius, color] = lights[index];
    const cx = w * (x + Math.sin(phase + index) * .035);
    const cy = h * (y + Math.cos(phase * .8 + index) * .035);
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * radius);
    gradient.addColorStop(0, `rgba(${color}, .42)`);
    gradient.addColorStop(.42, `rgba(${color}, .2)`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, w * radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.filter = "none";
  ctx.restore();
  const safe = ctx.createLinearGradient(0, 0, w, 0);
  safe.addColorStop(0, "rgba(5, 7, 10, .34)");
  safe.addColorStop(.38, "rgba(5, 7, 10, .08)");
  safe.addColorStop(.5, "rgba(5, 7, 10, .34)");
  safe.addColorStop(.62, "rgba(5, 7, 10, .08)");
  safe.addColorStop(1, "rgba(5, 7, 10, .34)");
  ctx.fillStyle = safe;
  ctx.fillRect(0, 0, w, h);
}


function drawSoftFocusObject(state, time) {
  const { ctx, width: w, height: h } = state;
  clear(state);
  ctx.fillStyle = "#0a0e12";
  ctx.fillRect(0, 0, w, h);
  const phase = time * .00015;
  const quality = getQuality(state);
  const cx = w * (.5 + Math.sin(phase) * .02);
  const cy = h * (.5 + Math.cos(phase * .8) * .025);
  const objectPath = organicPath(w, h, cx, cy, w * .2, h * .33, phase, 5, quality);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.clip(objectPath);
  const density = .55 + quality * .45;
  const columns = Math.round((w < 560 ? 16 : 26) * density);
  const rows = Math.round((w < 560 ? 32 : 52) * density);
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const x = w * (.32 + col / Math.max(columns - 1, 1) * .36);
      const y = h * (.16 + row / Math.max(rows - 1, 1) * .68);
      const depth = Math.sin(col * .7 + row * .31 + phase * 3) * .5 + .5;
      const radius = .5 + depth * 1.7;
      ctx.fillStyle = `rgba(${132 + Math.round(depth * 70)}, ${182 + Math.round(depth * 55)}, ${215 + Math.round(depth * 35)}, ${.12 + depth * .48})`;
      ctx.beginPath();
      ctx.arc(x + Math.sin(row * .42 + phase) * 4, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  const shade = ctx.createRadialGradient(cx, cy, h * .08, cx, cy, h * .48);
  shade.addColorStop(0, "rgba(7, 10, 13, 0)");
  shade.addColorStop(1, "rgba(3, 5, 7, .64)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, w, h);
}


const drawers = {
  dots: drawDots,
  glyph: drawGlyph,
  liquidGradient: drawLiquidGradient,
  liquidGlass: drawLiquidGlass,
  reaction: drawReactionDiffusion,
  caustic: drawCausticLight,
  metal: drawLiquidMetal,
  volumetricHaze: drawVolumetricHaze,
  inkDiffusion: drawInkDiffusion,
  horizontalGradient: drawHorizontalGradient,
  softFocus: drawSoftFocus,
  softFocusObject: drawSoftFocusObject
};

window.VisualDirectionRuntime = { drawers };
})();
