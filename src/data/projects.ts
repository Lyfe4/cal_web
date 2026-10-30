import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** All projects in home-page order. */
export const getProjects = async (): Promise<Project[]> =>
  (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

export const projectPath = (project: Project): string => `/work/${project.data.slug}`;

/** "https://lenbuild.com" -> "lenbuild.com", for the frame's address bar */
export const displayHost = (url: string): string => new URL(url).hostname.replace(/^www\./, '');
