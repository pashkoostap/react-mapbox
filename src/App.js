import React, { Component } from 'react';
import Map from './Map';
import { timingSafeEqual } from 'crypto';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      markers: []
    };

    this.onMarkerMove = this.onMarkerMove.bind(this);
    this.onMarkerAdd = this.onMarkerAdd.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.onMarkerRemove = this.onMarkerRemove.bind(this);
  }

  onMarkerMove(marker, index) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        return i === index ? marker : item;
      });

      return { ...prev, markers };
    });
  }

  onScoreChange(add = true) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        if (prev.selected === i) {
          item.score = add ? item.score + 1 : item.score - 1;
        }

        return item;
      });

      return { ...prev, markers };
    });
  }

  onMarkerAdd(coordinates) {
    this.setState(prev => ({
      ...prev,
      selected: null,
      markers: [...prev.markers, { coordinates, score: 0 }]
    }));
  }

  onMarkerRemove() {
    this.setState(prev => ({
      ...prev,
      selected: null,
      markers: prev.markers.filter((item, i) => i !== prev.selected)
    }));
  }

  togglePopup(marker) {
    this.setState({ selected: marker });
  }

  render() {
    const { markers, selected } = this.state;

    return (
      <div>
        {markers.map((item, i) => (
          <div key={i}>
            {i}: {item.score}
          </div>
        ))}
        <Map
          markers={markers}
          selected={selected}
          onMarkerMove={this.onMarkerMove}
          onMarkerAdd={this.onMarkerAdd}
          togglePopup={this.togglePopup}
          onScoreChange={this.onScoreChange}
          onMarkerRemove={this.onMarkerRemove}
        />
      </div>
    );
  }
}

export default App;
