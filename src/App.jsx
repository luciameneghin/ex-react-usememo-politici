import { useState } from 'react';
import axios from 'axios';
import PoliticianCard from './components/PoliticianCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [politiciansData, setPoliticiansData] = useState([]);

  const fetchPoliticians = async () => {
    const endpoint = 'https://boolean-spec-frontend.vercel.app/freetestapi/politicians';
    try {
      const response = await axios.get(`${endpoint}?name=${searchTerm}`);
      const filteredResponse = response.data.filter((politician) => {
        const search = searchTerm.trim().toLowerCase();
        return (
          politician.name.toLowerCase().includes(search) ||
          politician.biography.toLowerCase().includes(search)
        )
      })
      setPoliticiansData(filteredResponse);
      console.log('Dati ricevuti:', response.data);
    } catch (error) {
      console.error('Errore nella fetch:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='container mx-auto my-5'>
      <h2 className='text-center'>Cerca il politico</h2>
      <div className="search-bar py-5 text-center d-flex justify-content-center">
        <input
          type="text"
          placeholder="Scrivi qualcosa sul politico che vuoi cercare..."
          value={searchTerm}
          onChange={handleChange}
          className='form-control w-50'
        />
        <button onClick={fetchPoliticians} className='btn btn-primary mx-3'>Cerca</button>
      </div>
      <div className='row'>
        {politiciansData.map(politician => (
          <PoliticianCard key={politician.id} politician={politician} />
        ))}
      </div>
    </div>
  );
};

export default App;



