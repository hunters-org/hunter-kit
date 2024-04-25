import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function Exposures() {
  const [Loading, setLoading] = useState<boolean>(false);
  const RunExposures = async () => {
    setLoading(true);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!Loading ? (
        <Button onClick={RunExposures}>Process</Button>
      ) : (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      )}
    </>
  );
}
