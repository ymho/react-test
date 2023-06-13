import React, { useState, useEffect, ReactNode } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import MapGL, { useControl, NavigationControl } from "react-map-gl";
import TestGeoJson1 from "../data/test.json";
import TestGeoJson2 from "../data/jrw-osakaloop.json";


const DeckGLOverlay: React.FC<MapboxOverlayProps> = (props) => {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
};

interface MapProps {
    children: ReactNode;
}

const Map: React.FC<MapProps> = (props) => {
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

    const [mapDimensions, setMapDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setMapDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
            mapStyle="mapbox://styles/ohmyki109/clirbsvhn00lb01q13niofbfy"
            mapboxAccessToken="pk.eyJ1Ijoib2hteWtpMTA5IiwiYSI6ImNsZzU0ZjdrejAzMmIzZG9hdWU5cmI5NXEifQ.IMTKhOYCjDTZE4IDDPF-Og"
            {...mapDimensions}
        >
            <DeckGLOverlay layers={[geoJsonLayer1, geoJsonLayer2]} />
            <NavigationControl />
            {props.children}
        </MapGL>
    );
};

export default Map;
