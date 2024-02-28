/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useToast } from '../../../components/ui/use-toast';
import { ProjectDetails } from '../../../types';

export default function WaybackurlsArchiveJob(details: ProjectDetails) {
  const { name } = details;

  const [Loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const RunWaybackurlsArchive = async () => {
    setLoading(true);
    const res = await window.electron.ipcRenderer.invoke(
      'waybackurls-archive',
      {
        projectName: name,
      },
    );
    if (res.success) {
      toast({
        title: 'Archive urls is ready',
      });
    } else {
      toast({
        title: res.message,
        variant: 'destructive',
      });
    }
    setLoading(false);
  };
  return (
    <>
      {!Loading ? (
        <Button onClick={RunWaybackurlsArchive}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
