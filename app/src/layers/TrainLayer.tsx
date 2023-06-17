import { GeoJsonLayer } from '@deck.gl/layers/typed';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers/typed';
import { Geometry } from '@luma.gl/core';
import 'mapbox-gl/dist/mapbox-gl.css';

import TestGeoJson2  from '../data/jrw-osakaloop.json';

import { Train } from './train';

const createTrainMeshLayer = (width = 32, height = 16, depth = 16, color = [255, 165, 0, 150]) => {
  const train = new Train(width, height, depth, color);

  const data = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [135.495951, 34.702485],
      },
    },
  ];

  const layer = new SimpleMeshLayer({
    id: 'mlayer',
    data,
    // texture: 'texture.png',
    mesh: new Geometry({
      id: 'train_id',
      attributes: {
        positions: { size: 3, value: new Float32Array(train.getPositions()) },
        normals: { size: 3, value: new Float32Array(train.getNormals()) },
      },
      indices: new Uint16Array(train.getIndices()),
    }),
    getPosition: (d) => d.geometry.coordinates,
    getColor: train.getColor(),
    // getColor: (d) => [255, 0, 0, 150],
    // getOrientation: (d) => [0, 0, 0],
  });
  return layer;
};

const layer = createTrainMeshLayer(32.0, 16.0, 16.0);
const TrainLayer = new GeoJsonLayer({
  id: 'geojson-layer',
  data: TestGeoJson2,
  pickable: true,
  stroked: true,
  filled: true,
  extruded: true,
  pointType: 'circle',
  lineWidthScale: 5,
  // lineWidthMinPixels: 2,
  getFillColor: [160, 160, 180, 200],
  getLineColor: [0, 115, 188, 150],
  getPointRadius: 30,
  getLineWidth: 1,
  getElevation: 0,
});

export { TrainLayer, layer };
