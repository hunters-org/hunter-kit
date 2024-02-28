/* eslint-disable import/prefer-default-export */
import { PathLike, promises as fs } from 'fs';

export async function countLines(filePath: PathLike) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lineCount = data.split('\n').length;
    return lineCount - 1;
  } catch (error) {
    throw new Error(`Error reading file: ${error}`);
  }
}
