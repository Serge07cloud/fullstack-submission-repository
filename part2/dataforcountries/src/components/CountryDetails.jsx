import Weather from './Weather'

function CountryDetails ({ countries })
{

  const country = countries[0]

  return (
    <div>
      <h1>{ country.name.common }</h1>
      <div>
        <div>Capital { country.capital[0] }</div>
        <div>Area { country.area }</div>
      </div>

      <h1>Languages</h1>
      <div>
        <ul>
          { Object.keys(country.languages).map((item) => (
            <li key={ item }>{ country.languages[item] }</li>
          )) }
        </ul>
        <img src={ country.flags.png } alt={ country.flags.alt } />
      </div>

      <Weather country={ country.name.common } />
    </div>
  )
}

export default CountryDetails
