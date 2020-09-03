import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('vscode-simple-file.helloWorld', () => {

    vscode.window.showInformationMessage('Hello World from vscode-simple-file!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
