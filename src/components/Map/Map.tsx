import React, { useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';

import s from './Map.module.scss';
import marker from '../../images/location.svg';
import selectedMarker from '../../images/selected-location.svg';

import { defaultTheme } from './Theme';
import { selectAd } from '../../redux/selectors';

interface IProp {
  center: { lat: number; lng: number };
  selectedPoint: number | null;
  setSelectedPoint: (n: number | null) => void;
  setVisibleMarkers: (a: number[]) => void;
}

const Map: React.FC<IProp> = ({
  center,
  selectedPoint,
  setSelectedPoint,
  setVisibleMarkers,
}) => {
  const points = useSelector(selectAd);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clicableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    styles: defaultTheme,
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const handleBoundsChanged = useCallback(
    debounce(() => {
      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        if (bounds) {
          const visibleMarkers = points.filter(point =>
            bounds.contains(
              new google.maps.LatLng(point.position.lat, point.position.lng)
            )
          );
          const visibleMarkerIds = visibleMarkers.map(marker => marker.id);
          setVisibleMarkers(visibleMarkerIds);
        }
      }
    }, 300),
    [mapRef, points]
  );

  return (
    <div className={s.map_container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => setSelectedPoint(null)}
        onBoundsChanged={handleBoundsChanged}
        options={defaultOptions}
      >
        {points.map(({ id, position }) => (
          <Marker
            key={id}
            position={position}
            icon={{ url: selectedPoint === id ? selectedMarker : marker }}
            onClick={() => setSelectedPoint(id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
