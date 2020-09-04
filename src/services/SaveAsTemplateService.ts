import { Uri, window, workspace } from "vscode";

import TemplatesRepository from '../repositories/TemplatesRepository';

type Reposense = {
  content: Uint8Array;
  filename: string;
};

class SaveAsTemplateService {
  async execute(file: Uri): Promise<Reposense | null> {
    const templatesRepository = new TemplatesRepository();
    const templatesName = await templatesRepository.find();

    const templates = templatesName.map(fileName =>
      fileName.split('.').slice(0, -1).join('.'));

    const templateName = await window.showInputBox({
      placeHolder: 'Name to template',
      validateInput(currentValue) {
        const nameAlreadyExist = templates.find(fileName => fileName === currentValue);

        if (nameAlreadyExist) { return 'This name is already used!'; }

        return undefined;
      }
    });

    if (!templateName) { return null; }

    const fileContent = await workspace.fs.readFile(file);

    return {
      content: fileContent,
      filename: templateName,
    };
  }
}

export default SaveAsTemplateService;
