import { execSync } from 'child_process';
import path from 'path';
import { toolPath } from '../util';
import { PROJECT_DIR } from '../api/project';

export function wwayback(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const wwaybackPath = toolPath('waybackurls');
  const command = `cat "${path.join(
    outputDir,
    'recon_subdomins.txt',
  )}" | ${wwaybackPath} >> ${path.join(outputDir, 'waybackurls_archive.txt')}`;

  //  'type "D:\\recon_result\\domains.txt" | D:\\05-Haitham\\Projects\\hunter\\bin\\waybackurls >> "D:\\recon_result\\archive.txt"';

  try {
    execSync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}
export function fetchJs(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const wwaybackPath = toolPath('waybackurls');
  const command = `cat "${path.join(
    outputDir,
    'recon_subdomins.txt',
  )}" | ${wwaybackPath} | findstr ".js" >> ${path.join(outputDir, 'waybackurls_js.txt')}`;
  try {
    execSync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}
export function parameter(outputDir: string = PROJECT_DIR): {
  message: string;
  success: boolean;
  error: any;
} {
  const wwaybackPath = toolPath('waybackurls');

  const command = `cat "${path.join(
    outputDir,
    'recon_subdomins.txt',
  )}" | ${wwaybackPath} | findstr "=" >> ${path.join(
    outputDir,
    'waybackurls_parameter.txt',
  )}`;
  try {
    execSync(command);
    return { message: 'Done', success: true, error: '' };
  } catch (error) {
    return { message: 'Error', success: false, error };
  }
}
