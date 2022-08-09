import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { TileLayer, useMap } from 'react-leaflet';

type RoutingProps = {
  from?: {
    long: number;
    lat: number;
  };
  to?: {
    long: number;
    lat: number;
  };
};

const Layer: React.FC<RoutingProps> = ({ from, to }) => {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const routingControl = (L as any).Routing.control({
      waypoints: [L.latLng(from.long, from.lat), L.latLng(to.long, to.lat)],
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
      },
      show: true,
      fitSelectedRoutes: true,
      collapsible: true
    }).addTo(map);

    return () => void map?.removeControl(routingControl);
  }, [map, from, to]);

  return (
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
  );
};

export default Layer;
