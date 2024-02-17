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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

import { CreateProjectForm } from '../components/createProject.form';

// eslint-disable-next-line import/prefer-default-export
export function Dashboard() {
  const [projects, setProjects] = useState<any>();

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
          <Link key={project} to={`/${project}/dashboard`}>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
            </DialogHeader>
            <CreateProjectForm />
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
