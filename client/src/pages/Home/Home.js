import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions/index';
import { connect } from 'react-redux';
import SearchBy from '../../components/SearchBy/SearchBy';
import OrderBy from '../../components/OrderBy/OrderBy';
import Pagination from '../../components/Pagination/Pagination';
import DbPokemons from '../../components/DbPokemons/DbPokemons';
import Loading from '../../components/Loading/Loading';
import './Home.css';
import CreateForm from '../../components/CreateForm/CreateForm';

function Home({ getPokemons, pokemons }) {

    const [loading, setLoading] = useState(false);

    
    const divGif = {
        width: "100%",
        height: "0",
        paddingBottom: "80%",
        position: "relative"
    }

    const gifStyle = {
        position: "absolute",
        width: "50px",
        height: "50px",
        frameBorder: "0"
    }


    useEffect(() => {

        const getData = async () => {
            await getPokemons();
            setLoading(false)
        }

        getData();

    }, []);

    return (
        <div className='home-container'>

            <div className='options__container'>
                <DbPokemons />
                <SearchBy />
                <OrderBy />
            </div>

            <CreateForm />

            {loading === true || pokemons[0] === null || pokemons.length === 0

                ?

                <div style={divGif}>
                <iframe src="https://giphy.com/embed/pq2pU6B2Ht3pu" style={gifStyle} className="giphy-embed" allowFullScreen />
                <p><a href="https://giphy.com/gifs/pokemon-japan-pikachu-pq2pU6B2Ht3pu"></a></p>
            </div>

                :

                <Pagination />
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        getPokemons: () => dispatch(getPokemons()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);