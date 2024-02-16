import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import s from './Map.module.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import marker from '../../images/location.svg';
import { IAd } from '../../types';

interface IProp {
  points: IAd[];
}

const Map: React.FC<IProp> = ({ points }) => {
  return (
    <MapContainer
      center={[49.842957, 24.031111]}
      zoom={13}
      className={s.map_container}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map(point => (
        <Marker
          key={point.id}
          position={{ lat: point.position[0], lng: point.position[1] }}
          icon={L.icon({
            iconUrl: marker,
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>{point.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
