# TravelPlanner

An interactive travel planning sketch built with HTML, CSS, and JavaScript.

## Run locally

Download or clone this repository and open `index.html` in a modern desktop browser. Keep the `assets` folder beside the HTML, CSS, and JavaScript files so photos load correctly. No installation or build step is required.

## Features

- Explore New York, Washington, D.C., and Los Angeles through city boards and attraction photos.
- Choose a destination and travel dates to generate daily boards and a destination-specific wishlist.
- View the wishlist and daily itinerary side by side on desktop.
- Drag attractions into days, move them between days, and edit or remove activities.
- See scheduled wishlist cards turn gray and activity intensity update: 0–1 low, 2–4 moderate, and 5+ high.
- Add breakfast, lunch, and dinner with a restaurant name, address, and time.
- Add accommodation and optional activity times, durations, and transport details.
- Save edits automatically in browser localStorage and open a complete itinerary using Save trip.

## Files

- `index.html`: interface and forms
- `styles.css`: styling and responsive layout
- `script.js`: application state, event listeners, conditions, drag-and-drop, and persistence
- `assets/photos/`: local destination and attraction images

## Interaction and learning

The design treats attractions as sticky notes that move from a wishlist into a daily planner. Card position provides visible feedback; gray cards show which attractions are already scheduled. Input combinations such as destination plus date range determine the planner structure, while activity counts and timing determine intensity and conflict feedback.

Developed iteratively with AI assistance for an interactive systems course. A personal learning reflection and screenshots should accompany the coursework submission.

## Current limitations

Data is stored only in the current browser and is not synced between devices. Activity intensity is based on attraction count, not physical effort. Free-time calculations cover 00:00–24:00 and do not subtract sleep or meal duration. No live booking, opening-hours, or transport lookup is included. Empty days display `free day` in the itinerary.

## Photo credits

Photos come from tourism and attraction websites. Source links are shown alongside photos and retained in the `photos` map in `script.js`. Original photos remain subject to their respective owners’ rights; this repository does not grant a license to those images.
