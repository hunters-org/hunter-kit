/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';

export function subFinder(
  domains: string | string[],
  outputDir: string = PROJECT_DIR,
): { message: string; success: boolean; error: any } {
  const subfinderPath = toolPath('subfinder');
  // const domainsSpread = domains.reduce((prev,curr)=> prev+' '+curr )
  // const resultFolder = 'recon_result';
  // createDirIfNotExist(outputDir, resultFolder);
  const command = `${subfinderPath} -d ${domains} >> ${path.join(
    outputDir,
    'recon_subdomins.txt',
  )}`;
  try {
    execSync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error: any) {
    return { message: 'Error', success: false, error };
  }
}
