import React from 'react';
import './Cards.css';

export default function Cards({ children }) {
    return (
        <div className='cards-container'>
            {children}
        </div>
    )
}
