import { window } from 'vscode';

export default () => {
  const currentOpenFile = window.activeTextEditor;

  if (!currentOpenFile) { throw new Error("Workspace doesn't contain any open files."); }

  currentOpenFile.document.save();

  return currentOpenFile;
};
