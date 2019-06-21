import React from 'react';
import Template from '../Template';

export default class Teacher extends React.Component {
    // Ucitel muze vytvorit nove generatory...vybere si jeden ze 3 typu (MIN/MAX, TEXT, IMAGE) podle toho mu to hodi form
    // Exam je zobrazeni pro studenta true-> buttonek v aplikaci pro zobrazení false-> zobrazení od začátku
    //Malus - smrt, bonus - body úspěchu a price jsou krajní hodnoty pro úspěch/neúspěch..
    // ucitel vytvori template, ten odesleme do template collection a z toho potom student dostane random pacienta
    // template se sklada z generatoru!!
    render() {
        return (
            <div>
                <h1>Teacher</h1>
                <Template/>
            </div>

        );
    }
}