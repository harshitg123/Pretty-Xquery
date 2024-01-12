const vscode = require('vscode');

function showTemporaryInformationMessage(message, durationInSeconds) {
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);

    statusBarItem.text = message;
    statusBarItem.show();

    setTimeout(() => {
        statusBarItem.hide();
        statusBarItem.dispose();
    }, durationInSeconds * 1000);
}

function showCustomErrorMessage(message, durationInSeconds) {
    const panel = vscode.window.createWebviewPanel(
        'customErrorMessage',
        'Custom Error Message',
        vscode.ViewColumn.Active,
        {}
    );

    // Use a simple HTML string with custom styling
    const htmlContent = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: white;
                    background-color: #ff5252;
                }
            </style>
        </head>
        <body>
            <h1>Error</h1>
            <p>${message}</p>
        </body>
        </html>
    `;

    panel.webview.html = htmlContent;

    // Automatically close the panel after the specified duration
    setTimeout(() => {
        panel.dispose();
    }, durationInSeconds * 1000);
}

module.exports = {
    showTemporaryInformationMessage,
    showCustomErrorMessage
}