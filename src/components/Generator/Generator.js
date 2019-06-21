import React from 'react';
import Switch from "react-switch";

export default class Template extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            checked: false
        };
    }

    pStyle = {
        display: 'inline'

    };

    handleChange(checked) {
        this.setState({ checked });
    }

    render() {
        const {type, checked} = this.state;
        const {title,handleChange} = this.props;
        return (
            <div>
                <div style={{backgroundColor: '#5a5a5a'}}>
                    <p style={this.pStyle}>Title: </p>
                    <input type={"text"} value={title} onChange={handleChange('data.title')}/>
                    {(type === 1) &&
                    <div>
                        <p style={this.pStyle}>Text: </p>
                        <input type={"text"}/>
                    </div>
                    }
                    {(type === 2) &&
                    <div>
                        <p style={this.pStyle}>Min: </p>
                        <input type={"text"}/>
                        <p style={this.pStyle}>Max: </p>
                        <input type={"text"}/>
                    </div>
                    }
                    {(type === 3) &&
                    <div>
                        <p style={this.pStyle}>Images: </p>
                    </div>
                    }
                    <p style={this.pStyle}>exam: </p>
                    <Switch onChange={this.handleChange} checked={this.state.checked}/>
                    {(checked) &&
                    <div>
                        <p style={this.pStyle}>Malus: </p>
                        <input type={"text"}/>
                        <p style={this.pStyle}>Bonus: </p>
                        <input type={"text"}/>
                        <p style={this.pStyle}>Price: </p>
                        <input type={"text"}/>
                    </div>
                    }
                </div>
                <br></br>
            </div>
        );
    }
}