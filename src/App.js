import React, { Component } from 'react';
import FileSaver from 'file-saver';

import Map from './Map';
import Stats from './Stats';

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
    this.onExport = this.onExport.bind(this);
    this.onImport = this.onImport.bind(this);
  }

  onMarkerMove(marker, index) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        return i === index ? marker : item;
      });

      return { ...prev, markers };
    });
  }

  onScoreChange(score) {
    this.setState(prev => {
      const markers = prev.markers.map((item, i) => {
        if (parseInt(prev.selected) === i) {
          item.score = score;
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
      markers: prev.markers.filter((item, i) => i !== parseInt(prev.selected))
    }));
  }

  togglePopup(marker) {
    this.setState({ selected: marker });
  }

  onExport() {
    const blob = new Blob([JSON.stringify(this.state.markers, null, 4)], {
      type: 'application/json'
    });
    FileSaver.saveAs(blob, 'markers.json');
  }

  onImport(e) {
    const reader = new FileReader();

    reader.onload = function() {
      this.setState({ markers: JSON.parse(reader.result) });
    }.bind(this);

    reader.readAsText(e.target.files[0]);
  }

  render() {
    const { markers, selected } = this.state;
    const { scores } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <Stats
          scores={scores}
          markers={markers}
          onExport={this.onExport}
          onImport={this.onImport}
        />

        <Map
          markers={markers}
          selected={selected}
          onMarkerMove={this.onMarkerMove}
          onMarkerAdd={this.onMarkerAdd}
          togglePopup={this.togglePopup}
          onScoreChange={this.onScoreChange}
          onMarkerRemove={this.onMarkerRemove}
          scores={scores}
        />
      </div>
    );
  }
}

App.defaultProps = {
  scores: [
    { label: 'Zero', value: 0 },
    { label: 'One', value: 1 },
    { label: 'Two', value: 2 },
    { label: 'Three', value: 3 },
    { label: 'Four', value: 4 },
    { label: 'Five', value: 5 }
  ]
};

export default App;
