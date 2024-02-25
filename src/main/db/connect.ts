/* eslint-disable import/prefer-default-export */
import { PathLike } from 'fs';
import { JSONDB } from './core/node';
import { JobDetails } from '../types';

export interface ProjectDetails {
  name: string;
  domain: string;
  recon?: {
    subfinder: JobDetails;
    screens: JobDetails;
    params: JobDetails;
    liveDomains: JobDetails;
  };
}

export function connectJson<_T = ProjectDetails>(path: PathLike) {
  const db = new JSONDB<_T>(path);
  return db;
}
