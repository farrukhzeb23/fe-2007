export type Gist = {
  id: string;
  name: string;
  fileName: string;
  notebookName: string;
  keywords: string[];
  updatedAt: string;
  createdAt: string;
  description: string;
  code: string;
  link: string;
  language?: string; // Optional as we can also determine it from the filename
};
