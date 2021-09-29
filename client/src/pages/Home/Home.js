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

                <Loading />

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