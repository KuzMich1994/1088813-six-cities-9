import {useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapPoints} from '../../types/map-points';
import {Offer} from '../../types/offer';
import {setMapView} from './helpers/set-map-view';
import useMap from '../../hooks/use-map';
import leaflet, {LayerGroup, Marker} from 'leaflet';

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

  const defaultMapIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentMapIcon = leaflet.icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    const groupMarkers = new LayerGroup();

    if (map) {
      setMapView(cityPoint, map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker.setIcon(
          activeId === point.id ? currentMapIcon : defaultMapIcon,
        ).addTo(groupMarkers);
      });

      groupMarkers.addTo(map);

      return () => {
        map.removeLayer(groupMarkers);
      };
    }
  }, [map, points, activeId, cityPoint, currentMapIcon, defaultMapIcon]);

  return (
    <div ref={mapRef} style={{maxWidth: `${mapSize}`, overflow: 'hidden', height: '100%', margin: 'auto'}}>

    </div>
  );
}

export default MapComponent;
