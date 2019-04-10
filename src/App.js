import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
        patient: {},
    };

    componentDidMount() {
        fetch("URL here!!!!")
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({patient: jsonResponse})
            }).catch((err) => console.error(err));
    }

  render() {
      const {patient} = this.state;
      const symptoms = patient.symptoms || {};
      const personalData = patient.personalData || {};
      const medicaments = patient.pharmaceuticals || [];
    return (
      <div className="App">
        <header className="App-header">
            <p>{symptoms}</p>
            <p>{personalData}</p>
            <p>{medicaments}</p>
        </header>
      </div>
    );
  }
}

export default App;
