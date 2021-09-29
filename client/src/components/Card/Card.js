import React from 'react';
import { Link } from 'react-router-dom';
import typeColors from '../../helpers/typeColors';
import './Card.css'

export default function Card(props) {

    const { id, name, image, types, force = [] } = props;

    return (


        <div className='card-container'>

            <div className='Img__card'>
                <img src={image ? image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"} alt={name} />

            </div>

            <div className='Name__card'>
                <Link to={`/pokemons/${id}`}>
                    <p>{name}</p>
                </Link>
            </div>

            <div className='Types__card'>
                {types.map(e => (<div style={{ backgroundColor: typeColors[e] }} className='Type__card'>{e}</div>))}
            </div>

            <div className='Force__card'>
                <p className='title'>Force</p>
                <p>{force}</p>
            </div>

        </div>
    )
}
