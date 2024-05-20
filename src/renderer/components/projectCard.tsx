/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ProjectDetails } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

// eslint-disable-next-line import/prefer-default-export
export function ProjectCard({ name }: { name: string }) {
  const [project, setProject] = useState<ProjectDetails>();
  const list = async () => {
    try {
      const res = await window.electron.ipcRenderer.invoke(
        'get-project-details',
        name,
      );
      setProject(res);
    } catch (error) {
      console.error('Error listing projects:', error);
    }
  };

  useEffect(() => {
    list();
  }, []);
  return (
    project && (
      <Link key={`${project.name}-kit`} to={`/${name}/dashboard`}>
        <Card className="hover:bg-slate-900 cursor-pointer duration-300">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.domain}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{formatDistanceToNow(project.updatedAt ?? Date.now())}</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Link>
    )
  );
}
