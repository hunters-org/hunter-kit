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

export const PROJECT_DIR_FRONT = '../../../projects';
