import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';

export function httprobeW(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const httprobeWPath = toolPath('httpx');
  const command = `${httprobeWPath} -l ${path.join(
    outputDir,
    'domains.txt',
  )} -o ${path.join(outputDir, 'httpx_live_domains.txt')}`;
  try {
    execSync(command);
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
    'domains.txt',
  )} -srd ${path.join(outputDir, 'httpx_screen')}`;
  try {
    execSync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}
