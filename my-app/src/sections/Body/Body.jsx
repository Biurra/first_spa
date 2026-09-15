import { useState, useRef } from 'react';
import kaguyadance from '../../assets/img/kaguyadance.gif';
import './body.css';

function Body() {

    return(
        <>
        <div className="body">
            <h1>body</h1>
            <div className="kaguya">
                <img src={kaguyadance} alt="kaguyita"></img>
            </div>
        </div>
        </>
    )
}

export default Body;