function Output ({ match, countries })
{
  if (match > 10) return <div>Too many matches, specify another filter.</div>
  if (match > 1 && match < 11) return (
    <div>
      { countries.map((item) => (
        <div key={ item.cca2 }>{ item.name.common }</div>
      )) }
    </div>
  )
  if (match === 1) return (
    <div>
      <h1>{ countries[0].name.common }</h1>
      <div>
        <div>Capital { countries[0].capital[0] }</div>
        <div>Area { countries[0].area }</div>
      </div>

      <h1>Languages</h1>
      <div>
        <ul>
          { Object.keys(countries[0].languages).map((item) => (
            <li key={ item }>{ countries[0].languages[item] }</li>
          )) }
        </ul>
        <img src={ countries[0].flags.png } alt={ countries[0].flags.alt } />
      </div>
    </div>
  )
}

export default Output
