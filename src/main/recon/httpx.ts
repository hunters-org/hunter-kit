import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';

export async function liveSubDomains(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const httprobeWPath = toolPath('httpx');
  const command = `${httprobeWPath} -l ${path.join(
    outputDir,
    'recon_subdomins.txt',
  )} -o ${path.join(outputDir, 'httpx_live_domains.txt')}`;
  try {
    execSync(command);
    // console.log('Execution result:', res);
    // const domainsFound = resultFromStd(res.stderr, /\bFound (\d+) subdomains?/);
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      liveDomains: {
        result: parseInt('213', 10),
        run: true,
        filePath: '',
        date: new Date(Date.now()).toUTCString(),
      },
    });
    return { message: 'Done', success: true, error: null };
  } catch (error) {
    console.error('Error occurred:', error);
    return { message: 'Error', success: false, error };
  }
}
liveSubDomains(`${PROJECT_DIR}/kroking`);
export async function screenwin(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const httpxPath = toolPath('httpx');

  const command = `${httpxPath} -ss -l ${path.join(
    outputDir,
    'httpx_live_domains.txt',
  )} -srd ${path.join(outputDir, 'httpx_screen')}`;
  try {
    execSync(command);
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      screens: {
        result: parseInt('12', 10),
        run: true,
        filePath: '',
        date: new Date(Date.now()).toUTCString(),
      },
    });
    return { message: 'Done', success: true, error: '' };
  } catch (error: any) {
    return { message: 'Error', success: false, error };
  }
}
