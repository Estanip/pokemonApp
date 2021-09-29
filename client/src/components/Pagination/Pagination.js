import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cards from '../../components/Cards/Cards';
import Card from '../../components/Card/Card';
import './Pagination.css';

function Pagination({ pokemons }) {

    const [page, setPage] = useState(1);
    const [data, setData] = useState(pokemons);
    const [message, setMessage] = useState("");

    useEffect(() => {

        if (typeof pokemons === "number") {
            setMessage("Cargando...")
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

        setTimeout(() => {
            setMessage("")
        }, 4000);


    }, [page, pokemons])

    return (
        <div className='pagination-container'>
            <div className='btn__container'>
                {page === 1
                    ?
                    <div className='page-btn'>
                        <button onClick={() => setPage(page - 1)} disabled >PREVIOUS</button>
                    </div>
                    :
                    <div className='page-btn'>
                        <button onClick={() => setPage(page - 1)}>PREVIOUS</button>
                    </div>
                }
                {page === 4
                    ?
                    <div className='page-btn'>
                        <button onClick={() => setPage(page + 1)} disabled>NEXT</button>
                    </div>
                    :
                    <div className='page-btn'>
                        <button onClick={() => setPage(page + 1)} >NEXT</button>
                    </div>
                }
            </div>
            <div className='pagination__content'>
                {typeof data === "number" || message !== ""
                    ?
                    <div className='message__container'>
                        <h2>{message}</h2>
                    </div>
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