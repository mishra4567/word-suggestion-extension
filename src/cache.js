const { getTxtFilesRecursive, extractWordsFromFiles } = require("./fileUtils");

let cachedWords = new Map();

function updateCache() {
  const txtFiles = getTxtFilesRecursive();
  cachedWords = extractWordsFromFiles(txtFiles);
  console.log("✅ Cache updated. Total words:", cachedWords.size);
}

function getSuggestions(prefix) {
  return Array.from(cachedWords.entries())
    .filter(([word]) => word.startsWith(prefix))
    .map(([word, file]) => ({
      word,
      file,
    }));
}

module.exports = {
  updateCache,
  getSuggestions,
};
