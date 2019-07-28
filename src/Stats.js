import React from 'react';

const Stats = ({ markers, scores }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      'left': 0,
      width: '100%',
      padding: '10px',
      zIndex: 1,
      backgroundColor: '#fff'
    }}
  >
    {scores.map((item, i) => {
      const values = markers.filter(marker => marker.score === item.value);

      return (
        <span key={i}>
          {item.label}: {values.length}
        </span>
      );
    })}
    <span>Total: {markers.length}</span>
  </div>
);

export default Stats;
