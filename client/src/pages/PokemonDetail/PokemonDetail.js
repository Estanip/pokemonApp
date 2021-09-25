import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getPokemonById } from '../../actions';
import routes from '../../helpers/routes';


function PokemonDetail({ pokemon, getPokemonById }) {

    const {id} = useParams()

     console.log(id)

    useEffect(() => {

        const getPokemon = async () => {
            await getPokemonById(id)
        }

        getPokemon();

    }, [])

    return (
        <div>
            DETALLE DE POKEMON
            {pokemon.length !== 0 &&

                <div>
                    <h1>{pokemon.name}</h1>

                        <div>
                            <ul>
                                {pokemon.types.map(e => (
                                    <li>{e.type.name}</li>
                                )
                                )}
                            </ul>
                        </div>
    
                    <img src={pokemon.sprites.front_default}></img>
                    <h2>{pokemon.id}</h2>
                    <ul>
                        <li>Life: {pokemon.stats[0].base_stat}</li>
                        <li>Attack: {pokemon.stats[1].base_stat}</li>
                        <li>Defense: {pokemon.stats[2].base_stat}</li>
                        <li>Speed: {pokemon.stats[5].base_stat}</li>
                    </ul>
                    <ul>
                        <li>Height: {pokemon.height}</li>
                        <li>Weight: {pokemon.weight}</li>
                    </ul>
                </div>
            }

        <Link to={routes.home}>Return</Link>

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