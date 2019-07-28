import React from 'react';
import ReactMapGL from 'react-map-gl';

import Icon from './Icon';

const Map = ({ markers, styles }) => (
  <ReactMapGL
    width={'100%'}
    height={'100vh'}
    mapboxApiAccessToken={process.env.TOKEN}
    latitude={48}
    longitude={24}
    zoom={10}
  >
    {markers.map((marker, i) => (
      <Icon {...marker} key={i} />
    ))}
  </ReactMapGL>
);

export default Map;
