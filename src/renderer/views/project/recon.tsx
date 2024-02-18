import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import SubFinderJob from './jobs/subfinder';

export default function Recon() {
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
            <CardContent className="flex justify-end">
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
              <SubFinderJob />
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
              <SubFinderJob />
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
              <SubFinderJob />
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
              <SubFinderJob />
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
              <SubFinderJob />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
