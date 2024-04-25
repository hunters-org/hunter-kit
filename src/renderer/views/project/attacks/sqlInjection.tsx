import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function SqlInjection() {
  const [Loading, setLoading] = useState<boolean>(false);
  const RunSqlInjection = async () => {
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
