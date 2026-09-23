# DECO2500 Journey Prototype — Revision 5

Review URL: https://edenyzh.github.io/deco2500-journey-prototype/

Extract the complete ZIP and open `index.html` in a current Edge, Chrome or Safari browser. Keep the HTML, CSS and JavaScript files together. To share with other people, use the public URL above.

## This revision

- A fresh journey defaults to Current location, which remains selectable in the From menu. An explicitly chosen origin is retained during the session.
- From and To selections are black and bold. Expected arrival time is darker, slightly heavier and right-aligned near the larger, bold time field.
- Optional expected arrival time is a filter only. It never changes a route's calculated arrival or its bus timetable. A route remains visible when its destination ETA is within 30 minutes before or after the expected time, including either boundary.
- The filtered list, map routes and available-route count always agree. With no matching routes, the user can choose another time or explicitly clear the limit to view all routes for that journey.
- Route and stop comparison headings are wider, single-line green buttons. Both open a plain explanation page describing walking to the boarding stop, waiting, bus travel and the final leg from the alighting stop to the destination.
- Single-stop detail pages also have an estimated arrival time and explanation button in their previously unused bottom area. The original content above it is retained.
- The explanation page returns to its source screen without losing the journey or expected-time selection.

## Data and calculation

This is a three-minute interactive prototype, with replaceable sample route coverage, distances, timetable and probabilities. Maps are schematic. No live transit feed or verified journey routing is connected.

`model.js` computes each stop's ETA independently of the expected-time input. It uses the first service reachable after walking and a boarding buffer, then adds the sample bus ride and final walk. ETAs are rounded up to whole minutes. A route's ETA is the earliest of its three stops. Routes sort by destination ETA; stops sort by catch probability based on crowding and walking time.

The expected-time selector supports the next whole minute through four hours after the displayed demo clock, including midnight crossings. It may be left empty. An expired selection clears with a message. The session pauses after three minutes; Start again resets it. Navigation and reloads preserve session state.

`detail-data.js` losslessly contains the original 81 detail-screen node trees. The new ETA row is added separately at runtime. This package updates the web prototype, not the local Figma document.

## Validation

- Default origin and style checks; expected-time filtering without modifying ETA values.
- Partial matches, no matches, explicit recovery, map/list/count agreement and exact +/-30-minute boundaries.
- All nine journey combinations and 54 reachable detail flows, including explanation/back navigation.
- 6,480 model scenarios spanning journeys, target times and elapsed demo time; final walking leg included.
- Three-minute freeze and reload/restart; visual checks at 390 px and 320 px with no horizontal overflow.
