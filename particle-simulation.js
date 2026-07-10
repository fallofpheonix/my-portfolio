const scale = addControl("scale", "Expansion", 10, 100, 50);
const speed = addControl("speed", "Rotation Speed", 0, 5, 1.0);
const chaos = addControl("chaos", "Chaos", 0, 2, 0.5);

const phi = (i / count) * Math.PI * 2;
const theta = i * 0.1;
const t = time * speed;

const r1 = scale + Math.sin(t + phi * 3) * scale * 0.3;
const r2 = scale * 0.5 + Math.cos(t * 0.7 + theta) * scale * 0.2;

const x = r1 * Math.sin(theta) * Math.cos(phi) + Math.sin(t + i * 0.01) * chaos * 10;
const y = r2 * Math.sin(theta) * Math.sin(phi) + Math.cos(t * 1.3 + i * 0.02) * chaos * 10;
const z = r1 * Math.cos(theta) + Math.sin(t * 0.5 + phi) * chaos * 5;

target.set(x, y, z);

const hue = (i / count + t * 0.05) % 1;
const sat = 0.8 + Math.sin(t + phi) * 0.2;
const lum = 0.4 + Math.cos(t * 0.5 + theta) * 0.15;
color.setHSL(hue, sat, lum);

if (i === 0) {
  setInfo("Hyperdimensional Tesseract", "A 4D tesseract breathing in 3D space with chaotic perturbation");
  annotate("center", new THREE.Vector3(0, 0, 0), "Singularity");
}
