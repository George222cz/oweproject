import React from 'react';

 const Diagnose = (props) => {
    return (

        <div>

            <label htmlFor={'diagnose'}>Nová diagnóza: </label>
            <input type={"text"} name="diagnose" onChange={props.handleChange('definition')} id="diagnose" value={props.definition}/>
            <button onClick={props.handleSubmit}>Odeslat</button>
        </div>
    );
};

export default Diagnose;