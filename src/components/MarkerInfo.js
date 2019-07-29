import React from 'react';

import { Popup } from 'react-mapbox-gl';

const MarkerInfo = ({ marker, scores, onScoreChange, onMarkerRemove }) => {
  if (!marker) return null;

  return (
    <Popup coordinates={marker.coordinates}>
      <div>
        <select
          onChange={e => onScoreChange(parseInt(e.target.value))}
          defaultValue={marker.score}
        >
          {scores.map(({ value, label }, i) => (
            <option value={value} key={i}>
              {label}
            </option>
          ))}
        </select>

        <button onClick={onMarkerRemove}>Remove</button>
      </div>
    </Popup>
  );
};

export default MarkerInfo;
