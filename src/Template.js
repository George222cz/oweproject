import React from 'react';
import Generator from "./components/Generator";

export default class Template extends React.Component {
    state = {
        size: 0,
        type: 1
    };

    addGenerator = (type) => {
        this.setState({
            size: this.state.size + 1,
            type: type
        });
    };

    render() {
        const generators = [];

        for (var i = 0; i < this.state.size; i += 1) {
            generators.push(<Generator type={this.state.type} />);
        }
        // Ucitel muze vytvorit nove generatory...vybere si jeden ze 3 typu (MIN/MAX, TEXT, IMAGE) podle toho mu to hodi form
        // Exam je zobrazeni pro studenta true-> buttonek v aplikaci pro zobrazení false-> zobrazení od začátku
        //Malus - smrt, bonus - body úspěchu a price jsou krajní hodnoty pro úspěch/neúspěch..
        // ucitel vytvori template, ten odesleme do template collection a z toho potom student dostane random pacienta
        // template se sklada z generatoru!!
        return (
        <div>
            <div>
            <h2>Create new template</h2>
            <p>diagnosis:</p>
            <input type={"text"}/>
            <p>maxMalus:</p>
            <input type={"text"}/>
            <p>maxBonus:</p>
            <input type={"text"}/>
            <p>maxPrice:</p>
            <input type={"text"}/>
            </div>
            <div>
                <p>add new generator</p>
                <button onClick={() => this.addGenerator(1)}>Add generator1</button>
                <button onClick={() => this.addGenerator(2)}>Add generator2</button>
                <div>
                    {generators}
                </div>
            </div>
        </div>
        );
    }
}