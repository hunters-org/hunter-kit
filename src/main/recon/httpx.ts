import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

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
    const numberOfUrls = await countLines(
      path.join(outputDir, 'httpx_live_domains.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      liveDomains: {
        result: numberOfUrls,
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
    const numberOfScreenShots = await countLines(
      path.join(outputDir, 'httpx_screen/screenhost/index_screenhost.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      screens: {
        result: numberOfScreenShots,
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
