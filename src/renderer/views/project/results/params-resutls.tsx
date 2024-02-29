/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { textToArray } from './lib/utils';
import { columns, subDomains } from './tables/columns';
import { DataTable } from './tables/data-table';
import { Button } from '../../../components/ui/button';

/* eslint-disable import/prefer-default-export */
export function ParamsResults() {
  const { projectSlug } = useParams();
  const [data, setData] = useState<subDomains[]>();

  const getHtmlFile = async (location: string = "waybackurls_archive.txt") => {
    const res = await window.electron.ipcRenderer.invoke('api-call', {
      projectName: projectSlug,
      type: 'text/utf-8',
      location,
    });
    const formAsArray = textToArray(res.body)
    setData(formAsArray);
  };

  const handleClick = (loc:string) =>{
    getHtmlFile(loc)
  }
  useEffect(() => {
    getHtmlFile();
  }, []);
  return (
    <div>
      <div className="flex space-x-2">
        <Button onClick={()=> handleClick('waybackurls_js.txt')}>All JS</Button>
        <Button onClick={()=> handleClick('waybackurls_parameter.txt')}>searchParams</Button>
        <Button onClick={()=> handleClick('waybackurls_archive.txt')}>All</Button>
      </div>
      {data && <DataTable data={data} columns={columns}/>}
    </div>
  );
}
