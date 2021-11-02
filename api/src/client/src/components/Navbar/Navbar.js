import React from 'react';
import { useLocation } from 'react-router-dom'

import CreateForm from '../CreateForm/CreateForm';

import './Navbar.css';

export default function Navbar() {

    let useLoc = useLocation();
    let path = useLoc.pathname

    return (

        <div className="Navbar">
            <div></div>
            <div className="title__container">
                <h2>{path === "/form" ? "CREATE POKEMON" : "POKEMON APP"}</h2>
            </div>
            {path === "/form"

                ?

                <div> </div>

                :

                <div className="btn__create__container">
                    <CreateForm />
                </div>

            }

        </div>



    )
}
