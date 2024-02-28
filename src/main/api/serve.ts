/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import path from 'path';
import { PROJECT_DIR } from './project';

export function returnFile(where: string, type: string) {
  const filePath = path.join(PROJECT_DIR, where);
  try {
    const data = fs.readFileSync(filePath, { encoding: 'utf-8' });

    return {
      statusCode: 200,
      body: data,
      headers: {
        'Content-Type': type,
      },
    };
  } catch (error) {
    console.error('Error reading file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
