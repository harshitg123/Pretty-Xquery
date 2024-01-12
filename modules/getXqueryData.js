const vscode = require('vscode');

function fetchActiveFileData(){
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const fileData = document.getText();
        return fileData;
    }else{
        vscode.window.showInformationMessage('No active text editor.');
        return null;
    }
}

module.exports = fetchActiveFileData;