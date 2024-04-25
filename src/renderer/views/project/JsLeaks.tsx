import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Secrets from './jsLeaksJob/secrets';
import EndPoints from './jsLeaksJob/Endpoint';

export default function JsLeaks() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">JsLeaks</h1>
      <div>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Secrets</CardTitle>
              <CardDescription>wanna find secrets ?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <Secrets />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Find EndPoints</CardTitle>
              <CardDescription>
                Unveiling extra and hidden endpoints
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
              <EndPoints />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
