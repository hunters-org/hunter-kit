import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { CurrentOS, toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

export async function findSecret(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const jsleak = '$(go env GOPATH)/bin/jsleak';
  const command = `${CurrentOS() === 'win32' ? 'type' : 'cat'} ${path.join(outputDir, 'httpx_live_domains.txt')} | ${jsleak} -s`;
  try {
    fs.writeFileSync(
      `${path.join(outputDir, 'secrets.txt')}`,
      execSync(command).toString('utf-8'),
    );
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
  const jsleak = '$(go env GOPATH)/bin/jsleak';
  const command = `${CurrentOS() === 'win32' ? 'type' : 'cat'} ${path.join(outputDir, 'httpx_live_domains.txt')} | ${jsleak} -l | findstr ".js"`;
  try {
    fs.writeFileSync(
      `${path.join(outputDir, 'extra_links.txt')}`,
      execSync(command).toString('utf-8'),
    );
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
