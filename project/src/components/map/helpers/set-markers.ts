import leaflet, {Map} from 'leaflet'
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

  points.forEach((point) => {
    leaflet.marker({
      lat: point.latitude,
      lng: point.longitude,
    }, {
      icon: activeId === point.id ? currentMapIcon : defaultMapIcon,
    }).addTo(map);
  })
}
