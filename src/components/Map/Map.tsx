import React from 'react';
import { MapContainer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/slice';
import Layer from "./Layer";

const Map: React.FC = () => {
  const route = useSelector((state: RootState) => state.main.activeRoute);

  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={[55.7418, 38.0031]}
    >
      <Layer from={route.from} to={route.to} />
    </MapContainer>
  );
};

export default Map;
