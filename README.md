# DECO2500 Journey Prototype — Revision 4

Public review URL: https://edenyzh.github.io/deco2500-journey-prototype/

This revision implements the three September 23 screen sketches across all journey and route variants. The existing 81 stop-detail screens are retained with their original text, layout, shapes and styles; their clocks and timetable values continue to update in context.

## Open locally

Extract the entire archive and open `index.html` in a current browser such as Edge or Chrome. Keep the five `.js`/`.css`/HTML files together. No account or installation is needed. For sharing, use the public URL above rather than a local file path.

## Behaviour

- Home and route selection share From, To and optional expected arrival time. Location menus are mutually exclusive. Identical locations are rejected.
- Expected time offers each whole minute strictly after the displayed current time, up to four hours ahead. Overnight options say “tomorrow”. Leaving it empty is allowed. Expired selections are cleared with a message.
- Sample coverage provides one, two or three routes depending on the journey. The map, count and cards use the same route list.
- Route cards sort by estimated destination arrival, which is the earliest estimate among that route's three stops. Walking distance numbers are larger and bold.
- Stop cards retain descending catch-probability order, based on crowding and walking time. Red, bold “Next bus” times describe arrival at the stop. The separate green column describes estimated arrival at the destination.
- The sample model selects service timing around an optional target arrival. Destination estimates use a service reachable on foot and stay within 30 minutes either side of the selected expected time.
- The session runs for three minutes, persists across page navigation and reloads, then pauses. “Start again” resets its clock. The four-hour selection window follows this displayed demonstration clock.

## Editable source and assumptions

`model.js` contains replaceable sample coverage, ride durations, arrival offsets and validation rules. `app.js` contains the three redesigned screens and SVG maps. `styles.css` contains their presentation. `detail-data.js` losslessly packages the original stop-detail nodes using gzip/base64; the browser decompresses it locally.

The maps are schematic drawings following the supplied sketches' visual language. Coverage, walking distances, service times, destination estimates and probabilities are demonstration data, not verified routing or a live transit feed. Existing location spelling “Towoong” is retained from the baseline.

## Validation

- Browser: all nine journey combinations and 54 detail flows reachable from their current route lists; shared selection state, map/card counts, ordering, minimum-stop ETA, midnight range, expiry, three-minute freeze, reload and restart.
- Model: 38,880 combinations across optional target minutes, journeys, routes, stops and elapsed times; all destination estimates within the requested ±30-minute range.
- Visual checks at 390 px and 320 px; no horizontal page overflow.
- All 81 detail node trees are copied without content or geometry edits from the user's existing Revision 3 baseline.

This package updates the web prototype. It does not alter the local Figma document.
