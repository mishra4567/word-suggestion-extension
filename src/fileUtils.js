const fs = require("fs");
const path = require("path");

const TARGET_DIR = "C:\\Users\\prita\\my-dictionary\\";

function getTxtFilesRecursive(dir = TARGET_DIR) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTxtFilesRecursive(fullPath));
    } else if (file.endsWith(".txt")) {
      results.push(fullPath);
    }
  });
  return results;
}

function extractWordsFromFiles(files) {
  const wordList = []; // ❌ Don't use Map

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const words = content.match(/\b\w+\b/g);
      if (words) {
        words.forEach((word) => {
          wordList.push({ word, file }); // ✅ Store duplicates
        });
      }
    } catch (err) {
      console.error("Error reading file:", file, err);
    }
  }

  return wordList;
}

module.exports = {
  getTxtFilesRecursive,
  extractWordsFromFiles,
};
