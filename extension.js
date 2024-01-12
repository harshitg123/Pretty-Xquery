const vscode = require('vscode');
const xmlFormatter = require('xml-formatter');
const fetchXqueryData = require('./modules/getXqueryData');
const upadateXqueryData = require('./modules/updateXqueryData');
const getEditorConfigurations = require('./modules/getEditorConfigurations');
const customNotifications = require('./modules/showTemporaryInformationMessage');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('xquery-formatter.formatXquery', function () {

		const editor = vscode.window.activeTextEditor;

		if (editor.document.languageId === "xquery") {
			// @ts-ignore
			upadateXqueryData(xmlFormatter('<root>' + fetchXqueryData() + '</root>', {
			indentation: ' ',
			lineSeparator: '\n'
		}));
			vscode.window.showInformationMessage('Xquery Formatted!');
		}else{
			vscode.window.showErrorMessage("Can't format - unsupported file type.");
		}
	
	});

	let saveDisposable = vscode.workspace.onWillSaveTextDocument(Event => {

		if((Event.document.languageId === 'xquery' || Event.document.languageId === 'xml') && getEditorConfigurations.isFormatOnSaveEnabled(Event.document)){
			Event.waitUntil(
				// @ts-ignore
				upadateXqueryData(xmlFormatter('<root>' + fetchXqueryData() + '</root>', {
					indentation: ' ',
					lineSeparator: '\n'
				}))
			);
			vscode.window.showInformationMessage('Xquery Formatted!');
		}
	})
	context.subscriptions.push(disposable, saveDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
