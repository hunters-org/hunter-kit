import { PathLike } from 'fs';

export type JobDetails = {
  run: boolean;
  filePath: PathLike;
  result?: number | string;
  date: string;
};
