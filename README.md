# DECO2500 Journey Prototype — Revision 7

Review URL: https://edenyzh.github.io/deco2500-journey-prototype/

Extract the complete ZIP and open `index.html` in a current Edge, Chrome or Safari browser. Keep the HTML, CSS and JavaScript files together. To share with other people, use the public URL above.

## This revision

- A fresh journey defaults to Current location, which remains selectable in the From menu. An explicitly chosen origin is retained during the session.
- From and To selections are black and bold. Expected arrival time is darker, slightly heavier and right-aligned near the larger, bold time field.
- Optional expected arrival time is a filter only. It never changes a route's calculated arrival or its bus timetable. All routes arriving early remain visible. Only routes arriving more than 5 minutes after the expected time are hidden; exactly 5 minutes late remains visible.
- Whenever routes are hidden, the user can explicitly choose “Show later routes”, including when some routes still match. The original expected time stays selected. Revealed late routes show their lateness in minutes and can be hidden again. The map and route count follow the visible list.
- When all routes are hidden, an empty-state prompt offers “Show later routes” or “Choose another time”. Changing the expected time or journey resets the option to hide late routes. The user's viewing choice otherwise survives back navigation and reloads.
- Route and stop comparison headings are wider, single-line green buttons. They open a plain explanation page with the user's exact copy: “This is the time you are expected to reach your final destination, starting from your current location, including transit time to the platform and to the destination after getting off.”
- Single-stop detail pages also have an estimated arrival time and explanation button in their previously unused bottom area. The original content above it is retained.
- The explanation page returns to its source screen without losing the journey or expected-time selection.

## Data and calculation

This is a three-minute interactive prototype, with replaceable sample route coverage, distances, timetable and probabilities. Maps are schematic. No live transit feed or verified journey routing is connected.

`model.js` computes each stop's ETA independently of the expected-time input. It uses the first service reachable after walking and a boarding buffer, then adds the sample bus ride and final walk. ETAs are rounded up to whole minutes. A route's ETA is the earliest of its three stops. Routes sort by destination ETA; stops sort by catch probability based on crowding and walking time.

The expected-time selector supports the next whole minute through four hours after the displayed demo clock, including midnight crossings. It may be left empty. An expired selection clears with a message. The session pauses after three minutes; Start again resets it. Navigation and reloads preserve session state.

`detail-data.js` losslessly contains the original 81 detail-screen node trees. The new ETA row is added separately at runtime. This package updates the web prototype, not the local Figma document.

## Validation

- Default origin and style checks; expected-time filtering without modifying ETA values.
- Revision 7 verifies unrestricted early arrivals, the inclusive 5-minutes-late boundary, prompts for partial/all hidden results, explicit show/hide, preserved expected time, stable ETAs, selection reset and map/list/count agreement.
- All nine journey combinations and 54 reachable detail flows, including explanation/back navigation.
- Earlier model checks cover journeys, target times and elapsed demo time; final walking leg included. Revision 7 changes filtering and viewing options, with unchanged ETA calculations and explanation copy.
- Three-minute freeze and reload/restart; visual checks at 390 px and 320 px with no horizontal overflow.
