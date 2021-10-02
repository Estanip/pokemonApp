import React from 'react'
import { toast } from 'react-toastify'

export default function Loading() {
    return (
        <div className='loading-container'>
            <h2>{toast.info("Cargando Pokemons")}</h2>
        </div>
    )
}
