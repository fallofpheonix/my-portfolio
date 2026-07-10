const warp = addControl("warp", "Warp Intensity", 0, 3, 1.0);
const armCount = addControl("arms", "Spiral Arms", 2, 8, 4);
const density = addControl("density", "Nebula Density", 10, 80, 40);
const t = time * 0.4;

const norm = i / count;
const arm = Math.floor(norm * armCount);
const armAngle = (arm / armCount) * Math.PI * 2;
const spread = (norm * armCount - arm) * Math.PI * 2;

const dist = norm * density;
const spiral = dist * 0.6 + armAngle + t * 0.3;
const wobble = Math.sin(t * 1.7 + dist * 0.8) * warp * 3;

const nx = Math.cos(spiral + spread) * dist + wobble;
const ny = Math.sin(spread * 3 + t) * (dist * 0.15) + Math.sin(t * 0.9 + norm * 20) * warp * 1.5;
const nz = Math.sin(spiral + spread) * dist + Math.cos(t * 0.6 + dist) * warp * 2;

target.set(nx, ny, nz);

const hue = (norm * 0.7 + t * 0.05 + arm * 0.1) % 1;
const sat = 0.6 + Math.sin(t + dist * 0.3) * 0.4;
const lum = 0.25 + Math.cos(t * 0.8 + norm * 15) * 0.2 + (1 - norm) * 0.15;
color.setHSL(hue, sat, lum);

if (i === 0) {
  setInfo("Cosmic Nebula Genesis", "Stellar nursery with spiral arms and orbital debris");
  annotate("core", new THREE.Vector3(0, 0, 0), "Proto-Star Core");
}