import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';

export default function Landing() {

    return (
        <div>
            <h1>Bienvenido a PokeApp!</h1>
            <Link to={routes.home}>Ingrese por aqui</Link>
        </div>
    )
};