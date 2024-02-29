import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type subDomains = {
  domain: string;
};

export const columns: ColumnDef<subDomains>[] = [
  {
    accessorKey: 'domain',
    header: 'Sub-Domain',
  },
];
