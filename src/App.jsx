import React, { useEffect, useMemo, useState } from 'react';
import PoliticianCard from './components/PoliticianCard';


const MemoPoliticianCard = React.memo(PoliticianCard)

const App = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');


  useEffect(() => {
    fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      .then(res => res.json())
      .then(data => { setPoliticians(data) })
      .catch(err => console.log(err))
  }, [])

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const findName = politician.name.toLowerCase().includes(searchTerm.toLowerCase());
      const findBiography = politician.biography.toLowerCase().includes(searchTerm.toLowerCase());
      const validPosition = selectedPosition === '' || politician.position === selectedPosition;
      return (findName || findBiography) && validPosition;
    }
    );
  }, [politicians, searchTerm, selectedPosition]);

  const positions = useMemo(() => {
    return politicians.reduce((acc, politician) => {
      if (!acc.includes(politician.position)) {
        return [...acc, politician.position];
      }
      return acc;
    }, []);
  }, [politicians]);

  return (
    <div className='container mx-auto my-5'>
      <h2 className='text-center'>Cerca il politico</h2>
      <div className="search-bar py-5 text-center d-flex justify-content-center">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='form-control w-50'
        />
        <select
          value={selectedPosition}
          onChange={e => setSelectedPosition(e.target.value)}
        >
          <option value="">Filtra per Posizizione politica</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>{position}</option>
          ))}
        </select>
        {/* <button onClick={fetchPoliticians} className='btn btn-primary mx-3'>Cerca</button> */}
      </div>
      <div className='row'>
        {filteredPoliticians.map(politician => (
          <MemoPoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  )
}

export default App


// const App = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [politiciansData, setPoliticiansData] = useState([]);

//   const fetchPoliticians = async () => {
//     const endpoint = 'https://boolean-spec-frontend.vercel.app/freetestapi/politicians';
//     try {
//       const response = await axios.get(`${endpoint}?name=${searchTerm}`);
//       const filteredResponse = response.data.filter((politician) => {
//         const search = searchTerm.trim().toLowerCase();
//         return (
//           politician.name.toLowerCase().includes(search) ||
//           politician.biography.toLowerCase().includes(search)
//         )
//       })
//       setPoliticiansData(filteredResponse);
//       console.log('Dati ricevuti:', response.data);
//     } catch (error) {
//       console.error('Errore nella fetch:', error);
//     }
//   };

//   return (
//     <div className='container mx-auto my-5'>
//       <h2 className='text-center'>Cerca il politico</h2>
//       <div className="search-bar py-5 text-center d-flex justify-content-center">
//         <input
//           type="text"
//           placeholder="Cerca per nome o biografia"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className='form-control w-50'
//         />
//         <button onClick={fetchPoliticians} className='btn btn-primary mx-3'>Cerca</button>
//       </div>
//       <div className='row'>
//         {politiciansData.map(politician => (
//           <PoliticianCard key={politician.id} politician={politician} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;



