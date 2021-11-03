import React from 'react';
import { Link } from 'react-router-dom';
import typeColors from '../../helpers/typeColors';
import './Card.css';

export default function Card(props) {

    const { id, name, image, types, force = [] } = props;

    const backType = {
        width: "80px",
        borderRadius: "20px",
        textAlign: "center",
        marginTop: "5px",
        textTransform: "uppercase",
        color: "#E8F3E2",
        fontSize: "13px",
        paddingTop: "4px",
        height: "30px"
    }

    const defaultImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png";

    return (

        <div className={`${types[0]}-container`}>

            <div className='Name__card'>
                <Link style={{ textDecoration: "none" }} to={`/pokemons/${id}`}>
                    <p className="title__name">{name}</p>
                </Link>
            </div>

            <div className='Img__card'>
                <img
                    src={image ? image : defaultImage}
                    onError={(e) => {
                        if (e.target.src.includes('undefined')) {
                            e.target.onerror = null;
                            e.target.src = defaultImage
                        } else if (e.target.src.includes('.jpeg')) {
                            e.target.onerror = null;
                            e.target.src = image.replace('jpeg', 'png')
                        }
                    }}
                    alt={name} />

            </div>

            <div className='Types__card'>
                {types.map(e => (<div style={{...backType, backgroundColor: typeColors[e]}} >
                    {e}
                </div>))}
            </div>

            <div className='Force__card'>
                <span className='force__title'>Force</span>
                <span className='force'>{force}</span>
            </div>

        </div>
    )
}
