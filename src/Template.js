import React from 'react';
import Generator from "./components/Generator";
import './Main.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class Template extends React.Component {
    constructor () {
        super();
        this.state = {
            size: 0,
            type: 1,
            selected: {value: '', label: 'Select'},
            diagnoses: [],
            data: [{title: ''}],
            title: ''
        };
        this._onSelect = this._onSelect.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/student/diagnosis")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({diagnoses: jsonResponse})
            }).catch((err) => alert(err));
    }

    addGenerator = (type) => {
        this.setState({
            size: this.state.size + 1,
            type: type
        });
    };

    _onSelect (option) {
        //console.log('You selected ', option.value);
        this.setState({selected: option});
    };

    handleOnChange = (type) => (event) => {
        console.log(event.target.value);
        //this.setState({[type]: event.target.value});
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.data[0].title);
    };
    // Ucitel muze vytvorit nove generatory...vybere si jeden ze 3 typu (MIN/MAX, TEXT, IMAGE) podle toho mu to hodi form
    // Exam je zobrazeni pro studenta true-> buttonek v aplikaci pro zobrazení false-> zobrazení od začátku
    //Malus - smrt, bonus - body úspěchu a price jsou krajní hodnoty pro úspěch/neúspěch..
    // ucitel vytvori template, ten odesleme do template collection a z toho potom student dostane random pacienta
    // template se sklada z generatoru!!
    render() {
        const generators = [];
        const {title} = this.state.title;
        for (let i = 0; i < this.state.size; i += 1) {
            generators.push(<Generator type={this.state.type} title={title} handleChange={this.handleOnChange}/>);
        }
        const options = this.state.diagnoses;
        const defaultOption = this.state.selected;
        const selected = this.state.selected.value;
     //   const price = this.state.price;
        return (
        <div className="inlineP">
            <div>
            <h2>Create new template</h2>
            <div style={{display: 'inline-flex'}}>
                <p>diagnosis: </p>
                <div style={{marginLeft: '4%', fontSize: '1em'}}>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                </div>
            </div>
            <p style={{marginLeft: '20px'}}>maxMalus: </p>
            <input type={"text"}/>
            <p>maxBonus: </p>
            <input type={"text"}/>
            <p>maxPrice: </p>
            <input type={"text"}/>

            </div>
            <div>
                <p>add new generator: </p>
                <button onClick={() => this.addGenerator(1)}>Add generator1</button>
                <button onClick={() => this.addGenerator(2)}>Add generator2</button>
                <button onClick={() => this.addGenerator(3)}>Add generator3</button>
                <br></br>
                <br></br>
                <div>
                    {generators}
                </div>
            </div>
            <p>{selected}</p>
            <button>Submit</button>
        </div>
        );
    }
}