/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { ProjectDetails } from '../../../types';

export default function HttpxScreensJob(details: ProjectDetails) {
  const { name } = details;
  const [Loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const RunHttpxScreens = async () => {
    setLoading(true);
    if (details) {
      const res = await window.electron.ipcRenderer.invoke('httpx-screens', {
        projectName: name,
      });
      if (res) {
        toast({
          title: 'Screenshots are ready',
        });
      }
    }
    setLoading(false);
  };
  return (
    <>
      {!Loading ? (
        <Button onClick={RunHttpxScreens}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
