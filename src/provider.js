const vscode = require("vscode");
const path = require("path");
const { getSuggestions } = require("./cache");

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const supportedLanguages = [
  "plaintext",
  "markdown",
  "javascript",
  "typescript",
  "html",
  "css",
  "php",
  "python",
  "c",
  "cpp",
  "java",
  "json",
];

function createProvider(suggestionEnabledRef) {
  return vscode.languages.registerCompletionItemProvider(
    supportedLanguages.map((lang) => ({ scheme: "file", language: lang })),
    {
      provideCompletionItems(document, position) {
        if (!suggestionEnabledRef.enabled) return [];

        const linePrefix = document
          .lineAt(position)
          .text.substring(0, position.character);
        const currentWord = linePrefix.split(/\s+/).pop() || "";

        // ✅ Only show suggestions if word has at least 3 characters
        if (currentWord.length < 3) {
          return [];
        }

        return getSuggestions(currentWord).map(({ word, file }) => {
          const item = new vscode.CompletionItem(
            word,
            vscode.CompletionItemKind.Text
          );
          item.detail = `From ${path.basename(file)}`;
          return item;
        });
      },
    },
    ...alphabet
  );
}

module.exports = createProvider;
