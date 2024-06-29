import { ReactNode } from 'react';

export type DashboardMenu = {
  href: string;
  title: string;
  Disabled?: boolean;
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
  subfinder?: JobDetails;
  screens?: JobDetails;
  params?: JobDetails;
  liveDomains?: JobDetails;
  generalScanning?: JobDetails;
  XSS?: JobDetails;
  multiScans?: JobDetails;
  archive?: JobDetails;
  js?: JobDetails;
  updatedAt: Date;
}

export type ResultsType = {
  name: string;
  where: string;
  href: string;
};

export const ReconTab = {
  SCREEN: 'Screenshots',
  LIVESUB: 'Live sub-domains',
  SUB: 'Sub-domains',
  PARAMS: 'All Params',
} as const;

export type ReconTabs = keyof typeof ReconTab;
