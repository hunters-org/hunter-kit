/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { ProjectDetails } from '../../../types';
import { toast } from '../../../components/ui/use-toast';

export default function Lfi(details: ProjectDetails) {
  const [Loading, setLoading] = useState<boolean>(false);
  const RunLfi = async () => {
    setLoading(true);
    if (details.name) {
      const res = await window.electron.ipcRenderer.invoke('lfi', {
        projectName: details.name,
      });
      if (res) {
        toast({
          title: 'LFI job compeleted',
        });
      }
    }
    setLoading(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Loading ? (
        <Button onClick={RunLfi}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
