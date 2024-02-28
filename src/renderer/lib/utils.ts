/* eslint-disable spaced-comment */
/* eslint-disable import/prefer-default-export */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ProjectDetails } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function ProjectData(names: string[]) {
  const details: ProjectDetails[] = [];
  names.forEach(async (name) => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-details',
      name,
    );
    details.push(res);
  });
  return details;
}

export function formatResultNames(name: string) {
  const names = {
    liveDomains: 'Live Sub-Domains',
    subfinder: 'Sub-Domains',
    archive: 'All paths',
    js: 'All JS paths',
    screens: 'Screen Shots of Live domains',
    params: 'All searchParams',
  };
  //@ts-expect-error
  return names[name];
}

export const PROJECT_DIR_FRONT = '../../../projects';
