mapboxgl.accessToken = 'pk.eyJ1IjoiaHpoYW5nMjMzOCIsImEiOiJjbWhyNGs5ZWExNWl2MnJwc296cmljMjQwIn0.khB0puTVEgjQYbZ0bxFaFQ';
const STYLE_URL = 'mapbox://styles/hzhang2338/cmhr5ppx7001u01s2amnh6s72';

// =================== 四地对比===================
function view(lon, lat, zoom = 11, pitch = 0, bearing = 0) {
  return { center: [lon, lat], zoom, pitch, bearing };
}
const VIEWS4 = {
  sf:     view(-122.447, 37.807, 10.3),
  hk:     view( 114.165, 22.314, 11.2),
  norway: view(   5.324, 60.394, 10.6),      // Bergen
  redsea: view(  34.976, 28.539,  9.0),      // Gulf of Aqaba
};

function makeMiniMap(id, v) {
  const el = document.getElementById(id);
  if (!el) return null;
  const map = new mapboxgl.Map({
    container: id,
    style: STYLE_URL,
    center: v.center,
    zoom: v.zoom,
    pitch: v.pitch || 0,
    bearing: v.bearing || 0,
    interactive: false,
    attributionControl: false
  });
  map.addControl(new mapboxgl.AttributionControl({ compact: true }));
  map.on('load', () => map.resize());
  return map;
}


makeMiniMap('map-sf',     VIEWS4.sf);
makeMiniMap('map-hk',     VIEWS4.hk);
makeMiniMap('map-norway', VIEWS4.norway);
makeMiniMap('map-redsea', VIEWS4.redsea);


let _timer = null;
window.addEventListener('resize', () => {
  clearTimeout(_timer);
  _timer = setTimeout(() => {
    document.querySelectorAll('.mapboxgl-map').forEach(node => {
      const m = node._map;
      if (m && typeof m.resize === 'function') m.resize();
    });
  }, 120);
});
