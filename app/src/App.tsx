import React from "react";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { useControl } from "react-map-gl";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import TrainLayer from "./layers/TrainLayer";

import { Canvas, useFrame } from "@react-three/fiber";
import * as turf from '@turf/turf'

const DeckGLOverlay: React.FC<
  MapboxOverlayProps & { interleaved?: boolean }
> = (props) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

const Cube = () => {
  const cubeRef = React.useRef();
  const routeCoordinates = [
    [135.495951, 34.702485],
    [135.52163, 34.7052],
    [135.52191, 34.70523],
    [135.52195, 34.70523],
    [135.52242, 34.70523],
    [135.52293, 34.70518],
    [135.52312, 34.70515],
    [135.52326, 34.70513],
    [135.52344, 34.7051],
    [135.52361, 34.70505],
    [135.52381, 34.70499],
    [135.52422, 34.70483],
    [135.52465, 34.70462],
    [135.52476, 34.70456],
    [135.52489, 34.70449],
    [135.52498, 34.70443],
    [135.52527, 34.70426],
    [135.52549, 34.70412],
    [135.52592, 34.70385],
    [135.52631, 34.7036],
    [135.52634, 34.70358],
    [135.52647, 34.7035],
    [135.52657, 34.70344],
    [135.52689, 34.70325],
    [135.52714, 34.70308],
    [135.52745, 34.7029],
    [135.52759, 34.70282],
    [135.52764, 34.70279],
    [135.52767, 34.70276],
    [135.52809, 34.70251],
    [135.52859, 34.70221],
    [135.52911, 34.70188],
    [135.5293, 34.70176],
    [135.52932, 34.70175],
    [135.52968, 34.70152],
    [135.53049, 34.70102],
    [135.53067, 34.70091],
    [135.5316, 34.70033],
    [135.5318, 34.7002],
    [135.53185, 34.70016],
    [135.53202, 34.70005],
    [135.53224, 34.69988],
    [135.53253, 34.6996],
    [135.53276, 34.69932],
    [135.53291, 34.69907],
    [135.53298, 34.69892],
    [135.53301, 34.69884],
    [135.53309, 34.69867],
    [135.53317, 34.69851],
    [135.53334, 34.69812],
    [135.53347, 34.69785],
    [135.53358, 34.69761]
  ];

  const route = turf.lineString(routeCoordinates);
  const routeLength = turf.length(route);

  const distancePerFrame = 0.1; // フレームごとの移動距離
  let currentDistance = 0;

  useFrame(() => {
    if (currentDistance < routeLength) {
      const pointOnRoute = turf.along(route, currentDistance);
      const [lng, lat] = turf.getCoord(pointOnRoute.geometry);

      cubeRef.current.position.x = lng;
      cubeRef.current.position.y = lat;

      // console.log(lng,lat)
      console.log(cubeRef.current.position.x, cubeRef.current.position.y)

      currentDistance += distancePerFrame;
    }
  });
  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
};

const App: React.FC = () => {
  const [viewState, setViewState] = React.useState({
    longitude: 135.495951,
    latitude: 34.702485,
    zoom: 16,
    pitch: 75,
    bearing: 0,
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
      <DeckGLOverlay interleaved layers={[TrainLayer]} />
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <Cube />
      </Canvas>
    </Map>
  );
};

export default App;
