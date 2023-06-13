import React, { useState, useEffect, useRef  } from 'react';
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { useControl } from "react-map-gl";
import MapGL, { NavigationControl } from "react-map-gl";
// import * as turf from "@turf/turf";
import TestGeoJson1 from "./data/test.json";
import TestGeoJson2 from "./data/jrw-osakaloop.json";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DeckGLOverlay(props: MapboxOverlayProps & { interleaved?: boolean }) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const Cube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const color = active ? 'red' : hovered ? 'blue' : 'gray';

  return (
    <mesh
      ref={meshRef}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const App: React.FC = () => {
  const geoJsonLayer1 = new GeoJsonLayer({
    id: "geojson-layer",
    data: TestGeoJson2,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    pointType: "circle",
    lineWidthScale: 10,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [0, 115, 188, 255],
    getPointRadius: 30,
    getLineWidth: 1,
    getElevation: 10,
  });
  const geoJsonLayer2 = new GeoJsonLayer({
    id: "geojson-layer2",
    data: TestGeoJson1,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    pointType: "circle",
    lineWidthScale: 10,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getLineColor: [255, 115, 188, 255],
    getPointRadius: 30,
    getLineWidth: 1,
    getElevation: 10,
  });

  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    setMapWidth(window.innerWidth);
    setMapHeight(window.innerHeight);
  }, []);

  const viewState = {
    longitude: 134.829221,
    latitude: 34.757939,
    zoom: 16,
    pitch: 75,
    bearing: 0,
  }

  return (
    <MapGL
      style={{ width: "100vw", height: "100vh" }}
      initialViewState={viewState}
      mapStyle={"mapbox://styles/ohmyki109/clirbsvhn00lb01q13niofbfy"}
      mapboxAccessToken={
        "pk.eyJ1Ijoib2hteWtpMTA5IiwiYSI6ImNsZzU0ZjdrejAzMmIzZG9hdWU5cmI5NXEifQ.IMTKhOYCjDTZE4IDDPF-Og"
      }
    >
      {" "}
      <DeckGLOverlay layers={[geoJsonLayer1,geoJsonLayer2]} />
      <NavigationControl />{" "}
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0 }}
        camera={{ position: [0, 0, 5] }}
      >
        <Cube />
      </Canvas>
    </MapGL>
  );
};

export default App;
