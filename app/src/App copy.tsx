import { Layer } from "@deck.gl/core/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { SimpleMeshLayer } from "@deck.gl/mesh-layers/typed";
// import * as turf from '@turf/turf'
import {CubeGeometry} from '@luma.gl/core'
import React from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  useControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as THREE from "three";



import TrainLayer from "./layers/TrainLayer";

const DeckGLOverlay: React.FC<
  MapboxOverlayProps & { interleaved?: boolean }
> = (props) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

const createCubeMesh = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const getMesh = () => {
  // Three.jsのcreateCubeMesh関数を呼び出して直方体のメッシュを作成
  const mesh = createCubeMesh();
  // Three.jsのメッシュオブジェクトを返す
  return mesh;
}

// const createCube = (latitude: number, longitude: number, size: number) => {
//   const position = [
//     longitude, latitude
//   ];

//   return {
//     position,
//     size
//   };
// }

const App: React.FC = () => {
  const [viewState, setViewState] = React.useState({
    longitude: 135.495951,
    latitude: 34.702485,
    zoom: 16,
    pitch: 75,
    bearing: 0,
  });

  const data = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [135.495951, 34.702485]
      },
      mesh: getMesh(), // Three.jsで作成したメッシュオブジェクト
    }
  ];

  const layer = new SimpleMeshLayer({
    id: 'mesh-layer',
    data,
    // texture: 'texture.png',
    mesh: new CubeGeometry(),
    getPosition: (d) => d.geometry.coordinates,
    getColor: d => [0, 255, 0],
    getOrientation: d => [0, 40, 0],
  });

  return (
    <Map
      style={{ width: "100vw", height: "100vh" }}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/ohmyki109/clihcchy4003d01r11x952wxq"
      mapboxAccessToken="pk.eyJ1Ijoib2hteWtpMTA5IiwiYSI6ImNsZzU0ZjdrejAzMmIzZG9hdWU5cmI5NXEifQ.IMTKhOYCjDTZE4IDDPF-Og"
    >
      <NavigationControl />
      <FullscreenControl />
      <GeolocateControl />
      <DeckGLOverlay interleaved layers={[TrainLayer,layer]} />
    </Map>
  );
};

export default App;
