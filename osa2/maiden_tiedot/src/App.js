import React, { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  console.log(countries)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input
        value={filter}
        onChange={handleFilterChange}
      />
      <Display countries={countries} filter={filter} />
    </div>
  )
}

const Display = (props) => {
  let filteredCountries = props.countries.filter(country => country.name.common.toLowerCase().includes(props.filter))
  console.log('amount of filtered countries is ', filteredCountries.length)

  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } if (filteredCountries.length === 1) {
    let country = filteredCountries[0]

    console.log(country)
    console.log(country.languages)
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>population seems no longer to be an available info on this restapi?:) </p>
        <h3>languages</h3>
        <ul>
        {Object.values(country.languages).map((country, i) =>
            <li key={i}>
              {country}
            </li>
          )}
        </ul>
        <br></br>
        <img src={country.flags[0]} alt="flag" height="140" width="220"/>
        
      </div>
    )
  } else {
    return (
      <div>
        {filteredCountries.map((country, i) => <p key={i}>{country.name.common}</p>)}
      </div>
    )
  }
}

export default App;
