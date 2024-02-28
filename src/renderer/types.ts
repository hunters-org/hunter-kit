import { ReactNode } from 'react';

export type DashboardMenu = {
  href: string;
  title: string;
  icon: ReactNode;
};

export type jobLoaders = {
  job: string;
  state: boolean;
};

export type JobDetails = {
  run: boolean;
  filePath: string;
  result?: number | string;
  date: string;
};

export interface ProjectDetails {
  name: string;
  domain: string;
  recon?: {
    subfinder?: JobDetails;
    screens?: JobDetails;
    params?: JobDetails;
    liveDomains?: JobDetails;
  };
  updatedAt: string;
}
