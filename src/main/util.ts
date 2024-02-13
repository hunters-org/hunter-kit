/* eslint-disable no-console */
/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import os from 'node:os';
import path, { join } from 'path';
import { existsSync, mkdir, mkdirSync } from 'fs';

const dependenciesDir = join(__dirname, '../bin');

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function initProjectDir() {
  const dirName = `${path.join(__dirname, '../../projects')}`;

  if (!existsSync(dirName)) {
    mkdir(dirName, (err) => {
      if (err) console.error('Error creating dir', err);
      else console.log('project dir created');
    });
  } else {
    console.log('Directory already exists.');
  }
}
export function CurrentOS() {
  return os.platform();
}

export function toolPath(tool: string) {
  if (CurrentOS.toString() === 'win32') {
    return join(dependenciesDir, `${tool}.exe`);
  }
  return join(dependenciesDir, `${tool}`);
}

export function createDirIfNotExist(outputDir: string, dirname: string) {
  try {
    if (!existsSync(join(outputDir, dirname))) {
      mkdirSync(join(outputDir, dirname));
    }
  } catch (err) {
    console.error(err);
  }
}
