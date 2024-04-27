import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Exposures from './attacks/exposures';
import MissingHeaders from './attacks/missingHeaders';
import PotentialXss from './attacks/potentialXss';
import SqlInjection from './attacks/sqlInjection';

export default function Attacks() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Attacks</h1>
      <div>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan for exposures</CardTitle>
              <CardDescription>wanna find exposures ?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <Exposures />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scan for missing headers</CardTitle>
              <CardDescription>wanna find more ?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <MissingHeaders />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scan the URLs</CardTitle>
              <CardDescription>wanna catch potential XSS</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <PotentialXss />
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
              <SqlInjection />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
