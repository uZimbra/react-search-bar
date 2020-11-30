import React, { useEffect, useState } from 'react';
import axios from 'axios';





function App() {

  const [initialData, setInitialData] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function countriesData() {
      const apiData = await axios.get('https://restcountries.eu/rest/v2/all');

      const data = apiData.data.map(country => ({ name: country.name, initials: country.alpha2code }));

      setCountries(data);
      setInitialData(data);
    }
    countriesData();
  }, []);

  function handleSearchChange(event) {
    const newData = initialData.filter(country => country.name.toLowerCase().match(event.target.value.toLowerCase()))

    setCountries(newData);
  }


  return (
    <>
      <input type="text" onChange={(e) => handleSearchChange(e)}/>
      {countries.map(
        country => (<p key={country.initials}>{country.name}</p>)
      )}
    </>
  );
}

export default App;
