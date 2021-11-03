import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../helpers/routes'
import './CreateForm.css';

export default function CreateForm() {
    return (
        <div className='btn-form'>
            <Link to={routes.form}><button className="create__btn" >Create Pokemon</button></Link>
        </div>
    )
}
