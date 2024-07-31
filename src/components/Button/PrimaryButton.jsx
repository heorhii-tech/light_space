import React from 'react'
import './Button.css'
import {Link} from "react-router-dom";

const PrimaryButton = (props) => {
    return (
        <button type="button" className="primary-button button">
            <Link to={props.link}>{props.text}</Link>
        </button>
    )
}
export default PrimaryButton
