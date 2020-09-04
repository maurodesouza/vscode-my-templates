import { window, workspace } from 'vscode';

import getCurrentFileUri from '../jobs/getCurrentFileUri';
import getTemplate from '../jobs/getTemplate';

export default async () => {
  try {
    const currentFileUri = getCurrentFileUri();
    const template = await getTemplate();

    if (!template) { return; }

    await workspace.fs.writeFile(currentFileUri, template);

  } catch (err) {
    window.showErrorMessage(err.message);
  }
};
