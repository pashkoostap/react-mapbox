import React, { Component } from 'react';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {
          coordinates: [24, 48],
          score: 0
        },
        {
          coordinates: [24.05, 48.05],
          score: 55
        }
      ]
    };

    this.onMarkerMove = this.onMarkerMove.bind(this);
    this.onMarkerAdd = this.onMarkerAdd.bind(this);
  }

  onMarkerMove(marker, index) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        return i === index ? marker : item;
      });

      return { ...prev, markers };
    });
  }

  onMarkerAdd(coordinates) {
    this.setState(prev => ({
      ...prev,
      markers: [...prev.markers, { coordinates, score: 0 }]
    }));
  }

  render() {
    const { markers } = this.state;

    return (
      <Map
        markers={markers}
        onMarkerMove={this.onMarkerMove}
        onMarkerAdd={this.onMarkerAdd}
      />
    );
  }
}

export default App;
