/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ProjectDetails } from '../../../types';
import { toast } from '../../../components/ui/use-toast';

export default function VulnsCves(details: ProjectDetails) {
  const [Loading, setLoading] = useState<boolean>(false);
  const RunVulnsCves = async () => {
    setLoading(true);
    if (details.name) {
      const res = await window.electron.ipcRenderer.invoke('vulns-cves', {
        projectName: details.name,
      });
      if (res) {
        toast({
          title: 'Vulns & CVEs job compeleted',
        });
      }
    }
    setLoading(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Loading ? (
        <Button onClick={RunVulnsCves}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
