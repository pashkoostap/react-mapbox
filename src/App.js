import React, { Component } from 'react';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [
        {
          latitude: 48,
          longitude: 24,
          score: 0
        },
        {
          latitude: 48.05,
          longitude: 24.05,
          score: 50
        }
      ]
    };

    this.onMarkerMove = this.onMarkerMove.bind(this);
  }

  onMarkerMove(marker, index) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        return i === index ? marker : item;
      });

      return { ...prev, markers };
    });
  }

  render() {
    const { markers } = this.state;

    return <Map markers={markers} onMarkerMove={this.onMarkerMove} />;
  }
}

export default App;
