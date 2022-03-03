import React, {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapPoints} from '../../types/map-points';
import {Offer} from '../../types/offer';
import {setMapView} from './helpers/set-map-view';
import {setMarkers} from './helpers/set-markers';
import useMap from '../../hooks/use-map';

type MapProps = {
  mapSize: string;
  points: MapPoints[];
  activeId: number | null;
  offers: Offer[];
}

function MapComponent({mapSize, points, activeId, offers}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const cityPoint = offers[0].city.location;
  const map = useMap(mapRef, cityPoint);

  useEffect(() => {
    if (map) {
      setMapView(cityPoint, map);
      setMarkers(points, map, activeId);
    }
  }, [map, points, activeId, cityPoint]);

  return (
    <div ref={mapRef} style={{maxWidth: `${mapSize}`, overflow: 'hidden', height: '100%', margin: 'auto'}}>

    </div>
  );
}

export default MapComponent;
