import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';

export default function Landing() {
    return (
        <div>
            <h1>Landing</h1>
            <Link to={routes.home} >Home</Link>
        </div>
    )
}
