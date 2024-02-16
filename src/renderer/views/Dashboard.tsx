/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
import { SetStateAction, useEffect, useState } from 'react';

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// eslint-disable-next-line import/prefer-default-export
export function Dashboard() {
  const [projects, setProjects] = useState<any>();

  const [inputValue, setInputValue] = useState(''); // State to store input value

  // Function to handle input change
  const handleInputChange = (value: SetStateAction<string>) => {
    setInputValue(value);
  };

  const createProject = async (projectName: string) => {
    const res = await window.electron.ipcRenderer.sendSync('create-project', {
      name: projectName,
    });
    setProjects(res);
  };

  const sendInputToFunction = () => {
    // Call another function and pass the input value
    createProject(inputValue);
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Project Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onInputChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Domain" className="text-right">
                  Domain
                </Label>
                <Input
                  id="Domain"
                  className="col-span-3"
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={sendInputToFunction}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
