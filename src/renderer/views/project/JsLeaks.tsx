/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import Secrets from './jsLeaksJob/secrets';
import EndPoints from './jsLeaksJob/Endpoint';
import { ProjectDetails } from '../../types';


export default function JsLeaks() {
  const [details, setDetails] = useState<ProjectDetails>();
  const { projectSlug } = useParams();

  const getDetails = async () => {
    const res = await window.electron.ipcRenderer.invoke(
      'get-project-details',
      projectSlug,
    );
    setDetails(res);
    console.log(res);
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">JsLeaks</h1>
      {details && (
        <div>
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Find Secrets</CardTitle>
                <CardDescription>wanna find secrets ?</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between">
                <Secrets {...details} />
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
                <EndPoints {...details} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
