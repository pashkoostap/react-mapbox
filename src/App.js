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
  }

  render() {
    const { markers } = this.state;

    return <Map markers={markers} />;
  }
}

export default App;
