import React from 'react';
import Generators from "../components/Generator";
import '../Main.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class Template extends React.Component {
    constructor () {
        super();
        this.state = {
            size: 1,
            diagnoses: [],
            selected: {value: '', label: 'Select'},
            maxMalus: '',
            minBonus: '',
            maxPrice: '',
            data: [{id: 0, type: 1, title: '', exam: false, max: '', min: '', malus: '', bonus: '', price: '',text: ''}]
        };
        this._onSelect = this._onSelect.bind(this);
        //this.handleOnChange = this.handleOnChange.bind(this);
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
        this.setState((prevState) => ({
            data: [...prevState.data, {id: this.state.size,type: type, title:'', exam: false, max: '', min: '', malus: '', bonus: '', price: '', text:''}],
            size: this.state.size+1
        }));
    };

    _onSelect (option) {
        //console.log('You selected ', option.value);
        this.setState({selected: option});
    };

    handleFormSubmit = (e) => { e.preventDefault();};

    handleSubmit = (e) => {
        console.log(this.state);
        alert(JSON.stringify(this.state));
        //console.log(this.state.data);
    };

    handleChange = (e) => {
        if (["title", "text", "max", "min","malus","bonus","price"].includes(e.target.className) ) {
            let data = [...this.state.data];
            data[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ data })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    };

    handleSwitch = (item) => (e) => {
        let data = [...this.state.data];
        data[item.id].exam = !item.exam;
        this.forceUpdate();
    };

    render() {
        const {data} = this.state;
        const options = this.state.diagnoses;
        const defaultOption = this.state.selected;
        return (
        <div className="inlineP">
            <form onSubmit={this.handleFormSubmit} onChange={this.handleChange} >
                <div>
                    <h2>Create new template</h2>
                    <div style={{display: 'inline-flex'}}>
                        <p>diagnosis: </p>
                        <div style={{marginLeft: '4%', fontSize: '1em'}}>
                        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                        </div>
                    </div>
                    <p style={{marginLeft: '20px'}}>maxMalus: </p>
                    <input type={"text"} name="maxMalus" id="maxMalus" value={data.maxMalus}/>
                    <p>minBonus: </p>
                    <input type={"text"} name="minBonus" id="minBonus" value={data.minBonus}/>
                    <p>maxPrice: </p>
                    <input type={"text"} name="maxPrice" id="maxPrice" value={data.maxPrice}/>
                </div>
                <div>
                    <p>add new generator: </p>
                    <button onClick={() => this.addGenerator(1)}>Add generator1</button>
                    <button onClick={() => this.addGenerator(2)}>Add generator2</button>
                    <button onClick={() => this.addGenerator(3)}>Add generator3</button>
                    <br></br>
                    <br></br>
                    <div>
                        <Generators data={data} handleSwitch={this.handleSwitch}/>
                    </div>
                </div>
                <p>{defaultOption.value}</p>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        </div>
        );
    }
}