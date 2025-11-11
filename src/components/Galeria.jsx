import useFetch from '../useFetch'

const Galeria = () => {

  const { data, loading, error } = useFetch('https://api.thecatapi.com/v1/images/search?limit=9')

  return (
    <>
      <div className='galeriaGatos'>
        <ul className='listaSinPuntos'>
          {error && <li id='error'>Error: {error}</li>}
          {loading && <li id='loadingData'>Loading data...</li>}
          {data?.slice(0, 9).map((gato) => {
            return (
              <li key={gato.id}>
                <img src={gato.url} alt="gato"/>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Galeria
