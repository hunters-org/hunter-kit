/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { textToArray } from './lib/utils';
import { columns, subDomains } from './tables/columns';
import { DataTable } from './tables/data-table';

/* eslint-disable import/prefer-default-export */
export function LivedomainResults() {
  const { projectSlug } = useParams();
  const [data, setData] = useState<subDomains[]>();

  const getHtmlFile = async () => {
    const res = await window.electron.ipcRenderer.invoke('api-call', {
      projectName: projectSlug,
      type: 'text/utf-8',
      location: 'httpx_live_domains.txt',
    });
    const formAsArray = textToArray(res.body)
    setData(formAsArray);
  };

  useEffect(() => {
    getHtmlFile();
  }, []);
  return (
    data && <DataTable data={data} columns={columns}/>
  );
}
