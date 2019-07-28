import React from 'react';
import ReactMapGL from 'react-map-gl';

import Icon from './Icon';

const Map = ({ markers, onMarkerMove }) => {
  const [viewport, setViewport] = React.useState({
    width: 400,
    height: 400,
    latitude: 48,
    longitude: 24,
    zoom: 10
  });

  return (
    <ReactMapGL
      {...viewport}
      width={'100%'}
      height={'100vh'}
      mapboxApiAccessToken={process.env.TOKEN}
      onViewStateChange={setViewport}
    >
      {markers.map((marker, i) => (
        <Icon marker={marker} key={i} index={i} onMarkerMove={onMarkerMove} />
      ))}
    </ReactMapGL>
  );
};

export default Map;
