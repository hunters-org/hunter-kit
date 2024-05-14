import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

export async function generalScanning(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');

  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t http/
   -o ${path.join(outputDir, 'general_scanning.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'general_scanning.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      generalScanning: {
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
export async function exposedPanels(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t http/exposed-panels
   >> ${path.join(outputDir, 'exposed_panels.txt')}`;
  console.log(command);
  try {
    console.log(execSync(command).toString());
    const numberOfUrls = await countLines(
      path.join(outputDir, 'exposed_panels.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      exposedPanels: {
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
export async function defaultCredentials(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t  http/default-logins
   -o ${path.join(outputDir, 'default_credentials.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'default_credentials.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      defaultCredentials: {
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
export async function subdomainTakeovers(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t  http/takeovers
   -o ${path.join(outputDir, 'subdomain_takeovers.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'subdomain_takeovers.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      subdomainTakeovers: {
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

export async function scanningForExposures(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t exposures/
   -o ${path.join(outputDir, 'exposures.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(
      path.join(outputDir, 'exposures.txt'),
    );
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      exposures: {
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
export async function scanningCVEs(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -t http/vulnerabilities
   -o ${path.join(outputDir, 'CVEs.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(path.join(outputDir, 'CVEs.txt'));
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      scanningCVEs: {
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
export async function scanningForLFI(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l  ${path.join(outputDir, 'httpx_live_domains.txt')} -tags lfi
   -o ${path.join(outputDir, 'LFI.txt')}`;
  console.log(command);
  try {
    execSync(command);
    const numberOfUrls = await countLines(path.join(outputDir, 'LFI.txt'));
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      scanningForLFI: {
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
