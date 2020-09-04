import { window, workspace } from 'vscode';

import GetTemplateService from '../services/GetTemplateSevice';
import getCurrentOpenFile from '../utils/getCurrentOpenFile';

export default async () => {
  try {
    const getTemplateService = new GetTemplateService();
    const currentOpenFile = getCurrentOpenFile();

    const template = await getTemplateService.execute();

    if (!template) { return; }

    await workspace.fs.writeFile(currentOpenFile.document.uri, template);

  } catch (err) {
    window.showErrorMessage(err.message);
  }
};
