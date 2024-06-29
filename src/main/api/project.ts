/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { connectJson } from '../db/connect';

export const PROJECT_DIR = path.join(__dirname, '../../../projects');

export function readDirectoryNames(
  directoryPath: string = PROJECT_DIR,
): string[] {
  try {
    // Read the contents of the directory
    const dirContents = fs.readdirSync(directoryPath);

    // Filter out only directories
    const directories = dirContents.filter((item) => {
      const itemPath = `${directoryPath}/${item}`;
      return fs.statSync(itemPath).isDirectory();
    });

    return directories;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    return [];
  }
}
// eslint-disable-next-line consistent-return
export function createProjectDir(name: string) {
  try {
    const dir = fs.mkdirSync(`${PROJECT_DIR}/${name}`);
    return dir;
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}
export function createJsonFile(name: string, domain: string) {
  const obj = {
    name,
    domain,
  };
  const stringifyObj = JSON.stringify(obj);
  try {
    fs.writeFileSync(
      path.join(`${PROJECT_DIR}/${name}`, 'details.json'),
      stringifyObj,
    );
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}

async function getResults(projectUUID: string) {
  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/accounts/3cce5a88886b46f56d9ff989b715a588/urlscanner/scan/${projectUUID}`,
      {
        headers: {
          Authorization: 'Bearer -Oiz0_Rh5LTRpiA24XSH_eTyr5CqR0BrnOwRhQLx',
        },
      },
    );
    return response;
  } catch (error) {
    console.error('Error retrieving results:', error);
    throw error;
  }
}

export async function createRequestToUrlScanner(name: string, domain: string) {
  try {
    const response = await axios.post(
      'https://api.cloudflare.com/client/v4/accounts/3cce5a88886b46f56d9ff989b715a588/urlscanner/scan/',
      {
        url: `https://${domain}`,
      },
      {
        headers: {
          Authorization: 'Bearer -Oiz0_Rh5LTRpiA24XSH_eTyr5CqR0BrnOwRhQLx',
        },
      },
    );
    if (response.status === 200) {
      const projectUUID = response.data.result.uuid;

      let attempts = 0;
      const maxAttempts = 5; // Maximum number of retries
      const retryDelay = 2000; // Delay between retries in milliseconds

      const checkResults = async () => {
        try {
          const resultResponse = await getResults(projectUUID);
          if (resultResponse.status === 202 && attempts < maxAttempts) {
            attempts++;
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(checkResults, retryDelay);
          } else {
            fs.writeFileSync(
              path.join(`${PROJECT_DIR}/${name}`, 'cf_scan.json'),
              JSON.stringify(resultResponse.data.result),
              'utf-8',
            );
            console.log(`cf_scan Finished`);
          }
        } catch (error) {
          console.error('Error retrieving results:', error);
          return false;
        }
      };

      setTimeout(checkResults, retryDelay);
    }
    return true;
  } catch (error: any) {
    if (error.response.status === 409) {
      const { data } = error.response;
      const projectUUID = data.result.tasks[0].uuid;
      let attempts = 0;
      const maxAttempts = 5; // Maximum number of retries
      const retryDelay = 2000; // Delay between retries in milliseconds

      const checkResults = async () => {
        try {
          const resultResponse = await getResults(projectUUID);
          if (resultResponse.status === 202 && attempts < maxAttempts) {
            attempts++;
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            setTimeout(checkResults, retryDelay);
          } else {
            fs.writeFileSync(
              path.join(`${PROJECT_DIR}/${name}`, 'cf_scan.json'),
              JSON.stringify(resultResponse.data.result),
              'utf-8',
            );
            console.log(`cf_scan Finished`);
          }
        } catch (error) {
          console.error('Error retrieving results:', error);
          return false;
        }
      };

      setTimeout(checkResults, retryDelay);
    }
  }
  return true;
}

export function appendDateToJson(projectName: string, data: Object) {
  try {
    const blob = fs.readFileSync(
      path.join(`${projectName}`, 'details.json'),
      'utf-8',
    );
    const oldData = JSON.parse(blob);
    const newData = JSON.stringify({ ...oldData, ...data });
    fs.writeFileSync(path.join(`${projectName}`, 'details.json'), newData);
  } catch (err) {
    console.error(`Error creating project dir: ${err}`);
  }
}

export function projectDetails(projectName: string) {
  try {
    const db = connectJson(`${PROJECT_DIR}/${projectName}/details.json`);
    return db.read();
  } catch (error) {
    throw new Error('Project Cannot be created');
  }
}

export function projectScan(projectName: string) {
  try {
    const db = connectJson(`${PROJECT_DIR}/${projectName}/cf_scan.json`);
    return db.read();
  } catch (error) {
    return 'error';
  }
}

export function projectAttackResult(projectName: string) {
  try {
    const db = connectJson(
      `${PROJECT_DIR}/${projectName}/general_scanning.json`,
    );
    return db.read();
  } catch (error) {
    return 'error';
  }
}
