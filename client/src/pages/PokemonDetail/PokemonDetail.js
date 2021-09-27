import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPokemonById } from '../../actions';
import routes from '../../helpers/routes';


function PokemonDetail({ pokemon, getPokemonById }) {

    const {id} = useParams();

    useEffect(() => {

        const getPokemon = async () => {
            await getPokemonById(id)
        }

        getPokemon();

    }, []);

    return (
        <div>
            DETALLE DE POKEMON
            {pokemon.length !== 0 &&

                <div>
                    <h1>{pokemon.name}</h1>

                        <div>
                            <ul>
                                {pokemon.types.map(e => (
                                    <li>{e}</li>
                                )
                                )}
                            </ul>
                        </div>
    
                    <img src={pokemon.image}></img>
                    <h2>{pokemon.id}</h2>
                    <ul>
                        <li>Life: {pokemon.life}</li>
                        <li>Attack: {pokemon.attack}</li>
                        <li>Defense: {pokemon.defense}</li>
                        <li>Speed: {pokemon.speed}</li>
                    </ul>
                    <ul>
                        <li>Height: {pokemon.height}</li>
                        <li>Weight: {pokemon.weight}</li>
                    </ul>
                </div>
            }

        <Link to={routes.home}>Volver</Link>

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