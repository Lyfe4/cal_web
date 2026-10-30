---
slug: lenbuild
name: LenBuild
order: 1
type: Client website
status: live
url: https://lenbuild.com
summary: Website for a custom home builder in Guyra, built to show their homes and turn local searches into enquiries.
tags:
  - Guyra, NSW
client: LenBuild
year: 2025
stack:
  - React
  - Vite
  - react-snap
  - Formspree
  - Netlify
seo:
  title: 'LenBuild: website for a Guyra home builder'
  description: The website I built for LenBuild, a family-run builder in Guyra, NSW. Six prerendered pages, local pages for Guyra and Armidale, and an enquiry form.
screenshot:
  src: ../../assets/projects/lenbuild.webp
  alt: "LenBuild's Projects and Services page: the Custom Home Building section with photos of a finished home."
gallery:
  - src: ../../assets/projects/lenbuild-home.webp
    alt: "LenBuild's home page: the headline Quality Building Solutions For Your Home over a photo of a finished kitchen, with Get in touch and View our work buttons."
    section: what-i-built
---

## The brief

LenBuild is a family-run building company in Guyra, NSW. They build custom homes, extensions and renovations across the New England region, and offer paid consultation (PAC), which brings the builder into the design stage before anything is drawn up.

They needed a website that showed the quality of their work, explained each service plainly and made it easy for people nearby to get in touch about a project.

## What I built

A six-page website: Home, About, Projects & Services and Contact, plus two local pages, one for custom homes in Guyra and one for people looking for builders in Armidale.

- **Projects & Services** gives each service its own section with photos of finished work, so people can judge the quality before they call.
- **The contact form** asks which service someone is interested in, so each enquiry arrives already sorted. It checks every field before sending, and a short FAQ beside it answers the usual first questions: service area, timelines and design.
- **Every page** describes the business to search engines in structured data: what LenBuild does, where it's based and the areas it serves.

## How it's built

Each page is built into a finished HTML file before it goes online. Visitors and search engines get the full text straight away, without waiting for code to run, and there's no server or database for LenBuild to pay for or keep up to date.

Enquiries go through Formspree, a form service that sends each one to LenBuild's inbox. The form catches missing or badly formatted details before it sends, and limits repeat submissions to keep spam down.

### For developers

React 18 and Vite, with react-snap prerendering all six routes to static HTML after the build, so crawlers never depend on JavaScript. react-helmet-async sets each page's title, description and canonical, and the LocalBusiness and HomeAndConstructionBusiness JSON-LD ships in the static markup. Netlify builds a deploy preview for every pull request.
