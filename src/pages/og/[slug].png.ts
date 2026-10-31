import type { APIRoute, GetStaticPaths } from 'astro';
import { getProjects, projectPath, type Project } from '../../data/projects';
import { caseCardSvg, renderPng } from '../../utils/brand';

/** One social card per case study, at /og/<slug>.png. */
export const getStaticPaths = (async () =>
  (await getProjects()).map((project) => ({
    params: { slug: project.data.slug },
    props: { project },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ project: Project }> = async ({ props: { project } }) => {
  const { name, type, tags, status } = project.data;
  const svg = caseCardSvg({
    name,
    kind: [type, ...tags].join(' · '),
    status,
    path: projectPath(project),
  });
  return new Response(new Uint8Array(await renderPng(svg)), {
    headers: { 'Content-Type': 'image/png' },
  });
};
