import util from 'util';
import { exec } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';

const execAsync = util.promisify(exec);

export function liveSubDomains(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const httprobeWPath = toolPath('httpx');
  const command = `${httprobeWPath} -l ${path.join(
    outputDir,
    'recon_subdomins.txt',
  )} -o ${path.join(outputDir, 'httpx_live_domains.txt')}`;
  try {
    execAsync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}

export function screenwin(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const httpxPath = toolPath('httpx');

  const command = `${httpxPath} -ss -l ${path.join(
    outputDir,
    'httpx_live_domains.txt',
  )} -srd ${path.join(outputDir, 'httpx_screen')}`;
  try {
    execAsync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}
