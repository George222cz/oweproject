import React from 'react';

export default class TemplateList extends React.Component {
    state = {
        templates: []
    };

    componentDidMount() {
        fetch("https://owe-kazu.herokuapp.com/api/rest/admin/template/list")
            .then((response) => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({templates: jsonResponse})
            }).catch((err) => console.error(err));
    }

    render() {
        return (
            <div>
                <div>
                    <table><tbody>
                        <tr style={{backgroundColor: '#5a5a5a'}}><td>ID</td><td>Diagnóza</td><td>MinBonus</td><td>MaxMalus</td><td>MaxPrice</td></tr>
                            { this.state.templates.map((item, key) => <tr key={key}>
                                <td>{item.id}</td><td>{item.diagnosis}</td><td>{item.minBonus}</td><td>{item.maxMalus}</td><td>{item.maxPrice}</td>
                            </tr>)}
                    </tbody></table>
                </div>
            </div>
        );
    }
}
