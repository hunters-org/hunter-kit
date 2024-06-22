/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  projectName: z
    .string()
    .min(2)
    .max(50)
    .refine(
      (val) => {
        const regex = /^[a-zA-Z0-9-]+$/;
        return regex.test(val);
      },
      {
        message:
          'project name cannot have spaces, and its only accept -, numbers and characters',
      },
    ),
  domain: z.string().refine(
    (val) => {
      const regex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
      return regex.test(val);
    },
    {
      message: 'domain cannot start with http or https, ex: google.com',
    },
  ),
});

export function CreateProjectForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      domain: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await window.electron.ipcRenderer.invoke(
      'create-project',
      values,
    );
    if (!res.error) {
      toast({
        title: 'Project Created',
      });
      navigate(`/${values.projectName}/dashboard`);
    } else {
      toast({
        title: "There's smth went wrong",
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Tesla" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="ex:tesla.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
