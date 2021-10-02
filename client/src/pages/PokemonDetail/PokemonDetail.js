import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPokemonById } from '../../actions';
import routes from '../../helpers/routes';
import typeColors from '../../helpers/typeColors';
import './PokemonDetail.css';


function PokemonDetail({ pokemon, getPokemonById }) {

    const { id } = useParams();

    const defaultImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png";

    useEffect(() => {

        const getPokemon = async () => {
            await getPokemonById(id)
        }

        getPokemon();

    }, []);

    return (
        <div className="card-detailContainer">
            {pokemon.length === 0

                ?

                <div>
                    <h1>Cargando</h1>
                </div>

                :



                <div className='card-details'>

                    <div className='Name__card'>

                        <p>{pokemon.name}</p>

                        <h2>{pokemon.id}</h2>

                    </div>
                    <div className='Img__card'>
                        <img 
                        src={pokemon.image ? pokemon.image : defaultImage} 
                        alt={pokemon.name} 
                        src={pokemon.image ? pokemon.image : defaultImage } 
                        onError={(e) => {
                            if (e.target.src.includes('undefined')) {
                              e.target.onerror = null;
                              e.target.src = defaultImage
                            } else if (e.target.src.includes('.jpeg')) {
                              e.target.onerror = null;
                              e.target.src = pokemon.image.replace('jpeg', 'png')
                            }
                          }}
                        />

                    </div>

                    <div className='Types__card'>
                        {pokemon.types.map(e => (<div style={{ backgroundColor: typeColors[e] }} className='Type__card'>{e}</div>))}
                    </div>

                    <div className='Force__card'>
                        <p className='title'>Life</p>
                        <p>{pokemon.life}</p>
                        <p className='title'>Attack</p>
                        <p>{pokemon.attack}</p>

                        <p className='title'>Defense</p>
                        <p>{pokemon.defense}</p>
                        <p className='title'>Speed</p>
                        <p>{pokemon.speed}</p>
                        <p className='title'>Height</p>
                        <p>{pokemon.height}</p>
                        <p className='title'>Weight</p>
                        <p>{pokemon.weight}</p>

                    </div>



                    <Link to={routes.home}><button className='btn__detail'>Regresar</button></Link>

                </div>

            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonById: (id) => dispatch(getPokemonById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)