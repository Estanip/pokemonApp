import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Cards from '../../components/Cards/Cards';
import Card from '../../components/Card/Card';
import Loading from '../Loading/Loading';
import OrderBy from '../OrderBy/OrderBy';
import DbPokemons from '../DbPokemons/DbPokemons';
import AllPokemons from '../AllPokemons/AllPokemons';

import { toast } from 'react-toastify';

import './Pagination.css';


function Pagination({ pokemons }) {

    const [page, setPage] = useState(1);
    const [data, setData] = useState(pokemons);

    useEffect(() => {

        if (typeof pokemons === "number") {
            toast.info("Cargando Pokemons")
        } else {

            if (pokemons.length < 9) {
                setPage(1)
            }
            if (page === 1) {
                let pageOne = pokemons.slice(0, 9);
                setData(pageOne)
            }
            if (page === 2) {
                let pageTwo = pokemons.slice(9, 21);
                setData(pageTwo)
            }
            if (page === 3) {
                let pageThree = pokemons.slice(21, 33);
                setData(pageThree)
            }
            if (page === 4) {
                let pageFour = pokemons.slice(33, pokemons.length - 1);
                setData(pageFour)
            }
        }

    }, [page, pokemons])

    return (
        <div className='pagination-container'>
            <div className='btnPage__container'>
                <OrderBy />
                <div className='page__btn'>
                    {page === 1
                        ?
                        <button id="btnDisabled" onClick={() => setPage(page - 1)} disabled>PREVIOUS</button>
                        :
                        <button onClick={() => setPage(page - 1)}>PREVIOUS</button>
                    }

                    {page === 4
                        ?
                        <button id="btnDisabled" onClick={() => setPage(page + 1)} disabled>NEXT</button>
                        :
                        <button onClick={() => setPage(page + 1)}>NEXT</button>
                    }
                </div>

                <div className="btns-container">
                    <DbPokemons />
                    <AllPokemons />
                </div>


            </div>
            <div className='pagination__content'>
                {typeof data === "number"
                    ?

                    <Loading />

                    :
                    <Cards>
                        {data.map((e, i) => <Card key={i} id={e.id} name={e.name} image={e.image} types={e.types} force={e.attack} />)}
                    </Cards>
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

export default connect(mapStateToProps, null)(Pagination)