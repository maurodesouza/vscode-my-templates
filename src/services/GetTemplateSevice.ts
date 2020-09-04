import { window } from 'vscode';

import TemplatesRepository from '../repositories/TemplatesRepository';

class GetTemplateService {
  async execute(): Promise<Buffer | null> {
    const templatesRepository = new TemplatesRepository();
    const templatesName = await templatesRepository.find();

    const templates = templatesName.map(fileName =>
      fileName.split('.').slice(0, -1).join('.'));

    const template = await window.showQuickPick(templates, {
      placeHolder: 'Select your template',
    });

    if (!template) { return null; };

    const templateContent = await templatesRepository.getContent(template);

    return templateContent;
  }
}

export default GetTemplateService;
