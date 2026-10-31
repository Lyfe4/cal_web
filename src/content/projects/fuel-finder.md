---
slug: fuel-finder
name: Fuel Finder
order: 2
type: Web app
status: in progress
upNext: 'Next: adding Queensland prices.'
url: https://nsw-fuel-finder.netlify.app
summary: Live NSW & ACT fuel prices, cheapest first, as a list or a map, with four months of price history.
tags:
  - NSW FuelCheck data
year: 2026
stack:
  - React
  - TypeScript
  - Vite
  - TanStack Query
  - MapLibre GL
  - Netlify Functions and Blobs
source: https://github.com/Lyfe4/nsw-fuel-finder
seo:
  title: 'Fuel Finder: live NSW fuel prices, cheapest first'
  description: Fuel Finder, a web app I'm building that shows live NSW and ACT fuel prices cheapest first, on a list and a map, with four months of price history.
screenshot:
  src: ../../assets/projects/fuel-finder.webp
  alt: 'Fuel Finder in its light theme: results for Armidale, eight stations listed cheapest first with prices per litre.'
gallery:
  - src: ../../assets/projects/fuel-finder-history.webp
    alt: "Fuel Finder's price history for Freedom Fuels Armidale in the light theme: 234.5 cents a litre now, above a chart of daily Unleaded 91 prices from July to late October with a gap marked No data."
    section: what-i-built
---

## The problem

Fuel prices in NSW vary a lot from one servo to the next, even in the same town. On the day these screenshots were taken, Unleaded 91 in Armidale ran from 234.5 to 247.0 cents a litre across eight stations within 10 km.

The NSW Government publishes every station's price through FuelCheck, and offers it to developers through an API. That API allows 2,500 calls a month and locks the account after three failed sign-ins, so a site that asked it once per search could be shut down by one busy evening or one bot.

I built Fuel Finder as something my family and I could use day to day. It's also the opposite of Patchbay: everything here depends on someone else's data, quota and uptime, and the work is in making that dependable.

## What I built

A web app that answers one question: where's the cheapest fuel near me?

- **Search** by suburb or postcode, or use your location, for any of ten fuels within 2 to 25 km. Results come back cheapest first, each with its price, distance and how old the price is.
- **A one-line answer** above the list: what the cheapest is worth on a 50 litre fill compared with the average. In Armidale that day it was $3.65.
- **A map** of the same results with each price on a tag. Colour marks the cheapest, middle and dearest third, and the cheapest also say "Cheapest" in words, so colour is never the only signal.
- **Price history** for each station: a chart of about four months of daily low, high and last prices, with every value also in a table.
- Sort by nearest, filter by brand or by how old the price is, save favourites, and switch between light and dark.
- No account, cookies or tracking. "Use my location" sends only a position rounded to about 1 km.

## How it's built

Visitors never talk to the government's API. Every 30 minutes a scheduled job fetches every price in the state and stores a copy, and searches are answered from that copy. That keeps the app at about 1,500 calls a month however many people use it. The trade-off is that a price can be up to 30 minutes older than on FuelCheck, which matters little because most stations change their prices far less often.

The API has no price history, so the app keeps its own daily records. The months before it launched come from FuelCheck's published monthly files, which list every price change but not the station codes the live data uses. Stations are matched by address, then by name within the postcode, and anything ambiguous is left out rather than guessed.

### For developers

React 19 and TypeScript on Vite, with TanStack Query holding what the API returned and the search kept in the URL, so every view can be shared and Back undoes a search. A Netlify scheduled function writes the snapshot to Netlify Blobs, and an `/api` function answers searches from it. A guard stops the job after one refused sign-in, well short of the three that lock the account. MapLibre GL is about 430 kB gzipped, more than the rest of the app together, so it's a separate chunk that loads only when a map is on screen. The history join matched 99.2% of published price changes. axe runs in the unit tests in both themes, and another test simulates three kinds of colour blindness and fails if any two map colours come too close.
