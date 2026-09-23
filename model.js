/* Replaceable sample coverage, walking distances and timetable; not a transport feed. */
(function(root){
const LOCATIONS={current:'Current location',uq:'UQ Chancellors Place',towoong:'Towoong',roma:'Roma Street Stop 138 near Ann St'};
const COVERAGE={'current-uq':['411','412','444'],'current-towoong':['411','412'],'current-roma':['444'],'uq-towoong':['411','412'],'uq-roma':['412','444'],'towoong-uq':['411','412','444'],'towoong-roma':['444'],'roma-uq':['412','444'],'roma-towoong':['411','444']};
const RIDES={'411':[9,6,6],'412':[11,7,6],'444':[7,4,4]};
const FINAL_WALKS={uq:{'411':2,'412':1,'444':3},towoong:{'411':2,'412':3,'444':1},roma:{'411':3,'412':2,'444':1}};
const MINUTE=60000,DURATION=180000;
function limits(now){return {min:(Math.floor(now/MINUTE)+1)*MINUTE,max:Math.floor((now+240*MINUTE)/MINUTE)*MINUTE};}
function validExpected(value,now){const range=limits(now);return Number.isFinite(value)&&value>=range.min&&value<=range.max&&value%MINUTE===0;}
function chance(capacity,walk,remaining,rules){const uncertainty=Math.max(rules.minimumUncertaintyMinutes,walk*rules.walkingUncertaintyRatio),earliest=Math.max(0,walk-uncertainty),latest=walk+uncertainty;return Math.round(capacity*Math.max(0,Math.min(1,(remaining-rules.boardingBufferMinutes-earliest)/(latest-earliest))));}
function filterRoutes(routes,expected){return expected==null?routes:routes.filter(route=>Math.abs(route.etaMs-expected)<=30*MINUTE);}
function createModel(plan,anchor){
 const canonical=new Map(plan.entries.map(e=>[e.journey+'/'+e.route,e]));
 function stop(journey,route,number,now){
  const e=canonical.get(journey+'/'+route),s=e.stops.find(s=>s.stop===number),headway=s.arrivalOffsets[1]-s.arrivalOffsets[0],first=anchor+s.arrivalOffsets[0]*MINUTE;
  const arrivalMs=first+Math.max(0,Math.floor((now-first)/(headway*MINUTE))+1)*headway*MINUTE;
  const remaining=(arrivalMs-now)/MINUTE,reach=now+(s.walkMinutes+plan.rules.boardingBufferMinutes)*MINUTE;
  // Destination ETA uses a service the passenger can reach on foot. Next bus retains its original meaning.
  const catchable=arrivalMs+Math.max(0,Math.ceil((reach-arrivalMs)/(headway*MINUTE)))*headway*MINUTE;
  const busRideMinutes=RIDES[route][s.stop-1],finalWalkMinutes=FINAL_WALKS[journey.split('-')[1]][route];
  const etaMs=Math.ceil((catchable+(busRideMinutes+finalWalkMinutes)*MINUTE)/MINUTE)*MINUTE;
  return {...s,arrivalMs,remainingMinutes:remaining,remainingLabel:Math.max(1,Math.ceil(remaining))+' min',percent:chance(s.capacityPercent,s.walkMinutes,remaining,plan.rules),etaMs,busRideMinutes,finalWalkMinutes,boardingMs:catchable,arrivalTimestamps:[0,1,2].map(i=>arrivalMs+i*headway*MINUTE),walkingArrivalMs:now+s.walkMinutes*MINUTE};
 }
 function stops(journey,route,now){return [1,2,3].map(n=>stop(journey,route,n,now)).sort((a,b)=>b.percent-a.percent||a.walkMinutes-b.walkMinutes||a.stop-b.stop);}
 function routes(journey,now){return (COVERAGE[journey]||[]).map(route=>{const values=stops(journey,route,now);return {route,metres:Math.min(...values.map(s=>s.metres)),etaMs:Math.min(...values.map(s=>s.etaMs)),stops:values};}).sort((a,b)=>a.etaMs-b.etaMs||a.route.localeCompare(b.route));}
 return {stop,stops,routes};
}
const api={LOCATIONS,COVERAGE,RIDES,FINAL_WALKS,MINUTE,DURATION,limits,validExpected,filterRoutes,createModel};if(typeof module!=='undefined')module.exports=api;else root.JourneyModel=api;
})(typeof window!=='undefined'?window:globalThis);
