// scripts/clean.js
const fs = require("fs");
const path = require("path");

function removeDirRecursive(dir) {
  if (!fs.existsSync(dir)) return;

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === "dist") {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log("🧹 ลบ:", fullPath);
      } else {
        removeDirRecursive(fullPath);
      }
    }
  }
}

// 🔹 ลบ build หลัก
[".next", "dist", "out"].forEach((folder) => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log("🧹 ลบ:", folder);
  }
});

// 🔹 ลบทุก dist ใน src/
removeDirRecursive("src");

console.log("✅ เสร็จสิ้น: ลบ .next, dist, out และทุก dist ใน src/");
