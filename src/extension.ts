import * as vscode from 'vscode';

import myTemplates from './commands/myTemplates';
import saveAsTemplate from './commands/saveAsTemplate';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('simple-file.getTemplate', myTemplates),
    vscode.commands.registerCommand('simple-file.saveAsTemplate', saveAsTemplate)
  );
}

export function deactivate() { }
