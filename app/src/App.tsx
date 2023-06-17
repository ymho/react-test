
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import React from 'react';
import {
  Map,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  useControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {TrainLayer, layer} from './layers/TrainLayer';

const DeckGLOverlay: React.FC<MapboxOverlayProps & { interleaved?: boolean }> = (props) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
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
      style={{ width: '100vw', height: '100vh' }}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/ohmyki109/clihcchy4003d01r11x952wxq"
      mapboxAccessToken="pk.eyJ1Ijoib2hteWtpMTA5IiwiYSI6ImNsZzU0ZjdrejAzMmIzZG9hdWU5cmI5NXEifQ.IMTKhOYCjDTZE4IDDPF-Og"
    >
      <NavigationControl />
      <FullscreenControl />
      <GeolocateControl />
      <DeckGLOverlay interleaved layers={[TrainLayer, layer]} />
    </Map>
  );
};

export default App;
