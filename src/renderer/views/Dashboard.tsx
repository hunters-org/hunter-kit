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
import { Input } from '../components/ui/input';

// eslint-disable-next-line import/prefer-default-export
export function Dashboard() {
  const [projects, setProjects] = useState<string[]>();
  const [searchQuery, setSearchQuery] = useState('');

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
  const filteredProjects = projects?.filter((project) =>
    project.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 max-w-[18rem] border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-flow-row grid-cols-2 gap-10">
        <Card className="flex flex-col space-y-4 justify-center items-center">
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
        {filteredProjects?.map((project) => (
          <ProjectCard key={project} name={project} />
        ))}
        {filteredProjects?.length === 0 && <div>No Results Found</div>}
      </div>
    </div>
  );
}
