import { workspace } from 'vscode';

import * as fs from 'fs';
import * as path from 'path';

type SaveDTO = {
  content: Uint8Array,
  filename: string,
};

class TemplatesRepository {
  templatesPath: string;

  constructor() {
    this.templatesPath = this.getTemplatesPath();
  }

  async find(): Promise<string[]> {
    return await fs.promises.readdir(this.templatesPath);
  }

  async getContent(template: string): Promise<Buffer> {
    const templateFile = path.join(this.templatesPath, `${template}.txt`);

    return await fs.promises.readFile(templateFile);
  }

  save({ content, filename }: SaveDTO): void {
    const filePath = path.join(this.templatesPath, `${filename}.txt`);

    fs.promises.writeFile(filePath, content);
  }

  private getTemplatesPath() {
    const templateFolderPath = workspace
      .getConfiguration('mytemplates').get<string>('path');

    if (!templateFolderPath) {
      throw new Error('The path to your templates was not found in the templates path config');
    }

    const pathExist = fs.existsSync(templateFolderPath);

    if (!pathExist) {
      throw new Error('The path to your templates is wrong');
    }

    const isDirectoy = fs.lstatSync(templateFolderPath).isDirectory();

    if (!isDirectoy) {
      throw new Error('Must be passed a folder path to templates path config');
    }
    return templateFolderPath;
  }
}

export default TemplatesRepository;
