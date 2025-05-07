function CountryList ({ countries, handleClick })
{
  return <div>
    { countries.map((item) => (
      <div key={ item.cca2 }>
        { item.name.common + ' ' }
        <button type="button" onClick={ () => handleClick(item.name.common) }>Show</button>
      </div>
    )) }
  </div>
}

export default CountryList
