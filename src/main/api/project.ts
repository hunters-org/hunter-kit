/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { defaultToolObj } from '../util';
import { connectJson } from '../db/connect';

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
    subFinder: defaultToolObj(),
    liveDomains: defaultToolObj(),
    screenWin: defaultToolObj(),
    archive: defaultToolObj(),
    waybackurls_js: defaultToolObj(),
    waybackurls_parameter: defaultToolObj(),
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

export function appendDateToJson(projectName: string, data: Object) {
  try {
    const blob = fs.readFileSync(
      path.join(`${projectName}`, 'details.json'),
      'utf-8',
    );
    const oldData = JSON.parse(blob);
    const newData = JSON.stringify({ ...oldData, ...data });
    fs.writeFileSync(path.join(`${projectName}`, 'details.json'), newData);
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}

export function projectDetails(projectName: string) {
  try {
    const blob = fs.readFileSync(
      `${PROJECT_DIR}/${projectName}/details.json`,
      'utf-8',
    );
    return JSON.parse(blob);
  } catch (error) {
    throw new Error('a7aa');
  }
}

export function projectDetailss(projectName: string) {
  try {
    const db = connectJson(`${PROJECT_DIR}/${projectName}/details.json`);
    return db.read();
  } catch (error) {
    throw new Error('a7aa');
  }
}
