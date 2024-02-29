/* eslint-disable prettier/prettier */
/* eslint-disable react/no-danger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

/* eslint-disable import/prefer-default-export */
export function ScreenResults() {
  const { projectSlug } = useParams();
  const [data, setData] = useState<any>();

  const getHtmlFile = async () => {
    const res = await window.electron.ipcRenderer.invoke('api-call', {
      projectName: projectSlug,
      type: 'text/html',
      location: 'httpx_screen/screenshot/screenshot.html',
    });
    const sanitizedHTML = res.body.replace(/body\s*{\s*display:\s*flex;\s*justify-content:\s*center;\s*align-items:\s*center;\s*}/g, '');
    setData(sanitizedHTML);
  };

  useEffect(() => {
    getHtmlFile();
  }, []);
  return (
    <div
      className=""
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
