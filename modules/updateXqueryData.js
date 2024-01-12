const vscode = require('vscode');

function replaceFormattedXqueryData(formattedData){
    const editor = vscode.window.activeTextEditor;
    if (editor) {

        editor.edit(editBuilder => {
            const document = editor.document;
            const startPosition = new vscode.Position(0, 0);
            const endPosition = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

            editBuilder.replace(new vscode.Range(startPosition, endPosition), formattedData.replace("<root>","").trim().replace("</root>","").trim());
        });
    } else {
        vscode.window.showInformationMessage('No active text editor.');
    }
}

module.exports = replaceFormattedXqueryData;