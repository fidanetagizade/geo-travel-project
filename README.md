# Geo Travel Project

A React-based web application for exploring countries around the world and planning your travels — combining country data with practical trip-planning tools like budgeting and packing lists.

## Features

- 🌍 **Country Explorer** — browse countries with their flags, names, population, and other key details, pulled from the REST Countries API
- 🔍 **Search** — quickly search and filter countries by name
- ⭐ **Favorites** — mark countries as favorites from the Home page; they appear in a dedicated Favorites page for easy access
- 💰 **Budget Planner** — plan and track your travel budget for a trip
- ✅ **Packing To-Do List** — add items you need to pack; click an item to mark it as packed (strikethrough)
- 🎨 Clean, custom UI styled with CSS

## Tech Stack

- React
- Redux Toolkit (state management)
- React Router (page navigation)
- REST Countries API (restcountries.com, v5)
- CSS

## How to Run

```bash
git clone https://github.com/fidanetagizade/geo-travel-project.git
cd geo-travel-project
npm install
```

Create a `.env` file in the root directory and add your own REST Countries API key:

VITE_API_KEY=your_api_key_here

Then start the dev server:

```bash
npm run dev
```
