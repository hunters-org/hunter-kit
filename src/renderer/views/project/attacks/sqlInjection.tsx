/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ProjectDetails } from '../../../types';
import { toast } from '../../../components/ui/use-toast';

export default function SqlInjection(details: ProjectDetails) {
  const [Loading, setLoading] = useState<boolean>(false);
  const RunSqlInjection = async () => {
    if (details.name) {
      const res = await window.electron.ipcRenderer.invoke('multi-scans', {
        projectName: details.name,
      });
      if (res) {
        toast({
          title: 'Multi Scans job compeleted',
        });
      }
    }
    setLoading(true);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Loading ? (
        <Button onClick={RunSqlInjection}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
