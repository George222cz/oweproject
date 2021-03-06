import React from 'react';
import Property from "../Property";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class Student extends React.Component {
    constructor () {
        super();
        this.state = {
            patient: {},
            diagnoses: [],
            selected: {value: '', label: 'Select'},
            bonus: 0,
            malus: 0,
            price: 0,
        };
        this._onSelect = this._onSelect.bind(this);
    }

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/student")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({patient: jsonResponse})
            }).catch((err) => console.error(err));
        fetch("https://owe-kazu.herokuapp.com/api/rest/student/diagnosis")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({diagnoses: jsonResponse})
            }).catch((err) => alert(err));
    }

    _onSelect (option) {
        this.setState({selected: option});
    };

    handleExam = (item) => {
        let state = this.state;
        item.exam = false;
        if(item.bonus!==undefined){
            state.bonus += item.bonus;
        }
        if(item.malus!==undefined){
            state.malus += item.malus;
        }
        if(item.price!==undefined){
            state.price += item.price;
        }
        this.forceUpdate();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let state = this.state;
        if(state.selected.value===''){
            alert('vyplňte diagnozu');
        }else {
            if (state.bonus < state.patient.minBonus || state.malus > state.patient.maxMalus || state.price > state.patient.maxPrice) {
                alert("smůla");
            }
            let body = '{"diagnosis": "' + state.selected.value + '", "exams": ["' + state.patient.templateId + '"]}';
            fetch("https://owe-kazu.herokuapp.com/api/rest/student/"+state.patient.id, {
            method: 'post',
            headers: {
                "Content-type": "application/json",
            },
            body: body,
            }).catch((e) => console.log(e));
            this.props.history.push('/');
            //alert(body);
        }
    };

    handleBack = (e) => {
        this.props.history.push('/');
    };

    render() {
        const {patient} = this.state;

        if (!patient.properties){
            return <div>loading</div>
        }

        return (
            <div>
                <div>
                    <h2>Student</h2>
                    <div style={{backgroundColor: '#5a5a5a'}}>
                        <div>
                            <p>minBonus: {this.state.bonus}/{patient.minBonus}</p><p>maxMalus: {this.state.malus}/{patient.maxMalus}</p><p>maxPrice: {this.state.price}/{patient.maxPrice}</p>
                        </div>
                        <div>
                            <p>diagnoza:</p>
                            <Dropdown options={this.state.diagnoses} onChange={this._onSelect} value={this.state.selected} placeholder="Select an option" />
                            <button onClick={this.handleBack}>Zpět</button>
                            <button onClick={this.handleSubmit}>Odeslat</button>
                        </div>
                    </div>
                    {patient.properties.map((item) =>
                        <div>
                            {(!item.exam) &&
                                <Property title = {item.title} text={item.text} />
                            }
                            {(item.exam) &&
                                <div>
                                    <p>Titulek: {item.title}</p>
                                    <button onClick={() => this.handleExam(item)}>???</button>
                                    <hr color="red" align="center" />
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Student;