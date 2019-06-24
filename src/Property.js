import React from 'react';

export default class Property extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            text: props.text
        }
    }

    render() {
        const {title, text} = this.state;

        return (
            <div>
            <p>Titulek: {title}</p>
            <p>Text: {text}</p>
            <hr color="red" align="center" />
            </div>
        )
    }
}