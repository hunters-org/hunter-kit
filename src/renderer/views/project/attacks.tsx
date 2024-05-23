/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { ProjectDetails } from '../../types';
import GeneralScan from './attacks/generalScan';
import ExposedPanels from './attacks/exposedPanels';
import DefaultCredentials from './attacks/defaultCredentials';
import SubdomainTakeovers from './attacks/subdomainTakeovers';
import Exposures from './attacks/exposures';
import VulnsCves from './attacks/vulns&Cves';
import Lfi from './attacks/lfi';
import PotentialXss from './attacks/potentialXss';
import SqlInjection from './attacks/sqlInjection';

export default function Attacks() {
  const [details, setDetails] = useState<ProjectDetails>();
  const { projectSlug } = useParams();

  const getDetails = async () => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-details',
      projectSlug,
    );
    setDetails(res);
  };
  getDetails();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Attacks</h1>
      {details && (
        <div>
          <h2 className="font-bold text-2xl mb-4 text-center">General</h2>
          <div className="mb-8">
            <div className="grid grid-flow-row grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Scanning</CardTitle>
                  <CardDescription>wanna scan?</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <GeneralScan {...details} />
                </CardContent>
              </Card>
            </div>
          </div>
          <h2 className="font-bold text-2xl mb-4 text-center">
            Misconfigurations and Easy Wins
          </h2>
          <div className="mb-8">
            <div className="grid grid-flow-row grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hunting Exposed panels</CardTitle>
                  <CardDescription>wanna find exposed panels ?</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <ExposedPanels {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hunting Default Credentials</CardTitle>
                  <CardDescription>
                    wanna find Default Credentials ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <DefaultCredentials {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hunting subdomain takeovers</CardTitle>
                  <CardDescription>
                    wanna find subdomain takeovers ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <SubdomainTakeovers {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hunting for exposures</CardTitle>
                  <CardDescription>wanna scan for Exposures ?</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Exposures {...details} />
                </CardContent>
              </Card>
            </div>
          </div>
          <h2 className="font-bold text-2xl mb-4 text-center">
            Testing for Vulnerabilities
          </h2>
          <div className="mb-8">
            <div className="grid grid-flow-row grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scanning for Known Vulns and CVEs</CardTitle>
                  <CardDescription>wanna find a Vuln or CVE ?</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <VulnsCves {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Testing for LFI</CardTitle>
                  <CardDescription>wanna test for LFI ?</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Lfi {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Hunting XSS</CardTitle>
                  <CardDescription>wanna catch potential XSS</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <PotentialXss {...details} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Scan for SQL Injection</CardTitle>
                  <CardDescription>
                    SSTI, Open Redirect & CRLF Injection
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <SqlInjection {...details} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
