import React from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: process.env.TOKEN
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
  onMarkerRemove
}) => {
  const selectedMarker = markers.find((item, i) => i === selected);

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
      <Layer
        type='circle'
        id='marker'
        paint={{
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
            'Low',
            '#fbb03b',
            'Black',
            '#223b53',
            'Hispanic',
            '#e55e5e',
            'Asian',
            '#3bb2d0',
            /* other */ '#ccc'
          ]
        }}
      >
        {markers.map((item, i) => (
          <Feature
            coordinates={item.coordinates}
            properties={{ 'score': 'Low' }}
            draggable={true}
            onMouseEnter={e => togglePopup(i)}
            key={i}
            onDragEnd={e => {
              onMarkerMove(updateMarkerValues(item, e.lngLat), i);
            }}
          />
        ))}
      </Layer>
      {selectedMarker && (
        <Popup coordinates={selectedMarker.coordinates}>
          <div>
            <div>
              Score: {selectedMarker.score}
              <button
                onClick={() => {
                  onScoreChange();
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  onScoreChange(false);
                }}
              >
                -
              </button>
            </div>

            <button onClick={onMarkerRemove}>Remove marker</button>
          </div>
        </Popup>
      )}
      )}
    </Map>
  );
};

export default MapWrapper;
