import { workspace, window } from "vscode";
import * as fs from 'fs';
import * as path from 'path';

export default async () => {
  const templateFolderPath = workspace.getConfiguration('mytemplates').get('path') as string;

  if (!templateFolderPath) {
    throw new Error(
      'The path to your templates was not found in the templates path config'
    );
  };

  const templateNames = await fs.promises.readdir(templateFolderPath);

  const templates = templateNames.map(file => file.split('.').slice(0, -1).join('.'));

  const template = await window.showQuickPick(templates, {
    placeHolder: 'Select your template',
  });

  if (!template) { return; };

  const templateFile = path.join(templateFolderPath, `${template}.txt`);

  const templateContent = await fs.promises.readFile(templateFile);

  return templateContent;
};
