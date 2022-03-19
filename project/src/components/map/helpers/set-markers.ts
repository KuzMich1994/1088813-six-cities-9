import leaflet, {LayerGroup, Map, Marker} from 'leaflet';
import {MapPoints} from '../../../types/map-points';

export const setMarkers = (points: MapPoints[], map: Map, activeId: number | null) => {
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

  const groupMarkers = new LayerGroup();

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

  return groupMarkers;
};
