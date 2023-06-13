import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoJsonLayer } from "@deck.gl/layers/typed";

import TestGeoJson2 from "../data/jrw-osakaloop.json";

const TrainLayer = new GeoJsonLayer({
  id: "geojson-layer",
  data: TestGeoJson2,
  pickable: true,
  stroked: true,
  filled: true,
  extruded: true,
  pointType: "circle",
  lineWidthScale: 5,
  // lineWidthMinPixels: 2,
  getFillColor: [160, 160, 180, 200],
  getLineColor: [0, 115, 188, 255],
  getPointRadius: 30,
  getLineWidth: 10,
  getElevation: 0,
});

export default TrainLayer;
