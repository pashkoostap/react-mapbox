import React from 'react';
import { Marker } from 'react-map-gl';

const getIconColorByScore = score => {
  switch (true) {
    case score < 50:
      return 'red';

    case score < 100:
      return 'blue';

    case score < 150:
      return 'green';

    default:
      return 'yellow';
  }
};

const updateMarkerValues = (marker, lngLat) => ({
  coordinates: [lngLat.lng, lngLat.lat],
  score: marker.score
});

const Icon = ({ marker, index, onMarkerMove }) => (
  <Feature
    coordinates={item.coordinates}
    properties={{ 'score': 'Low' }}
    draggable={true}
    onDragEnd={e => {
      onMarkerMove(updateMarkerValues(marker, e.lngLat), index);
    }}
  />
);

Icon.defaultProps = {};

export default Icon;
