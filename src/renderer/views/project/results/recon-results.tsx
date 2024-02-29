import ReconTabs from '../../../components/ui/tabs';
import { ScreenResults } from './screen-results';
import { LivedomainResults } from './live-results';
import { SubdomainResults } from './sub-domains';

/* eslint-disable import/prefer-default-export */
export function ReconResults() {
  return (
    <ReconTabs
      ScreensComponent={<ScreenResults />}
      ParamsComponent={undefined}
      SubComponent={<SubdomainResults />}
      LiveComponent={<LivedomainResults />}
    />
  );
}
