/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { ProjectDetails } from '../../../types';

export default function LiveSubdomainsJob(details: ProjectDetails) {
  const { name } = details;
  const [Loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const RunLiveSubDomains = async () => {
    setLoading(true);
    const res = await window.electron.ipcRenderer.invoke('httpx-live-domain', {
      projectName: name,
    });
    if (res) {
      toast({
        title: 'live sub-domains are ready',
      });
    }
    setLoading(false);
  };
  return (
    <>
      {!Loading ? (
        <Button onClick={RunLiveSubDomains}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
