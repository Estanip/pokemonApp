import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'

export default function Card(props) {

    const { id, name, image, types, weight = [] } = props;   
    
    return (

        <div className='card'>

            <img className='img'
                src={image}
                alt={name}
            />

            <div >
                <Link to={`/pokemons/${id}`}>
                    <p>{name}</p>
                </Link>
                <div>
                    <p >{}</p>
                </div>
            </div>
            <p>{weight}</p>
            <ul>
                {types.map(e => (<li>{e}</li>))}
            </ul>
        </div>
    )
}
