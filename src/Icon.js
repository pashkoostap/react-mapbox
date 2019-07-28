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

const Icon = props => (
  <Marker {...props}>
    <div
      style={{
        backgroundColor: getIconColorByScore(props.score),
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        color: 'white',
        lineHeight: '50px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      {props.score}
    </div>
  </Marker>
);

Icon.defaultProps = {};

export default Icon;
