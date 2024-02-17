import { ReactNode } from 'react';

export type DashboardMenu = {
  href: string;
  title: string;
  icon: ReactNode;
};

export type ProjectDetails = {
  name: string;
  domain: string;
};
