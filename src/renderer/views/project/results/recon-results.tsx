import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/card';
import { Results } from '../../../types';
import ReconTabs from '../../../components/ui/tabs';

/* eslint-disable import/prefer-default-export */
const resultsCard: Results[] = [
  {
    name: 'screenshots of Live sub-domins',
    where: '',
    href: 'screens',
  },
  {
    name: 'All sub-domains',
    where: '',
    href: 'subdomains',
  },
  {
    name: 'All Live sub-domains',
    where: '',
    href: 'liveSub',
  },
  {
    name: 'All domains paths',
    where: '',
    href: 'paths',
  },
];
export function ReconResults() {
  return (
    <ReconTabs
      ScreensComponent={undefined}
      ParamsComponent={undefined}
      SubComponent={undefined}
      LiveComponent={undefined}
    />
  );
}
