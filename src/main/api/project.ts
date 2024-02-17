/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

export const PROJECT_DIR = path.join(__dirname, '../../../projects');

export function readDirectoryNames(
  directoryPath: string = PROJECT_DIR,
): string[] {
  try {
    // Read the contents of the directory
    const dirContents = fs.readdirSync(directoryPath);

    // Filter out only directories
    const directories = dirContents.filter((item) => {
      const itemPath = `${directoryPath}/${item}`;
      return fs.statSync(itemPath).isDirectory();
    });

    return directories;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    return [];
  }
}
// eslint-disable-next-line consistent-return
export function createProjectDir(name: string) {
  try {
    const dir = fs.mkdirSync(`${PROJECT_DIR}/${name}`);
    return dir;
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}
export function createJsonFile(name: string, domain: string) {
  const obj = {
    name,
    domain,
  };
  const stringifyObj = JSON.stringify(obj);
  try {
    fs.writeFileSync(
      path.join(`${PROJECT_DIR}/${name}`, 'details.json'),
      stringifyObj,
    );
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}
