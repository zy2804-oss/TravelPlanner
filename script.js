// State: one object stores the trip, wishlist and activities grouped by date.
const KEY = 'roam-travel-planner-v1';
const $ = id => document.getElementById(id);
const cities = [
  {id:'nyc',name:'New York',en:'NEW YORK',image:'photo-1485871981521-5b1fd3805eee',tag:'Art, neighborhoods, and a city that never slows down',description:'From museums and parks to neighborhood cafes and theaters, leave a little room to wander.',spots:[['Central Park','Walk, picnic, and enjoy green spaces and lakes in the heart of Manhattan.'],['The Metropolitan Museum of Art','Explore art spanning cultures and centuries.'],['Brooklyn Bridge','Walk across this landmark bridge for views of the Manhattan skyline.']]},
  {id:'dc',name:'Washington, D.C.',en:'WASHINGTON, D.C.',image:'photo-1501466044931-62695aada8e9',tag:'Monuments, history, and museum discoveries',description:'Explore monuments along the National Mall, step into museums, and discover the city beyond its landmarks.',spots:[['National Mall','An open public landscape connecting monuments, memorials, and museums.'],['Lincoln Memorial','Explore the memorial and take a walk beside the Reflecting Pool.'],['National Gallery of Art','Discover paintings, sculptures, and art collections at your own pace.'],['Washington Monument','An iconic obelisk on the National Mall, ideal for a walk linking nearby memorials.'],['Tidal Basin','Walk beside the water and waterfront memorials, with cherry blossoms in spring.'],['Jefferson Memorial','Explore the domed memorial and its colonnade beside the Tidal Basin.'],['Martin Luther King, Jr. Memorial','Discover the sculpture and inscriptions honoring the civil rights leader.'],['World War II Memorial','Visit this memorial on the National Mall and combine it with a walk to the Lincoln Memorial.'],['Georgetown Waterfront Park','Take a relaxing walk beside the Potomac River.'],['Georgetown','Explore historic streets, independent shops, and cafes.'],['National Portrait Gallery','Discover stories through portraiture, then explore the American Art Museum in the same building.'],['Smithsonian American Art Museum','Explore American art alongside a visit to the National Portrait Gallery.'],['National Archives Museum','Explore historic documents and American history. Check official visitor information before your trip.'],['The Wharf','Enjoy a waterfront walk, dining, and a change of pace.'],['Dupont Circle','Enjoy a relaxed neighborhood walk among bookstores and cafes.']]},
  {id:'la',name:'Los Angeles',en:'LOS ANGELES',image:'photo-1534190760961-74e8c1c5c3da',tag:'Coastal days, movie culture, and California sunshine',description:'Slow down by the ocean or explore movie culture. Leave time for travel between neighborhoods.',spots:[['Griffith Observatory','Enjoy hillside city views and explore astronomy.'],['Santa Monica Beach','Stroll along the beach and pier and enjoy time by the ocean.'],['Getty Center','Discover art, architecture, and gardens.']]}
];
// Photos from the linked tourism and attraction websites. Keys match city or city:spot-index.
const photos = {
  "nyc": {
    "url": "assets/photos/nyc.jpg",
    "source": "https://www.nyctourism.com/",
    "remote": "https://images.ctfassets.net/1aemqu6a6t65/2XGfbhfPvxjBHCvqUoN2CP/fdfff71fc31ac12ba25fe405e0f8ec34/NYC-Social-Share-Image-iStock-985069044.jpg"
  },
  "dc": {
    "url": "assets/photos/dc.jpg",
    "source": "https://washington.org/visit-dc/bucket-list",
    "remote": "https://washington.org/sites/default/files/2025-04/TidalBasin_7409505_20230321_1%20%281%29.jpg"
  },
  "la": {
    "url": "assets/photos/la-0.jpg",
    "source": "https://griffithobservatory.lacity.gov/visit/",
    "remote": "https://www.discoverlosangeles.com/sites/default/files/images/2021-10/losangeles-observatory-social.jpg"
  },
  "nyc:0": {
    "url": "assets/photos/nyc-0.jpg",
    "source": "https://www.centralparknyc.org/",
    "remote": "https://d2wsrtli9cxkek.cloudfront.net/media/images/homepage/cover-photo-smaller.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.517&fp-y=0.047&h=1485&q=80&w=2475&s=4fbc414be91a422032b4193cb018a90b"
  },
  "nyc:1": {
    "url": "assets/photos/nyc-1.jpg",
    "source": "https://www.nyctourism.com/attractions-tours/the-met-fifth-avenue/",
    "remote": "https://images.ctfassets.net/1aemqu6a6t65/6Iimaaq1OHmtN36Jsv1jNA/1cc0a8247f1a979186314867f541432b/Met-Facade-Manhattan-NYC-Photo-Photo-Brett-Beyer-Courtesy-The-Metropolitan-Museum-of-Art.jpg"
  },
  "nyc:2": {
    "url": "assets/photos/nyc-2.jpg",
    "source": "https://www.nyctourism.com/attractions-tours/brooklyn-bridge/",
    "remote": "https://images.ctfassets.net/1aemqu6a6t65/7agXa8CmAoqIixMXCSiBFP/d7056bb920347a3078ccbd1bcba345a6/brooklyn-bridge-photo-julienne-schaer-nyc-and-company-003-2"
  },
  "dc:0": {
    "url": "assets/photos/dc-0.jpg",
    "source": "https://washington.org/dc-neighborhoods/national-mall",
    "remote": "https://washington.org/sites/default/files/2020-12/Biking-near-Lincoln-Memorial.jpg"
  },
  "dc:1": {
    "url": "assets/photos/dc-1.jpg",
    "source": "https://washington.org/dc-guide-to/lincoln-memorial",
    "remote": "https://washington.org/sites/default/files/pixels.sh_visitors-to-the-lincoln-memorial-at-night_mydccool-via-crowdriff.jpg"
  },
  "dc:2": {
    "url": "assets/photos/dc-2.jpg",
    "source": "https://washington.org/find-dc-listings/national-gallery-art",
    "remote": "https://washington.org/sites/default/files/dc_import/100_A14713_fb9b29b9-5056-a348-3affb33a18286810.jpg"
  },
  "dc:3": {
    "url": "assets/photos/dc-3.jpg",
    "source": "https://washington.org/dc-guide-to/washington-monument",
    "remote": "https://washington.org/sites/default/files/washington-monument-dc.jpg"
  },
  "dc:4": {
    "url": "assets/photos/dc-4.jpg",
    "source": "https://www.nps.gov/places/000/tidal-basin.htm",
    "remote": "https://www.nps.gov/common/uploads/cropped_image/primary/CE4772A1-9D9D-8431-0B96D0BF6EBC5648.jpg?width=1600&quality=90&mode=crop"
  },
  "dc:5": {
    "url": "assets/photos/dc-5.jpg",
    "source": "https://washington.org/dc-guide-to/jefferson-memorial",
    "remote": "https://washington.org/sites/default/files/2023-04/Jefferson-Memorial-DC_Hero.jpg"
  },
  "dc:6": {
    "url": "assets/photos/dc-6.jpg",
    "source": "https://washington.org/dc-guide-to/martin-luther-king-jr-memorial",
    "remote": "https://washington.org/sites/default/files/2021-01/mlk_memorial.gif"
  },
  "dc:7": {
    "url": "assets/photos/dc-7.jpg",
    "source": "https://washington.org/dc-guide-to/national-world-war-ii-memorial",
    "remote": "https://washington.org/sites/default/files/marcus_ww_summer-sunset-at-the-world-war-ii-wwii-memorial_yesmydccool.jpg"
  },
  "dc:8": {
    "url": "assets/photos/dc-8.jpg",
    "source": "https://washington.org/visit-dc/washington-dc-waterfront-activities",
    "remote": "https://washington.org/sites/default/files/2025-09/Georgetown_006_309619_20220615.jpg"
  },
  "dc:9": {
    "url": "assets/photos/dc-9.jpg",
    "source": "https://washington.org/dc-neighborhoods/georgetown",
    "remote": "https://washington.org/sites/default/files/2020-12/GeorgetownWaterfront_Aerial_WashingtonDC.jpg"
  },
  "dc:10": {
    "url": "assets/photos/dc-10.jpg",
    "source": "https://washington.org/find-dc-listings/national-portrait-gallery",
    "remote": "https://washington.org/sites/default/files/dc_import/L10018760_f91bc2d4-5056-a348-3ae674ec5eb56061.jpg"
  },
  "dc:11": {
    "url": "assets/photos/dc-11.jpg",
    "source": "https://washington.org/find-dc-listings/smithsonian-american-art-museum",
    "remote": "https://washington.org/sites/default/files/dc_import/117_luce_purple_fb97f318-5056-a348-3a4c46c3f6167463.jpg"
  },
  "dc:12": {
    "url": "assets/photos/dc-12.jpg",
    "source": "https://washington.org/find-dc-listings/national-archives-museum",
    "remote": "https://washington.org/sites/default/files/dc_import/604_national_archives1_fb76a373-5056-a348-3add1a5840679822.jpg"
  },
  "dc:13": {
    "url": "assets/photos/dc-13.jpg",
    "source": "https://washington.org/dc-neighborhoods/southwest-wharf",
    "remote": "https://washington.org/sites/default/files/2024-04/Jessie%27s%20Cooked%20Seafood.jpeg"
  },
  "dc:14": {
    "url": "assets/photos/dc-14.jpg",
    "source": "https://www.nps.gov/nama/planyourvisit/dupont.htm",
    "remote": "https://www.nps.gov/nama/planyourvisit/images/Dupont-Nate-preview.JPG?autorotate=false&maxwidth=1300"
  },
  "la:0": {
    "url": "assets/photos/la-0.jpg",
    "source": "https://griffithobservatory.lacity.gov/visit/",
    "remote": "https://griffithobservatory.lacity.gov/wp-content/uploads/2021/01/Observatory_full_building4.jpg"
  },
  "la:1": {
    "url": "assets/photos/la-1.jpg",
    "source": "https://www.tripadvisor.com/Attraction_Review-g33052-d117412-Reviews-Santa_Monica_State_Beach-Santa_Monica_California.html",
    "remote": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/41/76/79/caption.jpg?h=800&s=1&w=1200"
  },
  "la:2": {
    "url": "assets/photos/la-2.jpg",
    "source": "https://www.getty.edu/visit/center/",
    "remote": "https://media.getty.edu/iiif/image/0ce1f9a0-bb74-498d-962c-2728b9999529/full/1500,/0/default.jpg"
  }
};
const emptyState = () => ({city:'',generatedCity:'',start:'',end:'',hotel:{},library:[],days:{},meals:{},showTimes:false});
let state = emptyState();
try { const saved = JSON.parse(localStorage.getItem(KEY)); if(saved && typeof saved === 'object') state = {...state,...saved}; } catch { /* A fresh trip remains available if storage cannot be read. */ }
// Upgrade built-in labels in saved trips without changing custom notes or restaurant names.
const legacyLabels = {"\u7ebd\u7ea6": "New York", "\u534e\u76db\u987f": "Washington, D.C.", "\u6d1b\u6749\u77f6": "Los Angeles", "\u4e2d\u592e\u516c\u56ed": "Central Park", "\u5927\u90fd\u4f1a\u827a\u672f\u535a\u7269\u9986": "The Metropolitan Museum of Art", "\u5e03\u9c81\u514b\u6797\u5927\u6865": "Brooklyn Bridge", "\u56fd\u5bb6\u5e7f\u573a": "National Mall", "\u6797\u80af\u7eaa\u5ff5\u5802": "Lincoln Memorial", "\u56fd\u5bb6\u7f8e\u672f\u9986": "National Gallery of Art", "\u534e\u76db\u987f\u7eaa\u5ff5\u7891": "Washington Monument", "\u6f6e\u6c50\u6e56": "Tidal Basin", "\u6770\u6590\u900a\u7eaa\u5ff5\u5802": "Jefferson Memorial", "\u9a6c\u4e01\u00b7\u8def\u5fb7\u00b7\u91d1\u7eaa\u5ff5\u56ed": "Martin Luther King, Jr. Memorial", "\u7b2c\u4e8c\u6b21\u4e16\u754c\u5927\u6218\u7eaa\u5ff5\u56ed": "World War II Memorial", "\u4e54\u6cbb\u6566\u6ee8\u6c34\u516c\u56ed": "Georgetown Waterfront Park", "\u4e54\u6cbb\u6566\u8857\u533a": "Georgetown", "\u56fd\u5bb6\u8096\u50cf\u9986": "National Portrait Gallery", "\u53f2\u5bc6\u68ee\u5c3c\u7f8e\u56fd\u827a\u672f\u535a\u7269\u9986": "Smithsonian American Art Museum", "\u56fd\u5bb6\u6863\u6848\u9986": "National Archives Museum", "The Wharf \u6ee8\u6c34\u533a": "The Wharf", "\u675c\u90a6\u5706\u73af\u8857\u533a": "Dupont Circle", "\u683c\u91cc\u83f2\u65af\u5929\u6587\u53f0": "Griffith Observatory", "\u5723\u83ab\u5c3c\u5361\u6d77\u6ee9": "Santa Monica Beach", "\u76d6\u8482\u4e2d\u5fc3": "Getty Center", "\u666f\u70b9": "Attraction", "\u9910\u996e": "Dining", "\u6d3b\u52a8": "Activity", "\u8d2d\u7269": "Shopping", "\u5176\u4ed6": "Other", "\u5f85\u5b9a": "Not set", "\u6b65\u884c": "Walking", "\u516c\u5171\u4ea4\u901a": "Public transit", "\u6253\u8f66": "Taxi / rideshare", "\u81ea\u9a7e": "Driving"};
for (const item of [...state.library, ...Object.values(state.days).flat()]) {
  if (legacyLabels[item.category]) item.category = legacyLabels[item.category];
  if (legacyLabels[item.transport]) item.transport = legacyLabels[item.transport];
  if (item.source) {
    if (legacyLabels[item.title]) item.title = legacyLabels[item.title];
    if (legacyLabels[item.place]) item.place = legacyLabels[item.place];
  }
}
// Migrate earlier saves: recommended places have a source prefix; custom items
// belong to the destination selected when the old save was created.
for (const activity of state.library) {
  activity.city ||= activity.source?.split(':')[0] || state.city || 'dc';
}
const visibleLibrary = () => state.city ? state.library.filter(a => a.city === state.city) : [];
// Older trips already have a generated date range.
if (!state.generatedCity && state.start && state.end) state.generatedCity = state.city;
function populateWishlist() {
  const city = cities.find(c => c.id === state.city);
  if (!city) return;
  city.spots.forEach((spot, index) => {
    const source = `${city.id}:${index}`;
    if (!state.library.some(a => a.source === source)) {
      state.library.push({id:uid(), city:city.id, source, title:spot[0], category:'Attraction', place:spot[0], notes:''});
    }
  });
}
const icons = {
  edit:'<path d="m16 3 5 5-12 12H4v-5L16 3Z"/><path d="m13 6 5 5"/>',
  assign:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-9 3v4m-2-2h4"/>',
  delete:'<path d="M3 6h18M9 6V3h6v3m-10 0 1 15h12l1-15M10 10v7m4-7v7"/>'
};
function iconButton(action,label) {
  return `<button class="icon-button ${action==='delete'?'remove':''}" data-action="${action}" title="${label}" aria-label="${label}"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[action]}</svg></button>`;
}
let editing = null, assignment = null, dragging = null;
const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const imageURL = city => photos[city.id].url;
function photoMarkup(key, title) {
  const photo = photos[key];
  if (!photo) return '';
  const host = new URL(photo.source).hostname.replace(/^www\./, '');
  return `<figure class="photo"><img src="${escapeHTML(photo.url)}" alt="${escapeHTML(title)}" loading="lazy" referrerpolicy="no-referrer"><figcaption><a href="${escapeHTML(photo.source)}" target="_blank" rel="noopener noreferrer">Photo: ${escapeHTML(host)}</a></figcaption></figure>`;
}
function save() { try {localStorage.setItem(KEY,JSON.stringify(state)); $('storageError').hidden=true; return true;} catch {$('storageError').hidden=false; return false;} }
function dateList(start,end) {
  if(!start || !end || end < start) return [];
  const dates=[], cursor=new Date(`${start}T12:00:00Z`), last=new Date(`${end}T12:00:00Z`);
  while(cursor<=last && dates.length<366){dates.push(cursor.toISOString().slice(0,10));cursor.setUTCDate(cursor.getUTCDate()+1);}
  return dates;
}
const dates = () => dateList(state.start,state.end);
const cityName = () => cities.find(c=>c.id===state.city)?.name || 'My trip';
const dateLabel = date => new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US',{month:'long',day:'numeric',weekday:'short',timeZone:'UTC'});
function intensity(count) {if(count<=1)return ['Low intensity',''];else if(count<=4)return ['Moderate intensity','medium'];else return ['High intensity','high'];}
function renderCities(){ $('cities').innerHTML=[...cities].sort((a,b)=>Number(b.id==='dc')-Number(a.id==='dc')).map(c=>`<button class="city-card ${state.city===c.id?'selected':''}" data-city="${c.id}"><img src="${imageURL(c)}" alt="${c.name} city view"><div class="city-copy"><p class="eyebrow">${c.en}</p><h3>${c.name}${c.id==='dc'?' · Featured destination':''}${state.city===c.id?' · Selected':''}</h3><p>${c.tag}</p></div></button>`).join(''); }
function openCity(id){const c=cities.find(c=>c.id===id);$('cityDetail').innerHTML=`<div class="actions city-actions"><button class="quiet" data-close="cityDialog">Back to destinations</button><button data-select-city="${id}">Choose this city</button></div><img src="${imageURL(c)}" alt="${c.name} city view"><p class="eyebrow" style="margin-top:20px">${c.en}</p><h2>${c.name}</h2><a class="city-credit" href="${escapeHTML(photos[c.id].source)}" target="_blank" rel="noopener noreferrer">City photo source</a><p>${c.description}</p>${c.spots.map((s,i)=>`<div class="spot">${photoMarkup(`${c.id}:${i}`,s[0])}<h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}`;$('cityDialog').showModal();}
function buildFields(){
  const hotel=[['name','Property name','text'],['address','Address','text'],['checkin','Check-in date','date'],['checkout','Check-out date','date']];

  for(const [group,target,fields] of [['hotel','hotelFields',hotel]]) $(target).innerHTML=fields.map(([key,label,type])=>`<label>${label}<input type="${type}" data-info="${group}:${key}" value="${escapeHTML(state[group][key]||'')}"></label>`).join('');
}
function card(a,date=''){
  const arranged=Object.entries(state.days).filter(([,items])=>items.some(item=>item.libraryId===a.id)).map(([d])=>d);
  return `<article class="activity ${!date&&arranged.length?'is-arranged':''}" draggable="true" data-id="${a.id}" data-date="${date}">${photoMarkup(a.source,a.title)}<span class="category">${escapeHTML(a.category)}</span><h3>${escapeHTML(a.title)}</h3>${a.place?`<p>${escapeHTML(a.place)}</p>`:''}${a.notes?`<p>${escapeHTML(a.notes)}</p>`:''}${!date&&arranged.length?`<p>Scheduled: ${arranged.map(escapeHTML).join(', ')}</p>`:''}<div class="card-actions">${iconButton('edit','Edit activity')}${!date?iconButton('assign','Schedule activity'):''}${iconButton('delete',date?'Remove from day':'Delete from wishlist')}</div>${date&&state.showTimes?`<div class="time-fields"><label>Start time<input type="time" data-time="time" value="${escapeHTML(a.time||'')}"></label><label>Duration (minutes)<input type="number" min="1" max="1440" data-time="duration" value="${escapeHTML(a.duration||'')}"></label><label>Getting there<select data-time="transport">${['Not set','Walking','Public transit','Taxi / rideshare','Driving','Other'].map(v=>`<option ${a.transport===v?'selected':''}>${v}</option>`).join('')}</select></label><label>Travel time (minutes)<input type="number" min="0" max="1440" data-time="travel" value="${escapeHTML(a.travel??'')}"></label></div>`:''}</article>`;
}
function minutes(time){const [h,m]=time.split(':').map(Number);return h*60+m;}
function clock(n){return n>=1440?`Next day ${clock(n-1440)}`:`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
function schedule(items){
  const blocks=items.filter(a=>a.time&&Number(a.duration)>0).map(a=>({a,start:minutes(a.time)-Number(a.travel||0),end:minutes(a.time)+Number(a.duration)})).sort((a,b)=>a.start-b.start);
  const missing=items.length-blocks.length;
  if(!blocks.length)return items.length?'Add start times and durations to see free time.':'No activities planned for this day.';
  const lines=[];let end=0;
  for(const b of blocks){if(b.start<0)lines.push(`⚠ ${b.a.title} has travel starting on the previous day`);if(b.start<end)lines.push(`⚠ ${b.a.title} overlaps an earlier activity`);else if(b.start>end)lines.push(`Free time ${clock(end)}–${clock(b.start)}`);end=Math.max(end,b.end);}
  if(end<1440)lines.push(`Free time ${clock(end)}–24:00`);
  if(end>1440)lines.push('⚠ An activity continues into the next day');
  if(missing)lines.push(`${missing} activities have no complete timing yet; free time does not account for them.`);
  return `Based on the full day, 00:00–24:00, including travel:<br>${lines.map(escapeHTML).join('<br>')}`;
}
// Meal slots are independent of sightseeing cards and do not increase activity intensity.
const mealNames = {breakfast:'Breakfast',lunch:'Lunch',dinner:'Dinner'};
let editingMeal = null;
function mealSlots(date) {
  return `<div class="meal-slots">${Object.entries(mealNames).map(([key,label])=>{
    const meal=state.meals[date]?.[key]||{};
    return `<button class="meal-slot ${meal.restaurant||meal.address||meal.time?'filled':''}" data-meal="${key}" data-meal-date="${date}"><span class="meal-label">${label}<span aria-hidden="true">＋</span></span><strong>${escapeHTML(meal.restaurant||'Add restaurant')}</strong><span>${escapeHTML(meal.address||'Address not set')}</span><span class="meal-time">${escapeHTML(meal.time||'Time not set')}</span></button>`;
  }).join('')}</div>`;
}
function openMeal(date,key) {
  editingMeal={date,key};
  const meal=state.meals[date]?.[key]||{};
  $('mealHeading').textContent=`${dateLabel(date)} · ${mealNames[key]}`;
  for(const name of ['restaurant','address','time']) $('mealForm').elements[name].value=meal[name]||'';
  $('mealDialog').showModal();
}
function saveMeal() {
  if(!editingMeal)return;
  const {date,key}=editingMeal;
  const meal=Object.fromEntries(['restaurant','address','time'].map(name=>[name,$('mealForm').elements[name].value.trim()]));
  state.meals[date] ||= {};
  if(Object.values(meal).some(Boolean))state.meals[date][key]=meal;
  else delete state.meals[date][key];
  save();renderPlans();
}
function summaryActivities(date) {
  const meals=Object.entries(state.meals[date]||{}).filter(([,meal])=>Object.values(meal).some(Boolean)).map(([key,meal])=>({title:`${mealNames[key]} · ${meal.restaurant||'Restaurant not set'}`,category:'Dining',place:meal.address,time:meal.time}));
  return [...(state.days[date]||[]),...meals];
}
function renderPlans(){
  $('destination').value=state.city?cityName():'';$('startDate').value=state.start;$('endDate').value=state.end;$('showTimes').checked=state.showTimes;
  const list=dates();$('tripLength').textContent=list.length?`${cityName()} · ${list.length} days / ${list.length-1} nights`:'Choose your destination and dates';
  $('wishlistPanel').hidden = !state.city || state.generatedCity !== state.city || !list.length;
  const wishlist = visibleLibrary();
  $('wishlistTitle').textContent=state.city?`${cityName()} · Places to go, things to do`:'Places to go, things to do';
  $('addLibrary').disabled=!state.city;
  $('library').innerHTML=wishlist.length?wishlist.map(a=>card(a)).join(''):`<p class="empty">${state.city?`${cityName()} wishlist is empty. Create a new activity or generate your daily plan to add city highlights.`:'Choose a destination and create your daily plan first.'}</p>`;
  $('days').innerHTML=list.length?list.map((d,i)=>{const items=state.days[d]||[];const [label,cls]=intensity(items.length);return `<section class="day" data-day="${d}"><div class="day-header"><div class="day-title"><h3>Day ${i+1} · ${dateLabel(d)}</h3><span class="badge ${cls}">${label} · ${items.length} activities</span></div><button class="quiet" data-new-day="${d}" aria-label="Add an activity for ${d}">＋</button></div>${mealSlots(d)}<div class="day-activities">${items.length?items.map(a=>card(a,d)).join(''):'<p class="empty">Drag activities here or click + to add one</p>'}</div>${state.showTimes?`<div class="schedule-note">${schedule(items)}</div>`:''}</section>`;}).join(''):'<div class="panel empty">Choose a destination and travel dates to create your daily plan.</div>';
}
function newActivity(date='',id=''){
  editing={date,id};const item=id?(date?state.days[date]:state.library).find(a=>a.id===id):null;
  $('activityForm').reset();$('activityHeading').textContent=item?'Edit activity':'New activity';
  for(const name of ['title','category','place','notes']) if(item) $('activityForm').elements[name].value=item[name]||'';
  $('activityDialog').showModal();
}
function assign(id){if(!dates().length){$('dateError').textContent='Choose a destination and dates, then create your daily plan first.';$('dateError').scrollIntoView({block:'center'});return;}assignment=id;$('assignDate').innerHTML=dates().map((d,i)=>`<option value="${d}">Day ${i+1} · ${d}</option>`).join('');$('assignDialog').showModal();}
function placeActivity(id,from,to,beforeId=''){
  if(from===to&&id===beforeId)return;
  const source=from?state.days[from]:state.library;const item=source?.find(a=>a.id===id);if(!item || (!from && item.city!==state.city))return;
  state.days[to] ||= [];
  const copy=from?item:{...item,id:uid(),libraryId:item.id};
  if(from)state.days[from]=state.days[from].filter(a=>a.id!==id);
  const index=state.days[to].findIndex(a=>a.id===beforeId);state.days[to].splice(index<0?state.days[to].length:index,0,copy);save();renderPlans();
}
function renderSummary(){
  $('summaryTitle').textContent=`${cityName()} · Itinerary`;$('summaryDates').textContent=dates().length?`${state.start} to ${state.end} · ${dates().length} days`:'Dates not set';
  function info(group,labels){return labels.map(([key,label])=>state[group][key]?`<p><strong>${label}: </strong>${escapeHTML(state[group][key]).replace('T',' ')}</p>`:'').join('')||'<p>Not added yet</p>';}
  $('summaryContent').innerHTML=`<section class="panel"><h2>Accommodation</h2>${info('hotel',[['name','Name'],['address','Address'],['checkin','Check-in'],['checkout','Check-out']])}</section>${dates().map((d,i)=>{const items=summaryActivities(d),[label,cls]=intensity((state.days[d]||[]).length);return `<section class="panel"><div class="section-head"><h2>Day ${i+1} · ${dateLabel(d)}</h2><span class="badge ${cls}">${label}</span></div>${items.length?[...items].sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99')).map(a=>`<article class="summary-entry">${photoMarkup(a.source,a.title)}<span class="category">${a.time?escapeHTML(a.time)+(a.duration?`–${clock(minutes(a.time)+Number(a.duration))}`:' · Duration not set'):'Time not set'} · ${escapeHTML(a.category)}</span><h3>${escapeHTML(a.title)}</h3>${a.place?`<p>${escapeHTML(a.place)}</p>`:''}${a.notes?`<p>${escapeHTML(a.notes)}</p>`:''}${a.transport&&a.transport!=='Not set'?`<p>Getting there: ${escapeHTML(a.transport)}${a.travel?` · ${escapeHTML(a.travel)} min`:''}</p>`:''}</article>`).join(''):'<div class="free-day">free day</div>'}</section>`;}).join('')}`;
}
function showSummary(){renderSummary();$('planner').hidden=true;$('itinerary').hidden=false;window.scrollTo(0,0);}
function showPlanner(){$('planner').hidden=false;$('itinerary').hidden=true;window.scrollTo(0,0);}

// Keep a visible fallback if a local image file is missing.
document.addEventListener('error', event => {
  if (event.target.tagName === 'IMG') {
    event.target.classList.add('photo-error');
    event.target.alt += ' (image unavailable)';
  }
}, true);
// Event listeners connect user actions to state updates and visible feedback.
document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.close){$(button.dataset.close).close();return;}
  if(button.dataset.city){openCity(button.dataset.city);return;}
  if(button.dataset.selectCity){state.city=button.dataset.selectCity;save();renderCities();renderPlans();$('cityDialog').close();return;}

  if(button.dataset.meal){openMeal(button.dataset.mealDate,button.dataset.meal);return;}
  if(button.dataset.newDay){newActivity(button.dataset.newDay);return;}
  if(button.dataset.action){const el=button.closest('.activity'),{id,date}=el.dataset;const items=date?state.days[date]:state.library;
    if(button.dataset.action==='edit')newActivity(date,id);
    if(button.dataset.action==='assign')assign(id);
    if(button.dataset.action==='delete'){if(date)state.days[date]=items.filter(a=>a.id!==id);else state.library=items.filter(a=>a.id!==id);save();renderPlans();}
  }
});
$('createDays').addEventListener('click',()=>{
  const start=$('startDate').value,end=$('endDate').value,list=dateList(start,end);
  if(!state.city||!start||!end){$('dateError').textContent='Choose a destination and enter both start and end dates.';return;}
  if(end<start){$('dateError').textContent='The end date cannot be before the start date.';return;}
  if((new Date(`${end}T12:00:00Z`)-new Date(`${start}T12:00:00Z`))/86400000>=366){$('dateError').textContent='A trip can include up to 366 days.';return;}
  const removed=[...new Set([...Object.keys(state.days),...Object.keys(state.meals)])].filter(d=>!list.includes(d)&&((state.days[d]||[]).length||Object.keys(state.meals[d]||{}).length));
  if(removed.length&&!confirm('Plans outside the new date range will be removed. Continue?'))return;
  state.meals=Object.fromEntries(list.map(d=>[d,state.meals[d]||{}]));state.generatedCity=state.city;populateWishlist();state.start=start;state.end=end;state.days=Object.fromEntries(list.map(d=>[d,state.days[d]||[]]));$('dateError').textContent='';save();renderPlans();$('planningWorkspace').scrollIntoView({behavior:'smooth',block:'start'});
});
for(const id of ['startDate','endDate'])$(id).addEventListener('change',()=>{$('dateError').textContent=$('startDate').value&&$('endDate').value&&$('endDate').value<$('startDate').value?'The end date cannot be before the start date.':'Dates changed. Click Create daily plan to apply them.';});
document.addEventListener('input',event=>{const info=event.target.dataset.info;if(info){const [group,key]=info.split(':');state[group][key]=event.target.value;save();}});
$('mealForm').addEventListener('input',saveMeal);
$('mealForm').addEventListener('submit',event=>{event.preventDefault();saveMeal();$('mealDialog').close();});
$('clearMeal').addEventListener('click',()=>{for(const name of ['restaurant','address','time'])$('mealForm').elements[name].value='';saveMeal();$('mealDialog').close();});
$('addLibrary').addEventListener('click',()=>newActivity());
$('activityForm').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.target);const title=form.get('title').trim();if(!title){event.target.elements.title.setCustomValidity('Enter an activity name.');event.target.elements.title.reportValidity();return;}const items=editing.date?state.days[editing.date]:state.library;const data={city:state.city,title,category:form.get('category'),place:form.get('place').trim(),notes:form.get('notes').trim()};if(editing.id)Object.assign(items.find(a=>a.id===editing.id),data);else items.push({id:uid(),...data});save();renderPlans();$('activityDialog').close();});
$('activityForm').elements.title.addEventListener('input',event=>event.target.setCustomValidity(''));
$('assignForm').addEventListener('submit',event=>{event.preventDefault();placeActivity(assignment,'',$('assignDate').value);$('assignDialog').close();});
$('showTimes').addEventListener('change',event=>{state.showTimes=event.target.checked;save();renderPlans();});
$('days').addEventListener('change',event=>{const key=event.target.dataset.time;if(!key)return;if(!event.target.checkValidity()){event.target.reportValidity();return;}const el=event.target.closest('.activity');const item=state.days[el.dataset.date].find(a=>a.id===el.dataset.id);item[key]=event.target.value;save();const note=el.closest('.day').querySelector('.schedule-note');note.innerHTML=schedule(state.days[el.dataset.date]);});
document.addEventListener('dragstart',event=>{if(event.target.matches('input,textarea,select,button')){event.preventDefault();return;}const el=event.target.closest('.activity');if(!el)return;dragging={id:el.dataset.id,from:el.dataset.date};event.dataTransfer.setData('text/plain',JSON.stringify(dragging));event.dataTransfer.effectAllowed=dragging.from?'move':'copy';});
$('days').addEventListener('dragover',event=>{const day=event.target.closest('.day');if(day&&dragging){event.preventDefault();document.querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));day.classList.add('drag-over');}});
$('days').addEventListener('drop',event=>{const day=event.target.closest('.day');if(!day||!dragging)return;event.preventDefault();const before=event.target.closest('.activity');placeActivity(dragging.id,dragging.from,day.dataset.day,before?.dataset.id);dragging=null;});
document.addEventListener('dragend',()=>{dragging=null;document.querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));});
$('saveTrip').addEventListener('click',()=>{if(!dates().length||!state.city){showPlanner();$('dateError').textContent='Choose a destination and dates, then create your daily plan first.';$('dateError').scrollIntoView({block:'center'});return;}if(save()){$('savedDialog').showModal();setTimeout(()=>{if($('savedDialog').open){$('savedDialog').close();showSummary();}},1400);}});
$('openSaved').addEventListener('click',()=>{$('savedDialog').close();showSummary();});
$('summaryView').addEventListener('click',showSummary);$('editView').addEventListener('click',showPlanner);$('backToEdit').addEventListener('click',showPlanner);
renderCities();buildFields();renderPlans();
