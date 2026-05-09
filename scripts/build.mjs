import { cp, mkdir, rm } from "node:fs/promises";

const distDir = "dist";
const filesToCopy = [
  "index.html",
  "styles.css",
  "manifest.webmanifest",
  "sw.js"
];
const directoriesToCopy = [
  "src",
  "icons"
];

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

for (const file of filesToCopy) {
  await cp(file, `${distDir}/${file}`);
}

for (const directory of directoriesToCopy) {
  await cp(directory, `${distDir}/${directory}`, { recursive: true });
}
