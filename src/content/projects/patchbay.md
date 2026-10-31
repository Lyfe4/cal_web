---
slug: patchbay
name: Patchbay
order: 3
type: Developer tool
status: live
url: https://patchbay-tools.netlify.app
summary: A browser-based developer toolbox that runs entirely client-side.
tags:
  - Side project
year: 2026
stack:
  - React
  - TypeScript
  - Vite
  - TanStack Router
  - Zustand
  - Web Workers
  - Netlify
source: https://github.com/Lyfe4/toolbox
seo:
  title: 'Patchbay: developer tools that cannot phone home'
  description: Patchbay, a side project of mine. Eleven developer tools that run entirely in the browser, wired into pipelines on a canvas, with no network access.
screenshot:
  src: ../../assets/projects/patchbay.webp
  alt: 'Patchbay start page: the headline Developer tools that cannot phone home, above a list of example pipelines.'
gallery:
  - src: ../../assets/projects/patchbay-canvas.webp
    alt: "Patchbay's canvas: a Base64 node wired into a Structured data node, with the inspector showing the 57 bytes of JSON it decoded."
    section: what-i-built
---

## The problem

Developers paste sensitive things into online tools all day: a login token they're debugging, a config file with a database password in it, an API response full of customer records. Most of those tools are websites, and they receive whatever you paste on a server you don't control.

I built Patchbay as a side project, to see how far a set of developer tools could go when the browser itself guarantees nothing leaves the page.

## What I built

Patchbay is eleven tools in one site: Base64, JSON, YAML and CSV conversion, hashes, JWT decoding and verification, text diff, regex testing, colour conversion with contrast checks, image conversion and resizing, video repackaging, Markdown and HTML conversion, and timestamps.

- **The Tools page** runs each tool on its own, as a plain list that works from the keyboard.
- **The canvas** wires tools together, so a one-off job like "decode this base64, then turn the JSON into YAML" becomes a pipeline you can see, re-run and share. A share link carries only the shape of the pipeline, never what you typed into it.
- **The keyboard path is complete**: add a tool, move between nodes, connect them and open each one's settings without a mouse.
- It works offline after the first visit, with no account, upload or telemetry.

## How it's built

Every page tells the browser it isn't allowed to make network requests at all. The browser enforces that rule itself, underneath the app's own code, so even a bug or a compromised package couldn't send what you paste anywhere. An automated check opens the built site in Firefox and WebKit (the engine behind Safari) and fails if a single request leaves the site.

Each tool loads only when it's first used, and the heavy ones run in a background thread, so the page stays responsive while an image converts or a large file is hashed.

### For developers

React 19 and TypeScript on Vite, with TanStack Router, Zustand and Radix UI primitives. The Content-Security-Policy sets `connect-src 'none'` and allows no `'unsafe-inline'` for scripts or styles: the two inline scripts are permitted by SHA-256 hashes computed from the built output. Tools sit in a typed registry whose eager manifest holds ports and metadata while each implementation is a lazy chunk, and a tool's `run` signature is derived from its declared ports, so a mismatched input type fails to compile. Workers transfer result buffers back but clone inputs in, because one output can feed several nodes. Each node's cache key is built from the keys of the nodes upstream rather than their values, so editing a node re-runs only it and what's downstream.
