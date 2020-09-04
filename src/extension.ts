import * as vscode from 'vscode';
import myTemplates from './commands/myTemplates';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('simple-file.getTemplate', myTemplates);

  context.subscriptions.push(disposable);
}

export function deactivate() { }
