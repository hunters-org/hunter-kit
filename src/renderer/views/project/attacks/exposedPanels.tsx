import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ProjectDetails } from '../../../types';
import { Button } from '../../../components/ui/button';
import { toast } from '../../../components/ui/use-toast';

export default function ExposedPanels(details: ProjectDetails) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Loading, setLoading] = useState<boolean>(false);
  const RunExposedPanels = async () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (details.name) {
      const res = await window.electron.ipcRenderer.invoke('exposed-panels', {
        // eslint-disable-next-line react/destructuring-assignment
        projectName: details.name,
      });
      if (res) {
        toast({
          title: 'Exposed Panels job compeleted',
        });
      }
    }
    setLoading(true);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Loading ? (
        <Button onClick={RunExposedPanels}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
