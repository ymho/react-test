import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed';
import { useControl } from 'react-map-gl';

import Map, { NavigationControl } from 'react-map-gl';

function DeckGLOverlay(props: MapboxOverlayProps & {
    interleaved?: boolean;
}) {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

const App: React.FC = () => {
    return (
        <Map
            style={{ width: "100vw", height: "100vh" }}
            initialViewState={{
                longitude: 135.495951,
                latitude: 34.702485,
                zoom: 16,
                pitch: 75,
                bearing: 0,
            }}
            mapStyle="mapbox://styles/ohmyki109/clirbsvhn00lb01q13niofbfy"
            mapboxAccessToken="pk.eyJ1Ijoib2hteWtpMTA5IiwiYSI6ImNsZzU0ZjdrejAzMmIzZG9hdWU5cmI5NXEifQ.IMTKhOYCjDTZE4IDDPF-Og"
        >
            <DeckGLOverlay interleaved layers={[]}/>
            <NavigationControl />
        </Map>
    );
}

export default App;