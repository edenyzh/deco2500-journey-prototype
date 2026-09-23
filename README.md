# DECO2500 Journey Prototype — Revision 8

Review URL: https://edenyzh.github.io/deco2500-journey-prototype/

Extract the complete ZIP and open `index.html` in a current Edge, Chrome or Safari browser. Keep the HTML, CSS and JavaScript files together. To share with other people, use the public URL above.

## This revision

- Every single-stop detail screen follows the supplied September 23 sketch, across all journeys and bus routes. The current clock and clickable destination ETA sit at the top right beside Back.
- The map magnifies the neighbourhood between You and the selected stop. It shows only that stop, its blue dotted walking connection and its pink bus route. Positions and the walking connection match the nearby-stops map. Each selected stop gets its own crop; no destination marker or unrelated stop markers distract from the walk.
- Below the map and three-item legend are catch probability, walking distance/time, crowding, the next three services, a red bold countdown and Compare other stops. Both Back and Compare return to the matching bus's nearby-stops screen.
- The layout responds to narrow screens and scrolls normally. Each stop retains its own original crowding values; walking distance, probability and ETA use the shared journey model rather than the example numbers shown in the sketch.
- The green ETA button opens the exact explanation: “This is the time you are expected to reach your final destination, starting from your current location, including transit time to the platform and to the destination after getting off.” Back returns to the same stop.

## Preserved behaviour

From defaults to Current location. Expected arrival time is optional and supports the next whole minute through four hours after the displayed demo clock. It filters independently of route ETA and never changes the bus timetable. Early arrivals and arrivals up to exactly five minutes late remain visible. Later routes are hidden with an optional Show later routes prompt, even when other routes match. Show/hide retains the selected expected time; changing the journey or time resets the viewing option. The list, map and count stay synchronized.

Route ETA is the earliest destination arrival available through its three stops. Routes sort by destination arrival; nearby stops sort by catch probability based on crowding and walking time. Navigation and reloads preserve the session. Time and estimates update during the three-minute session, then pause until Start again.

## Data and calculation

This is an interactive prototype using replaceable sample coverage, distances, timetable and probabilities. Maps are schematic. No live transit feed or verified journey routing is connected.

`model.js` computes the first service reachable after walking and a boarding buffer, then adds the sample bus ride and final walk. ETAs are rounded up to whole minutes. `detail-data.js` preserves the original 81 detail snapshots as the source of each stop's crowding values. New detail layouts are responsive HTML/SVG in `app.js` and `styles.css`. This package updates the web prototype, not the local Figma document.

## Validation

Revision 8 checks all 81 detail URLs, all 54 detail flows reachable through the nine journeys, matching stop data and map markers, both return buttons, the ETA explanation, minute updates and the three-minute freeze. Visual checks cover different routes/stops and 320/390 px layouts. Regression checks cover the five-minute filtering boundary, partial/all-hidden prompts, show/hide, retained expected time and unchanged estimates.
