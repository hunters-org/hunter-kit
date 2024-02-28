/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
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
import { ProjectCard } from '../components/projectCard';

// eslint-disable-next-line import/prefer-default-export
export function Dashboard() {
  const [projects, setProjects] = useState<string[]>();
  const list = async () => {
    try {
      const projectNames: string[] =
        await window.electron.ipcRenderer.invoke('list-projects');
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
      {projects?.map((project) => {
        return <ProjectCard name={project} />;
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
