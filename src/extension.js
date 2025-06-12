const vscode = require("vscode");
const { updateCache } = require("./cache");
const createProvider = require("./provider");
const { storeWord, storeLine } = require("./tracker");

let debounceTimer = null;

function activate(context) {
  updateCache();

  const suggestionEnabledRef = { enabled: true };

  const toggleCmd = vscode.commands.registerCommand(
    "word-suggestion.toggle",
    () => {
      suggestionEnabledRef.enabled = !suggestionEnabledRef.enabled;
      vscode.window.showInformationMessage(
        suggestionEnabledRef.enabled
          ? "✅ Suggestions enabled"
          : "❌ Suggestions disabled"
      );
    }
  );

  const refreshCmd = vscode.commands.registerCommand(
    "word-suggestion.refresh",
    () => {
      updateCache();
      vscode.window.showInformationMessage("🔄 Word cache refreshed");
    }
  );

  const provider = createProvider(suggestionEnabledRef);

  const onChange = vscode.workspace.onDidChangeTextDocument((e) => {
    const changes = e.contentChanges;

    for (const change of changes) {
      const document = e.document;
      const lineText = document.lineAt(change.range.start.line).text;

      // Save word when SPACE is pressed
      if (change.text === " ") {
        const words = lineText.trim().split(/\s+/);
        const lastWord = words[words.length - 1];
        if (lastWord) {
          // Debounce word saving
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            storeWord(lastWord);
          }, 300);
        }
      }

      // Save line when ENTER is pressed
      if (change.text === "\n") {
        if (lineText.trim()) {
          storeLine(lineText.trim());
        }
      }
    }
  });

  context.subscriptions.push(toggleCmd, refreshCmd, provider, onChange);
  console.log("✅ Word Suggestion Extension Activated");
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
