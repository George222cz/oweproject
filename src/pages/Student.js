import React from 'react';
import Property from "../Property";
import Slider from "react-input-slider";

class Student extends React.Component {
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
            <div>
                <div>
                    <h1>{patient.diagnosis}</h1>
                    {patient.properties.map((item) =>
                        <Property title = {item.title} text={item.text} />
                    )}
                </div>
                <p>Min/Max:</p>
                <Slider
                    axis="x"
                    x={this.state.x}
                    onChange={({ x }) => this.setState(state => ({ ...state, x }))}
                />
            </div>
        );
    }
}

export default Student;