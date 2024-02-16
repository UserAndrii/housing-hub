import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import s from './Map.module.scss';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import marker from '../../images/location.svg';
import selectedMarker from '../../images/selected-location.svg';

const Map: React.FC = () => {
  const points = [
    {
      id: 12,
      position: [49.842957, 24.031111],
      title: 'Point 1',
      price: 100,
      images:
        'https://mayak.kiev.ua/sites/mayak.kiev/files/news/apartamenti.jpg',
      description: 'Description for Point 1',
    },
    {
      id: 123,
      position: [49.843, 24.031],
      title: 'Point 2',
      price: 150,
      images:
        'https://cdn.riastatic.com/photosnewr/ria/dom_news_logo/apartamenty-chto-eto__211182-620x0.jpg',
      description: 'Description for Point 2',
    },
    {
      id: 125,
      position: [49.842, 24.032],
      title: 'Point 3',
      price: 200,
      images:
        'https://24tv.ua/resources/photos/news/201909/1203371_9412140.jpg?201909132013&w=1351&h=901&fit=cover%27&output=webp',
      description: 'Description for Point 3',
    },
    {
      id: 126,
      position: [49.844, 24.03],
      title: 'Point 4',
      price: 120,
      images:
        'https://vison.te.ua/files/user_files/1420d12c76_6259_118073/ca595893dfb58bc73500.jpg',
      description: 'Description for Point 4',
    },
    {
      id: 127,
      position: [49.842, 24.03],
      title: 'Point 5',
      price: 180,
      images: 'https://his.ua/img/articles/FJvyWFD5JE.jpg',
      description: 'Description for Point 5',
    },
  ];

  return (
    <MapContainer
      center={[49.842957, 24.031111]}
      zoom={12}
      className={s.map_container}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.map(ad => (
        <Marker
          key={ad.id}
          position={{ lat: ad.position[0], lng: ad.position[1] }}
          icon={L.icon({
            iconUrl: marker,
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
          })}
        >
          <Popup>{ad.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
