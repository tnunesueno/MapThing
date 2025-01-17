// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 39.9526, lng: -75.1652 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

addEventListener(window, 'load', initMap);

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Philadelphia",
  });
}

initMap();