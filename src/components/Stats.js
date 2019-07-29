import React from 'react';

const Stats = ({ markers, scores, onExport, onImport }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      'left': 0,
      width: '100%',
      padding: '10px',
      zIndex: 1,
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'space-between'
    }}
  >
    <div>
      <span style={{ padding: '0px 5px' }}>Total: {markers.length}</span>

      {scores.map((item, i) => {
        const values = markers.filter(marker => marker.score === item.value);

        return (
          <span key={i} style={{ padding: '0px 5px' }}>
            {item.label}: {values.length}
          </span>
        );
      })}
    </div>

    <div>
      <button style={{ margin: '0px 5px' }}>
        <label>
          Import from JSON
          <input type='file' onChange={onImport} style={{ display: 'none' }} />
        </label>
      </button>
      <button style={{ margin: '0px 5px' }} onClick={onExport}>
        Export to JSON
      </button>
    </div>
  </div>
);

export default Stats;
