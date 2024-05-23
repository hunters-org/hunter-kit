import { exec } from 'child_process';
import util from 'util';

import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

const execAsync = util.promisify(exec);

export async function scanningForXSS(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const dalfox = toolPath('dalfox');
  const command = `${dalfox} file ${path.join(outputDir, 'waybackurls_archive.txt')} --skip-bav
   >> ${path.join(outputDir, 'XSS.txt')}`;
  try {
    await execAsync(command);
    console.log(command);
    const numberOfUrls = await countLines(path.join(outputDir, 'XSS.txt'));
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      XSS: {
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
export async function multiScans(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const dalfox = toolPath('dalfox');
  const command = `${dalfox} file ${path.join(outputDir, 'waybackurls_archive.txt')}
   >> ${path.join(outputDir, 'multi_scans.txt')}`;
  try {
    await execAsync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'multi_scans.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      multiScans: {
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
