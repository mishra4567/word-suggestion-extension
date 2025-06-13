const { getTxtFilesRecursive, extractWordsFromFiles } = require("./fileUtils");

let cachedWords = []; // change from Map to Array

function updateCache() {
  const txtFiles = getTxtFilesRecursive();
  cachedWords = extractWordsFromFiles(txtFiles);
  console.log("✅ Cache updated. Total words:", cachedWords.length);
}

function getSuggestions(prefix) {
  const lowerPrefix = prefix.toLowerCase();

  return cachedWords
    .filter(({ word }) => word.toLowerCase().startsWith(lowerPrefix))
    .map(({ word, file }) => ({
      word,
      file,
    }));
}


module.exports = {
  updateCache,
  getSuggestions,
};
