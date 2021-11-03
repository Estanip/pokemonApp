import React, { useState, useEffect } from 'react';
import { getPokemons } from '../../actions/index';
import { connect } from 'react-redux';

import SearchByName from '../../components/SearchByName/SearchByName';
import SearchByType from '../../components/SearchByType/SearchByType';
import Pagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading/Loading';

import './Home.css';

function Home({ getPokemons, pokemons }) {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getData = async () => {
            await getPokemons();
            setLoading(false)
        }

        getData();

    }, []);

    return (
        <div className='home-container'>

            <div className="options-container">
                <SearchByName />
                <SearchByType />
            </div>

            <div className="render__container">
                {loading === true || pokemons[0] === null || pokemons.length === 0

                    ?
     
                    <div className="loading__container">
                          <Loading />
                    </div>   
                  

                    :

                    <Pagination />
                }
            </div>


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