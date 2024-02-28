/* eslint-disable import/prefer-default-export */
import { PathLike } from 'fs';
import { JSONDB } from './core/node';
import { JobDetails } from '../types';

export interface ProjectDetails {
  name: string;
  domain: string;
  recon?: {
    subfinder?: JobDetails;
    screens?: JobDetails;
    params?: JobDetails;
    liveDomains?: JobDetails;
  };
  updatedAt: Date;
}

export function connectJson(path: PathLike) {
  const db = new JSONDB<ProjectDetails>(path);
  return db;
}
