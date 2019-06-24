import React from 'react';
import {Link} from "react-router-dom";
import Diagnose from "../components/Diagnose";
import TemplateList from "../components/TemplateList";

export default class Teacher extends React.Component {
    // Ucitel muze vytvorit nove generatory...vybere si jeden ze 3 typu (MIN/MAX, TEXT, IMAGE) podle toho mu to hodi form
    // Exam je zobrazeni pro studenta true-> buttonek v aplikaci pro zobrazení false-> zobrazení od začátku
    //Malus - smrt, bonus - body úspěchu a price jsou krajní hodnoty pro úspěch/neúspěch..
    // ucitel vytvori template, ten odesleme do template collection a z toho potom student dostane random pacienta
    // template se sklada z generatoru!!

    constructor() {
        super();
        this.state = {
            diagnoses: [{id: '', definition: ''}],
            cases: []
        };
        this.diagnose = {
            definition: ''
        }
    }

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/admin/codelist/diagnosis")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({diagnoses: jsonResponse})
            }).catch((err) => alert(err));

        fetch("https://owe-kazu.herokuapp.com/api/rest/student/list")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({cases: jsonResponse})
            }).catch((err) => alert(err));
    }

    handleSetDiagnose = (type) => (event) => {
        this.diagnose.definition = event.target.value;
        this.forceUpdate();
    };

    handleSubmitDiagnose = () => {
        if(this.diagnose.definition!=='') {
            fetch("https://owe-kazu.herokuapp.com/api/rest/admin/codelist/diagnosis", {
                method: 'post',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(this.diagnose),
            }).catch((e) => console.log(e));
            this.diagnose.definition = '';
            this.forceUpdate();
        }else{
            alert("Vyplňte pole");
        }
    };

    handleEdit = (item) => (e) => {
        let edit = prompt("Upravte:", item.definition);
        if(edit!=null){
            let body = '{"definition": "'+edit+'"}';
            fetch("https://owe-kazu.herokuapp.com/api/rest/admin/codelist/diagnosis/"+item.id, {
                method: 'put',
                headers: {
                    "Content-type": "application/json",
                },
                body: body,
            }).catch((e) => console.log(e));
            item.definition = edit;
            this.forceUpdate();
        }
    };

    render() {
        return (
            <div>
                <h2>Učitel</h2>
                <div style={{backgroundColor: '#5a5a5a'}}>
                    <Link to={'/template'} className={'Button'}>Vytvořit nové schéma</Link>
                </div>
                <div style={{display: 'inline-flex'}}>
                <div>
                    <div>
                    <Diagnose definition={this.diagnose.definition} handleChange={this.handleSetDiagnose} handleSubmit={this.handleSubmitDiagnose}/>
                        <table style={{minWidth: '100%'}}><tbody>
                            <tr style={{backgroundColor: '#5a5a5a'}}><td>Diagnóza</td><td>✎</td></tr>
                            { this.state.diagnoses.map((item,key) => <tr key={key}><td>{item.definition}</td><td><button onClick={this.handleEdit(item)}>✎</button></td></tr>)}
                        </tbody></table>
                    </div>
                </div>
                <div style={{marginLeft: '10px'}}>
                    <label htmlFor={'diagnose'}>Seznam schémat: </label>
                    <TemplateList/>
                    <div>
                        <table><tbody>
                            { this.state.cases.map((item,key) => <tr key={key}><td>{item.definition}</td></tr>)}
                        </tbody></table>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}