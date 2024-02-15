/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

// eslint-disable-next-line import/prefer-default-export
export function Dashboard() {
  const [projects, setProjects] = useState<any>();

  const createProject = async () => {
    const res = await window.electron.ipcRenderer.sendSync('create-project', {
      name: 'new-pro',
    });
    setProjects(res);
  };
  const list = async () => {
    const res = await window.electron.ipcRenderer.sendSync('list-projects');
    setProjects(res);
  };

  useEffect(() => {
    list();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-20 container py-10">
      {projects?.map((project: string) => {
        return (
          <Link to={project}>
            <Card className="hover:bg-slate-900 cursor-pointer duration-300">
              <CardHeader>
                <CardTitle>{project}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
      <Card className="flex flex-col space-y-4 py-14 justify-center items-center">
        <h1 className="font-bold text-xl">New project</h1>
        <Button onClick={createProject}>Create</Button>
      </Card>
    </div>
  );
}
