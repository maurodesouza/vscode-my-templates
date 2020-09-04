import { window } from 'vscode';

import SaveAsTemplateService from '../services/SaveAsTemplateService';
import TemplatesRepository from '../repositories/TemplatesRepository';

import getCurrentOpenFile from '../utils/getCurrentOpenFile';

export default async () => {
  try {
    const saveAsTemplateService = new SaveAsTemplateService();
    const templatesRepository = new TemplatesRepository();

    const currentOpenFile = getCurrentOpenFile();

    const template = await saveAsTemplateService.execute(currentOpenFile.document.uri);

    if (!template) { return; }

    const { content, filename } = template;

    templatesRepository.save({ content, filename });

    window.showInformationMessage('Template save with success');
  } catch (err) {
    window.showErrorMessage(err.message);
  }
};
