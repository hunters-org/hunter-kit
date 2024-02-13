/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { execSync } from 'child_process';
import path from 'path';
import { createDirIfNotExist, toolPath } from '../util';

export function subFinder(domains: string | string[], outputDir: string) {
  const subfinderPath = toolPath('subfinder');
  // const domainsSpread = domains.reduce((prev,curr)=> prev+' '+curr )
  const resultFolder = 'recon_result';
  createDirIfNotExist(outputDir, resultFolder);
  const command = `${subfinderPath} -d ${domains} >> ${path.join(
    outputDir,
    resultFolder,
    'domains.txt',
  )}`;
  try {
    execSync(command);
    console.log('Done Successfully.');
  } catch (error) {
    console.error('Error executing command:', error);
  }
}
