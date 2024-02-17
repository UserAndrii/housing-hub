// import React from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import s from './Map.module.scss';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import marker from '../../images/location.svg';
// import { IAd } from '../../types';

// interface IProp {
//   points: IAd[];
// }

// const Map: React.FC<IProp> = ({ points }) => {
//   return (
//     <MapContainer
//       center={[49.842957, 24.031111]}
//       zoom={13}
//       className={s.map_container}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {points.map(point => (
//         <Marker
//           key={point.id}
//           position={{ lat: point.position[0], lng: point.position[1] }}
//           icon={L.icon({
//             iconUrl: marker,
//             iconSize: [40, 40],
//             iconAnchor: [12, 41],
//             popupAnchor: [1, -34],
//           })}
//         >
//           <Popup>{point.title}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default Map;

import React, { useRef } from 'react';
import s from './Map.module.scss';
import { IAd } from '../../types';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import marker from '../../images/location.svg';

interface IProp {
  points: IAd[];
  center: { lat: number; lng: number };
}

const Map: React.FC<IProp> = ({ points, center }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const svgToUrl = (svg: string) => {
    const encoded = encodeURIComponent(svg);
    return `data:image/svg+xml;utf8,${encoded}`;
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = null;
  }, []);

  return (
    <div className={s.map_container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {points.map(point => (
          <Marker
            key={point.id}
            position={{ lat: point.position[0], lng: point.position[1] }}
            icon={{
              url: svgToUrl(marker),
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(20, 20),
            }}
          >
            <InfoWindow
              position={{ lat: point.position[0], lng: point.position[1] }}
            >
              <div>{point.title}</div>
            </InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
