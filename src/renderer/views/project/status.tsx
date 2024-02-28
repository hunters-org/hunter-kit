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
  const list = async () => {
    try {
      const projectNames = await window.electron.ipcRenderer.invoke(
        'get-project-details',
        projectSlug,
      );
      setProjects(projectNames);
    } catch (error) {
      console.error('Error listing projects:', error);
    }
  };

  useEffect(() => {
    list();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-20 container py-10">
      {project && <StatusCard {...project} />}
    </div>
  );
}
