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

const Icon = ({ marker, index, onMarkerMove }) => (
  <Marker
    latitude={marker.latitude}
    longitude={marker.longitude}
    draggable={true}
    onDragEnd={e => {
      const value = {
        longitude: e.lngLat[0],
        latitude: e.lngLat[1],
        score: marker.score
      };

      onMarkerMove(value, index);
    }}
  >
    <div
      style={{
        backgroundColor: getIconColorByScore(marker.score),
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        color: 'white',
        lineHeight: '50px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      {marker.score}
    </div>
  </Marker>
);

Icon.defaultProps = {};

export default Icon;
