import { useState, useEffect } from "react";
import axios from "axios";
import Output from "./components/Output";
import restCountry from "./services/restCountry";

function App ()
{
  const [value, setValue] = useState('');
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState(null);

  useEffect(() =>
  {
    restCountry.getAll().then((response) => setCountries(response));
  }, []);

  const handleChange = (event) => setValue(event.target.value);

  const countriesToShow = country
    ? countries.filter((item) =>
      item.name.common.toLowerCase().includes(country.toLowerCase())
    )
    : countries;

  const totalMatch = country && countries ? countriesToShow.length : 0;

  const performQuery = (event) =>
  {
    event.preventDefault();
    setCountry(value);
  };

  const viewDetails = (countryName) => setCountry(countryName)

  if (!countries) return <div>Please wait...</div>;
  return (
    <>
      <form method="GET" onSubmit={ performQuery }>
        find countries{ " " }
        <input
          type="search"
          name="search_value"
          value={ value }
          onChange={ handleChange }
          id="search_value"
        />
      </form>
      <Output match={ totalMatch } countries={ countriesToShow } handleClick={ viewDetails } />
    </>
  );
}

export default App;
