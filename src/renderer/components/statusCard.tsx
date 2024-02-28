/* eslint-disable react-hooks/exhaustive-deps */
import { formatDistanceToNow } from 'date-fns';
import { JobDetails, ProjectDetails } from '../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { formatResultNames } from '../lib/utils';

type JobDetailsWithName = JobDetails & { name: string };

// eslint-disable-next-line import/prefer-default-export
export function StatusCard(details: ProjectDetails) {
  const { name, domain, updatedAt, ...restObject } = details;
  const detailsArray: JobDetailsWithName[] = [];

  Object.entries(restObject).forEach(([key, value]) => {
    detailsArray.push({ name: key, ...value });
  });

  return detailsArray.map((job) => {
    return (
      <Card className="hover:bg-slate-900 py-4 px-6 duration-300">
        <div className="flex justify-start gap-2 mb-6 items-end">
          <div className="text-5xl font-bold">{job.result}</div>
          <div className="font-bold">{formatResultNames(job.name)}</div>
        </div>
        <p className="flex justify-end">
          Last Execution: {formatDistanceToNow(job.date)}
        </p>
      </Card>
    );
  });
}
