const { getTxtFilesRecursive, extractWordsFromFiles } = require("./fileUtils");

let cachedWords = new Map();

function updateCache() {
  const txtFiles = getTxtFilesRecursive();
  cachedWords = extractWordsFromFiles(txtFiles);
  console.log("✅ Cache updated. Total words:", cachedWords.size);
}

function getSuggestions(prefix) {
  const lowerPrefix = prefix.toLowerCase();
  return Array.from(cachedWords.entries())
    .filter(([word]) => word.toLowerCase().startsWith(lowerPrefix)) // ✅ Case-insensitive match
    .map(([word, file]) => ({
      word, // ✅ Keep original case
      file,
    }));
}

module.exports = {
  updateCache,
  getSuggestions,
};
