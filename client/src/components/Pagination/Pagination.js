import React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Cards from '../../components/Cards/Cards';
import Card from '../../components/Card/Card';
import Loading from '../Loading/Loading';

import { toast } from 'react-toastify';

import './Pagination.css';

function Pagination({ pokemons }) {

    const [page, setPage] = useState(1);
    const [data, setData] = useState(pokemons);

    const divGif = {
        width: "100%",
        height: "0",
        paddingBottom: "80%",
        position: "relative"
    }

    const gifStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        frameBorder: "0"
    }

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
            <div className='btn__container'>

                <div className='page-btn'>
                    {page === 1
                        ?
                        <button id="btnDisabled" onClick={() => setPage(page - 1)} disabled>PREVIOUS</button>
                        :
                        <button onClick={() => setPage(page - 1)}>PREVIOUS</button>
                    }
                </div>

                <div className='page-btn'>
                    {page === 4
                        ?
                        <button id="btnDisabled" onClick={() => setPage(page + 1)} disabled>NEXT</button>
                        :
                        <button onClick={() => setPage(page + 1)}>NEXT</button>
                    }
                </div>
            </div>
            <div className='pagination__content'>
                {typeof data === "number"
                    ?

                    <div style={divGif}>
                        <iframe src="https://giphy.com/embed/pq2pU6B2Ht3pu" style={gifStyle} className="giphy-embed" allowFullScreen />
                        <p><a href="https://giphy.com/gifs/pokemon-japan-pikachu-pq2pU6B2Ht3pu">via GIPHY</a></p>
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