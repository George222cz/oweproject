import React from 'react';
import Slider from 'react-input-slider';

export default class Template extends React.Component {
     state = {
        x: 1
    };



    render() {
        // Ucitel muze vytvorit nove generatory...vybere si jeden ze 3 typu (MIN/MAX, TEXT, IMAGE) podle toho mu to hodi form
        // Exam je zobrazeni pro studenta true-> buttonek v aplikaci pro zobrazení false-> zobrazení od začátku
        //Malus - smrt, bonus - body úspěchu a price jsou krajní hodnoty pro úspěch/neúspěch..
        // ucitel vytvori template, ten odesleme do template collection a z toho potom student dostane random pacienta
        // template se sklada z generatoru!!
        return (
        <div>
            <p>Exam:</p>
            <input type={"text"}/>
            <p>Malus:</p>
            <input type={"text"}/>
            <p>Bonus:</p>
            <input type={"text"}/>
            <p>Price:</p>
            <input type={"text"}/>
            <br/>
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