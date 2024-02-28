/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { ProjectDetails } from '../../../types';

export default function SubFinderJob(details: ProjectDetails) {
  const { name, domain } = details;
  const [Loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const RunSubFinder = async () => {
    setLoading(true);
    if (details) {
      const res = await window.electron.ipcRenderer.invoke(
        'subfinder-process',
        {
          projectName: name,
          domain,
        },
      );
      if (res) {
        toast({
          title: 'sub-domains job compeleted',
        });
      }
    }
    setLoading(false);
  };
  return (
    <>
      {!Loading ? (
        <Button onClick={RunSubFinder}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
