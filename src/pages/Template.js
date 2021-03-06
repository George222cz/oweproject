import React from 'react';
import Generators from "../components/Generator";
import '../Main.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class Template extends React.Component {
    constructor () {
        super();
        this.state = {
            size: 0,
            diagnoses: [],
            selected: {value: '', label: 'Select'},
            maxMalus: '',
            minBonus: '',
            maxPrice: '',
            data: [{id: 0, type: 0, title: '', exam: false, max: '', min: '', malus: null, bonus: null, price: null,text: ''}]
        };
        this._onSelect = this._onSelect.bind(this);
    }

    getJson = () => {
        const state = this.state;
        let template = '{"diagnosis": "'+state.selected.value+'", "minBonus": '+state.minBonus+', "maxMalus": '+state.maxMalus+', "maxPrice": '+state.maxPrice+', ';
        let data = '"generators": [';
        for(let i = 0; i<state.size; i += 1){
            data += '{ "title": "'+state.data[i].title+'",';
            if(state.data[i].exam){
                // what is show????????????????????????????????
                data += '"exam": true, "show": false, "malus": '+state.data[i].malus+', "bonus": '+state.data[i].bonus+', "price": '+state.data[i].price+',';
            }
            if(state.data[i].type===1){
                let text = state.data[i].text.replace(new RegExp(';', 'g'), '","');
                data += '"text": ["'+text+'"] }';
            }
            if(state.data[i].type===2){
                data += '"min": '+state.data[i].min+', "max": '+state.data[i].max+'}';
            }
            if(i<state.size-1){
                data += ',';
            }
        }
        data += ']';
        template += data+'}';
        return template;
    };

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/student/diagnosis")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({diagnoses: jsonResponse})
            }).catch((err) => alert(err));
    }

    addGenerator = (type) => {
        if(this.state.size===0){
            this.state.data[0].type = type;
            this.setState({size: 1});
        }else {
            this.setState((prevState) => ({
                data: [...prevState.data, {
                    id: this.state.size,
                    type: type,
                    title: '',
                    exam: false,
                    max: '',
                    min: '',
                    malus: '',
                    bonus: '',
                    price: '',
                    text: ''
                }],
                size: this.state.size + 1
            }));
        }
    };

    _onSelect (option) {
        this.setState({selected: option});
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.selected.value!=='' && this.state.size!==0){
            let body = this.getJson();
        //    alert(body);
            /*    fetch("https://owe-kazu.herokuapp.com/api/rest/admin/template", {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: body,
                }).catch((e) => console.log(e));*/
            this.props.history.push('/teacher')
        }else{
            alert("Vyplňte prosím celý formulář");
        }
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

    handleBack = (e) => {
        this.props.history.push('/teacher');
    };

    render() {
        const {data} = this.state;
        return (
        <div className="inlineP">
            <form onSubmit={this.handleFormSubmit} onChange={this.handleChange} >
                <div>
                    <h2>Vytvořit nové schéma</h2>
                    <div style={{display: 'inline-flex'}}>
                        <p>Diagnóza: </p>
                        <div style={{marginLeft: '4%', fontSize: '1em'}}>
                        <Dropdown options={this.state.diagnoses} onChange={this._onSelect} value={this.state.selected} placeholder="Select an option" />
                        </div>
                    </div>
                    <p style={{marginLeft: '20px'}}>maxMalus: </p>
                    <input type={"number"} name="maxMalus" id="maxMalus" value={this.state.maxMalus} required/>
                    <p>minBonus: </p>
                    <input type={"number"} name="minBonus" id="minBonus" value={this.state.minBonus} required/>
                    <p>maxPrice: </p>
                    <input type={"number"} name="maxPrice" id="maxPrice" value={this.state.maxPrice} required/>
                </div>
                <div>
                    <p>Přidat generátor: </p>
                    <button onClick={() => this.addGenerator(1)}>Textový generátor</button>
                    <button onClick={() => this.addGenerator(2)}>Min/Max generátor</button>
                    <button onClick={() => this.addGenerator(3)} disabled>Obrázkový generátor (WIP)</button>
                    <br></br>
                    <br></br>
                    <div>{ (this.state.size!==0) &&
                        <Generators data={data} handleSwitch={this.handleSwitch}/>}
                    </div>
                </div>
                <button onClick={this.handleBack}>Zpět</button>
                <input type="submit" value={"Odeslat"}/>
            </form>
        </div>
        );
    }
}