const vscode = require('vscode');

function isFormatOnSaveEnabled(document) {
    const editorConfig = vscode.workspace.getConfiguration('editor', document);
    return editorConfig.get('formatOnSave', false);
}

function isFormatOnPastEnabled(document) {
    const editorConfig = vscode.workspace.getConfiguration('editor', document);
    return editorConfig.get('formatOnPast', false);
}

module.exports = {
    isFormatOnSaveEnabled,
    isFormatOnPastEnabled
};