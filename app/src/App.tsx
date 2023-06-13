import React, { useState, useEffect, useRef } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { useControl } from "react-map-gl";
import MapGL, { NavigationControl } from "react-map-gl";
import * as turf from "@turf/turf";
import TestGeoJson1 from "./data/test.json";
import TestGeoJson2 from "./data/jrw-osakaloop.json";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DeckGLOverlay: React.FC<
  MapboxOverlayProps & { interleaved?: boolean }
> = (props) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
};

const Cube = ({ coordinates }: { coordinates: [number, number][] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [positionIndex, setPositionIndex] = useState(0);

  useFrame(() => {
    if (meshRef.current) {
      const currentPosition = coordinates[positionIndex];
      const nextPositionIndex = (positionIndex + 1) % coordinates.length;
      const nextPosition = coordinates[nextPositionIndex];

      const distanceX = nextPosition[0] - currentPosition[0];
      const distanceY = nextPosition[1] - currentPosition[1];
      const speed = 0.0001; // 移動速度の設定（適宜調整してください）

      const newPositionX = currentPosition[0] + distanceX * speed;
      const newPositionY = currentPosition[1] + distanceY * speed;

      meshRef.current.position.set(newPositionX, newPositionY, 0);

      // 次の座標に到達したら位置インデックスを更新
      if (
        newPositionX === nextPosition[0] &&
        newPositionY === nextPosition[1]
      ) {
        setPositionIndex(nextPositionIndex);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const App: React.FC = () => {
  const coordinates: [number, number][] = [
    [135.52163, 34.7052],
    [135.52143, 34.70517],
    [135.52109, 34.70509],
    [135.52069, 34.70496],
    [135.52029, 34.70483],
    [135.53358, 34.69761],
    [135.53422, 34.69617],
    [135.53432, 34.69593],
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
    [135.53358, 34.69761],
  ];

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
    getElevation: 0,
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
    getElevation: 0,
  });

  const [mapWidth, setMapWidth] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    setMapWidth(window.innerWidth);
    setMapHeight(window.innerHeight);
  }, []);

  const viewState = {
    longitude: 135.495951,
    latitude: 34.702485,
    zoom: 16,
    pitch: 75,
    bearing: 0,
  };

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
      <DeckGLOverlay layers={[geoJsonLayer1, geoJsonLayer2]} />
      <NavigationControl />{" "}
      <div
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <Canvas
          style={{ width: "100%", height: "100%" }}
        >
          <Cube coordinates={coordinates} />
        </Canvas>
      </div>
    </MapGL>
  );
};

export default App;
