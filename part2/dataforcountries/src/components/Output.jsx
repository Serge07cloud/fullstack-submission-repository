import CountryList from "./CountryList"
import CountryDetails from "./CountryDetails"

function Output ({ match, countries, handleClick })
{
  if (match > 10) return <div>Too many matches, specify another filter.</div>
  if (match > 1 && match < 11) return <CountryList countries={ countries } handleClick={ handleClick } />
  if (match === 1) return <CountryDetails countries={ countries } />
}

export default Output
