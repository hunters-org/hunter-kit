/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StatusCard } from '../../components/statusCard';
import { ProjectDetails } from '../../types';

export default function Status() {
  const { projectSlug } = useParams();
  const [project, setProjects] = useState<ProjectDetails>();
  const [scan, setScan] = useState<any>();
  const list = async () => {
    try {
      const projectNames = await window.electron.ipcRenderer.invoke(
        'get-project-details',
        projectSlug,
      );
      const projectScan = await window.electron.ipcRenderer.invoke(
        'get-project-scan',
        projectSlug,
      );
      if (projectScan !== 'error') {
        setScan(projectScan);
        console.log(projectScan);
      }
      setProjects(projectNames);
    } catch (error) {
      console.error('Error listing projects:', error);
    }
  };

  useEffect(() => {
    list();
  }, []);
  return (
    <div className="container py-10">
      {scan && (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Target Information</h1>
          <div>
            <h1>Tech Stack</h1>
            <ul className="grid grid-flow-cols grid-cols-2 gap-2 py-2 px-1.5 border-2 rounded">
              {scan &&
                scan.scan.meta.processors.tech.map((tech: any) => {
                  return (
                    <li className="flex items-center space-x-2">
                      <img
                        className="h-6 w-6"
                        alt={tech.name}
                        src={`https://www.google.com/s2/favicons?domain=${tech.website}&sz=128`}
                      />
                      <h1 className="text-xs font-bold">{tech.name}</h1>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h1>Target Ips</h1>
            <ul className="grid grid-flow-cols grid-cols-2 gap-2 py-2 px-1.5 border-2 rounded">
              {scan &&
                Object.entries(scan.scan.ips).map(([key, value]) => {
                  return (
                    <li className="flex items-center space-x-2">
                      <h1 className="text-xs font-bold">
                        {value.ipVersion}: {key}
                      </h1>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
      <div className="grid grid-flow-row grid-cols-2 gap-20">
        {project && <StatusCard {...project} />}
      </div>
    </div>
  );
}
