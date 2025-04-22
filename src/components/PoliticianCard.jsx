import React from "react";

const PoliticianCard = ({ politician }) => {
  console.log('Card');

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
      <div className="card h-100 py-3">
        <h2 className='card-title text-center'>{politician.name}</h2>
        <div className='card-body'>
          <img src={politician.image} alt={politician.name} className='img-fluid d-block mx-auto pb-3' />
          <p>{politician.position}</p>
          <p>{politician.biography}</p>
        </div>
      </div>
    </div>
  );
};


export default PoliticianCard;