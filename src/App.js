import React, { Component } from 'react';
import './App.css';
import Property from './Property';
import Template from './Template';
//import exampleJSON from './json1.json';

class App extends Component {
    state = {
        patient: {},
    };

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/student")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({patient: jsonResponse})
            }).catch((err) => console.error(err));
    }

  render() {
    const {patient} = this.state;

    if (!patient.properties){
        return <div>loading</div>
    }

    return (
      <div className="App">
        <header className="App-header">
            <div>
                <h1>{patient.diagnosis}</h1>
                {patient.properties.map((item) =>
                    <Property title = {item.title} text={item.text} />
                )}
                <Template/>
            </div>
        </header>
      </div>
    );
  }
}


export default App;
