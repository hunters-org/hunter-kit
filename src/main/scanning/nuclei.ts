import path from 'path';
import util from 'util';
import { exec } from 'child_process';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';
import { connectJson } from '../db/connect';
import { countLines } from '../results/countResults';

const execAsync = util.promisify(exec);

async function runScan(
  scanType: string,
  outputFileName: string,
  dbKey: string,
  outputDir: string,
  inputFile: string = 'httpx_live_domains.txt', // Default value set here
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  const nuclie = toolPath('nuclei');
  const command = `${nuclie} -l ${outputDir}/${inputFile} ${scanType} -o ${path.join(outputDir, outputFileName)}`;
  console.log(command);
  try {
    await execAsync(command);
    const numberOfUrls = await countLines(path.join(outputDir, outputFileName));
    const db = connectJson(path.join(`${outputDir}/details.json`));
    await db.update({
      [dbKey]: {
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

export async function generalScanning(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-t http/',
    'general_scanning.txt',
    'generalScanning',
    outputDir,
  );
}

export async function exposedPanels(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-t http/exposed-panels',
    'exposed_panels.txt',
    'exposedPanels',
    outputDir,
  );
}

export async function defaultCredentials(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-t http/default-logins',
    'default_credentials.txt',
    'defaultCredentials',
    outputDir,
  );
}

export async function subdomainTakeovers(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-t http/takeovers',
    'subdomain_takeovers.txt',
    'subdomainTakeovers',
    outputDir,
  );
}

export async function scanningForExposures(
  outputDir: string = PROJECT_DIR,
): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan('-t exposures/', 'exposures.txt', 'exposures', outputDir);
}

export async function scanningCVEs(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-t http/vulnerabilities',
    'CVEs.txt',
    'scanningCVEs',
    outputDir,
    'waybackurls_archive.txt', // inputFile is now optional
  );
}

export async function scanningForLFI(outputDir: string = PROJECT_DIR): Promise<{
  message: string;
  success: boolean;
  error: any;
}> {
  return runScan(
    '-tag lfi',
    'LFI.txt',
    'scanningForLFI',
    outputDir,
    'waybackurls_archive.txt',
  ); // inputFile is now optional
}
