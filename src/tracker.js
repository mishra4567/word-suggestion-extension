const fs = require("fs");
const path = require("path");

const generateFilePath = "C:\\Users\\prita\\my-dictionary\\generate.txt";

// Store each word in same line (space separated)
function storeWord(word) {
  fs.appendFile(generateFilePath, word + " ", (err) => {
    if (err) {
      console.error("❌ Error writing word:", err);
    }
  });
}

// Store each full line on new line
function storeLine(line) {
  fs.appendFile(generateFilePath, "\n" + line + "\n", (err) => {
    if (err) {
      console.error("❌ Error writing line:", err);
    }
  });
}

module.exports = {
  storeWord,
  storeLine,
};
