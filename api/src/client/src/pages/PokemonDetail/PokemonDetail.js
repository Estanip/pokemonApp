import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPokemonById } from '../../actions';
import routes from '../../helpers/routes';
import typeColors from '../../helpers/typeColors';
import './PokemonDetail.css';


function PokemonDetail({ pokemon, getPokemonById }) {

    const { id } = useParams();

    const backType = {
        width: "160px",
        borderRadius: "20px",
        textAlign: "center",
        marginTop: "5px",
        marginBottom: "10px",
        textTransform: "uppercase",
        color: "#E8F3E2",
        fontSize: "13px",
        paddingTop: "4px",
        height: "30px"
    }

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

                <div id="loading-bar-spinner" className="spinner">
                    <div
                        className="spinner-icon">
                    </div>
                </div>

                :

                <div className={`${pokemon.types[0]}-containerDetail`}>

                    <div className='Name__cardDetail'>
                        <h2>{pokemon.name}</h2>
                    </div>

                    <div className='Img__cardDetail'>
                        <img
                            src={pokemon.image ? pokemon.image : defaultImage}
                            onError={(e) => {
                                if (e.target.src.includes('undefined')) {
                                    e.target.onerror = null;
                                    e.target.src = defaultImage
                                } else if (e.target.src.includes('.jpeg')) {
                                    e.target.onerror = null;
                                    e.target.src = pokemon.image.replace('jpeg', 'png')
                                }
                            }}
                            alt={pokemon.name} />

                    </div>

                    <div className='Types__cardDetail'>
                        {pokemon.types.map(e => (<div style={{ ...backType, backgroundColor: typeColors[e] }} >
                            {e}
                        </div>))}
                    </div>


                    <div className='Stats-containerDetail'>

                        <div className='stat__div'>
                            <p className='stat__title'>Life</p>
                            <p className='stat'>{pokemon.life}</p>
                        </div>

                        <div>
                            <p className='stat__title'>Attack</p>
                            <p className='stat'>{pokemon.attack}</p>
                        </div>

                        <div>
                            <p className='stat__title'>Defense</p>
                            <p className='stat'>{pokemon.defense}</p>
                        </div>

                        <div>
                            <p className='stat__title'>Speed</p>
                            <p className='stat'>{pokemon.speed}</p>
                        </div>

                        <div>
                            <p className='stat__title'>Height</p>
                            <p className='stat'>{pokemon.height}</p>
                        </div>

                        <div>
                            <p className='stat__title'>Weight</p>
                            <p className='stat'>{pokemon.weight}</p>
                        </div>
                    </div>

                    <div className="btn-containerDetail">
                        <Link to={routes.home}><button>Regresar</button></Link>
                    </div>
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