import { readFileSync, existsSync, mkdirSync } from 'fs';

export function readSettingsFromFile(filePath) {
  const data = readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export function prepareFolders(settings) {
  const result = true;
  [settings.folderIn, settings.folderOut].forEach(folder => {
    if (!existsSync(folder)) {
      mkdirSync(folder, { recursive: true });
      console.log(`folder ${folder} created`);
    } else {
      console.log(`folder ${folder} exists`)
    }
  });
}