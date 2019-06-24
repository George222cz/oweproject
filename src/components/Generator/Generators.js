import React from "react"
import Switch from "react-switch";

const Generators = (props) => {
    return (
        props.data.map((item)=> {
            let idx = item.id;
            let titleId = `title-${idx}`, textId = `text-${idx}`, minId = `min-${idx}`, maxId = `max-${idx}`;
            let malusId = `malus-${idx}`, bonusId = `bonus-${idx}`, priceId = `price-${idx}`;
            return (
                <div key={idx}>
                <div style={{backgroundColor: '#5a5a5a'}}>
                    <label htmlFor={titleId}>Titulek: </label>
                    <input type="text" name={titleId} data-id={idx} id={titleId} value={item.title} className="title" required/>
                    {(item.type === 1) &&
                    <div>
                        <label htmlFor={textId}>Text: </label>
                        <input type="text" name={textId} data-id={idx} id={textId} value={item.text} className="text" placeholder={"Použijte ';' pro rozdělení"}/>
                    </div>
                    }
                    {(item.type === 2) &&
                    <div>
                        <label htmlFor={minId}>Min: </label>
                        <input type="number" name={minId} data-id={idx} id={minId} value={item.min} className="min" min={0} required/>
                        <label htmlFor={maxId}>Max: </label>
                        <input type="number" name={maxId} data-id={idx} id={maxId} value={item.max} className="max" min={0} required/>
                    </div>
                    }
                    {(item.type === 3) &&
                    <div>
                        <p>Images: </p>
                    </div>
                    }
                    <label htmlFor={'exam'}>Zkouška: </label>
                    <Switch onChange={props.handleSwitch(item)} id={'exam'} checked={item.exam}/>
                    {(item.exam) &&
                    <div>
                        <label htmlFor={malusId}>Malus: </label>
                        <input type="number" name={malusId} data-id={idx} id={malusId} value={item.malus} className="malus" min={0}/>
                        <label htmlFor={bonusId}>Bonus: </label>
                        <input type="number" name={bonusId} data-id={idx} id={bonusId} value={item.bonus} className="bonus" min={0}/>
                        <label htmlFor={priceId}>Price: </label>
                        <input type="number" name={priceId} data-id={idx} id={priceId} value={item.price} className="price" min={0}/>
                    </div>
                    }
                </div>
                    <br></br>
                </div>
            )
        })
    )
};
export default Generators