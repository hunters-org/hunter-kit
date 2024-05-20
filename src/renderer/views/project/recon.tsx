/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
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
  const { projectSlug } = useParams();

  const getDetails = async () => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-details',
      projectSlug,
    );
    setDetails(res);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Initiate Recon Attacks</h1>
      {details && (
        <div>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Subdomains</CardTitle>
                <CardDescription>
                  Enumurate all subdomains of your target.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.subfinder?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>
                          {formatDistanceToNow(details?.subfinder?.date)}
                        </span>
                      </h1>
                    )}
                  </div>
                )}
                <SubFinderJob {...details} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Find live Subdomains</CardTitle>
                <CardDescription>
                  Check which subdomains are live?
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.liveDomains?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>
                          {formatDistanceToNow(details.liveDomains.date)}
                        </span>
                      </h1>
                    )}
                  </div>
                )}
                <LiveSubdomainsJob {...details} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Screenshots</CardTitle>
                <CardDescription>
                  See what is your target look like ?
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.screens?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>{formatDistanceToNow(details.screens.date)}</span>
                      </h1>
                    )}
                  </div>
                )}
                <HttpxScreensJob {...details} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Archive</CardTitle>
                <CardDescription>
                  Crawl all the URLs of your target from the wayback machine.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.archive?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>{formatDistanceToNow(details.archive.date)}</span>
                      </h1>
                    )}
                  </div>
                )}
                <WaybackurlsArchiveJob {...details} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Js Files</CardTitle>
                <CardDescription>Get all the js.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.js?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>{formatDistanceToNow(details.js.date)}</span>
                      </h1>
                    )}
                  </div>
                )}
                <WaybackurlsJsJob {...details} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get Parameters</CardTitle>
                <CardDescription>Get all the Parameters.</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                {details && (
                  <div className="flex flex-col space-x-2">
                    {details?.params?.date && (
                      <h1 className="flex flex-col font-semibold">
                        Last Run{' '}
                        <span>{formatDistanceToNow(details.params.date)}</span>
                      </h1>
                    )}
                  </div>
                )}
                <WaybackurlsParameterJob {...details} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
