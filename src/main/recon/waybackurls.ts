import util from 'util';
import { exec } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

const execAsync = util.promisify(exec);

export async function wwayback(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const wwaybackPath = toolPath('waybackurls');
  const command = `cat "${path.join(
    outputDir,
    'httpx_live_domains.txt',
  )}" | ${wwaybackPath} > ${path.join(outputDir, 'waybackurls_archive.txt')}`;

  try {
    const res = await execAsync(command);
    console.log(res);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'waybackurls_archive.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      archive: {
        result: numberOfUrls,
        run: true,
        filePath: '',
        date: new Date(Date.now()).toUTCString(),
      },
    });
    return { message: 'Done', success: true, error: '' };
  } catch (error: any) {
    return { message: "There's no data to get", success: false, error };
  }
}
export async function fetchJs(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const command = `cat "${path.join(
    outputDir,
    'waybackurls_archive.txt',
  )}" | grep ".js" > ${path.join(outputDir, 'waybackurls_js.txt')}`;
  try {
    await execAsync(command);
    const numberOfJsFiles = await countLines(
      path.join(outputDir, 'waybackurls_js.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      js: {
        result: numberOfJsFiles,
        run: true,
        filePath: '',
        date: new Date(Date.now()).toUTCString(),
      },
    });
    return { message: 'Done', success: true, error: '' };
  } catch (error: any) {
    return { message: "There's no data to get", success: false, error };
  }
}
export async function parameter(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const command = `cat "${path.join(
    outputDir,
    'waybackurls_archive.txt',
  )}" | grep "=" > ${path.join(outputDir, 'waybackurls_parameter.txt')}`;
  try {
    await execAsync(command);
    const numberOfParams = await countLines(
      path.join(outputDir, 'waybackurls_parameter.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      params: {
        result: numberOfParams,
        run: true,
        filePath: '',
        date: new Date(Date.now()).toUTCString(),
      },
    });
    return { message: 'Done', success: true, error: '' };
  } catch (error: any) {
    return { message: "There's no data to get", success: false, error };
  }
}
