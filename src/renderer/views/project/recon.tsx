import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import SubFinderJob from './jobs/subfinder';
import LiveSubdomainsJob from './jobs/liveSubDomains';
import HttpxScreensJob from './jobs/httpxScreens';
import WaybackurlsArchiveJob from './jobs/waybackurlsArchive';
import WaybackurlsJsJob from './jobs/waybackurlsJs';
import WaybackurlsParameterJob from './jobs/waybackurlsParameter';
import { ProjectDetails } from '../../types';

export default function Recon() {
  const [details, setDetails] = useState<ProjectDetails>();
  const getDetails = async () => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-detailss',
      'onboardbase',
    );
    setDetails(res);
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Initiate Recon Attacks</h1>
      <div>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Subdomains</CardTitle>
              <CardDescription>
                This will run a job to get all sub-domians for this project
                domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              {details && (
                <div className="flex flex-col space-x-2">
                  <h1 className="flex flex-col font-semibold">
                    Last Run <span>{details.recon?.subfinder?.date}</span>
                  </h1>
                </div>
              )}
              <SubFinderJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Find live Subdomains</CardTitle>
              <CardDescription>
                This will run a job to get all live sub-domians for this project
                domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <LiveSubdomainsJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Screenshots</CardTitle>
              <CardDescription>
                This will run a job to get screenshots for all sub-domians for
                this project domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <HttpxScreensJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Archive</CardTitle>
              <CardDescription>
                This will run a job to get Archive for this project domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <WaybackurlsArchiveJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Js Files</CardTitle>
              <CardDescription>
                This will run a job to get Js Fils for all sub-domians for this
                this project domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <WaybackurlsJsJob />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Parameters</CardTitle>
              <CardDescription>
                This will run a job to get Parameters for this this project this
                this project domain
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <WaybackurlsParameterJob />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
