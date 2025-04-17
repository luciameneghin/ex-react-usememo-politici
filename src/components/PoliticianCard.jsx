import axios from 'axios';
import { useState, useEffect } from 'react';

const PoliticiansCard = ({ politicians }) => {
  console.log('Dati ricevuti:', politicians);

  if (!politicians || politicians.length === 0) {
    return <p className='text-center text-danger'>Nessun Politico trovato...</p>;
  }

  return (
    <div className='container'>
      <div className="politician-list row">
        {politicians.map((politician) => (
          <div key={politician.id} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
            <div className="card h-100 py-3">
              <h2 className='card-title text-center'>{politician.name}</h2>
              <div className='card-body'>
                <img src={politician.image} alt={politician.name} className='img-fluid d-block mx-auto pb-3' />
                <p>{politician.position}</p>
                <p>{politician.biography}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PoliticiansCard
