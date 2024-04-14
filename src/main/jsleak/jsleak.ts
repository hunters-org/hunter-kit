import { execSync } from 'child_process';
import path from 'path';
import { CurrentOS, toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

export async function findSecret(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const jsleak = toolPath('jsleak');
  const command = `${CurrentOS() === 'win32' ? 'type' : 'cat'} ${path.join(outputDir, 'httpx_live_domains.txt')} | ${jsleak} -s
   >> ${path.join(outputDir, 'secrets.txt')}`;
  try {
    execSync(command);
    const numberOfUrls = await countLines(path.join(outputDir, 'secrets.txt'));
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      findSecrets: {
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

export async function extraLinks(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const jsleak = toolPath('jsleak');
  const command = `${CurrentOS() === 'win32' ? 'type' : 'cat'} ${path.join(outputDir, 'httpx_live_domains.txt')} | ${jsleak} -l | findstr ".js"
   >> ${path.join(outputDir, 'extra_links.txt')}`;
  try {
    execSync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'extra_links.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      extraLinks: {
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
