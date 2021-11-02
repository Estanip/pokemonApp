import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';
import './Landing.css';

export default function Landing() {

    return (
        <div className="landing-container">
            <div className='text__container'>
                <Link to={routes.home} style={{ textDecoration: 'none' }}><span>INGRESAR</span></Link>
            </div>
        </div>
    )
};