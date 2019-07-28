import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ2luZW5lbmUiLCJhIjoiY2p5bml0dXlxMHVoaTNmbXd5eDJjNmh1bCJ9.oIYTCKtSLLYPnjVRjzlF1w'
});

const updateMarkerValues = (marker, lngLat) => ({
  coordinates: [lngLat.lng, lngLat.lat],
  score: marker.score
});

const MapWrapper = ({
  markers,
  onMarkerAdd,
  onMarkerMove,
  selected,
  togglePopup,
  onScoreChange,
  onMarkerRemove,
  scores,
  layerPaint
}) => {
  const selectedMarker = markers.find((item, i) => i === parseInt(selected));

  return (
    <Map
      style='mapbox://styles/mapbox/streets-v9'
      onClick={(map, e) => {
        onMarkerAdd([e.lngLat.lng, e.lngLat.lat]);
      }}
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={[24, 48]}
      zoom={[10]}
    >
      <Layer type='circle' id='marker' paint={layerPaint}>
        {markers.map((item, i) => (
          <Feature
            coordinates={item.coordinates}
            properties={{ 'score': `${item.score}` }}
            draggable={true}
            onMouseEnter={() => togglePopup(`${i}`)}
            key={i}
            onDragEnd={e => {
              onMarkerMove(updateMarkerValues(item, e.lngLat), i);
            }}
            onDragStart={e => {
              togglePopup(null);
            }}
          />
        ))}
      </Layer>
      {selectedMarker && (
        <Popup coordinates={selectedMarker.coordinates}>
          <div>
            <select
              onChange={e => onScoreChange(parseInt(e.target.value))}
              defaultValue={0}
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
      )}
      )}
    </Map>
  );
};

MapWrapper.defaultProps = {
  layerPaint: {
    'circle-color': 'red',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#fff',
    'circle-stroke-opacity': 1,
    'circle-radius': {
      'base': 15,
      'stops': [[10, 16], [22, 40]]
    },
    'circle-color': [
      'match',
      ['get', 'score'],
      '0',
      'black',
      '1',
      'gray',
      '2',
      'red',
      '3',
      'orange',
      '4',
      'lime',
      '5',
      'green',
      '#ccc'
    ]
  }
};

export default MapWrapper;
