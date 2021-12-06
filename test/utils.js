export function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 230;
  canvas.height = 210;
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 90, 150, 110);
  ctx.fillRect(95, 140, 40, 60);
  ctx.beginPath();
  ctx.moveTo(15, 90);
  ctx.lineTo(115, 10);
  ctx.lineTo(215, 90);
  ctx.closePath();
  ctx.stroke();
  return canvas;
}
