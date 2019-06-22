import React from 'react';

 const Diagnose = (props) => {
    return (

        <div>

            <label htmlFor={'diagnose'}>New diagnose: </label>
            <input type={"text"} name="diagnose" onChange={props.handleChange('definition')} id="diagnose" value={props.definition}/>
            <button onClick={props.handleSubmit}>Submit</button>
        </div>
    );
};

export default Diagnose;