import React from 'react';

export default class Template extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }
    }

    pStyle = {
        display: 'inline'

    };

    render() {
        const {type} = this.state;
        return (
            <div>
            <div style={{backgroundColor: 'gray'}}>
                <p style={this.pStyle}>title:</p>
                <input type={"text"}/>
                {(type === 1) &&
                    <div>
                        <p style={this.pStyle}>text:</p>
                        <input type={"text"}/>
                    </div>
                }
                {(type === 2) &&
                <div>
                    <p style={this.pStyle}>Min:</p>
                    <input type={"text"}/>
                    <p style={this.pStyle}>Max:</p>
                    <input type={"text"}/>
                </div>
                }
            </div>
                <br></br>
            </div>
        );
    }
}