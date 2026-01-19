import { useState, useEffect } from 'react'

import { FaRegHeart, FaHeart } from "react-icons/fa";

const Galeria = () => {

  const URL = 'https://api.thecatapi.com/v1/images/search?limit=9'

  // ESTADOS

  // Inicializamos el useState que guarda los datos de los gatos:
  // - Si hay datos en localStorage se parsean y se guardan en gatos
  // - Si no hay se guarda en gatos una array vacía: []
  const [gatos, setGatos] = useState(() => {
    return JSON.parse(localStorage.getItem('listaGatos')) || []
  })

  // Inicializamos el useState que guarda los datos de los gatos favoritos:
  // - Si hay datos en localStorage se parsean y se guardan en favoritos
  // - Si no hay se guarda en favoritos una array vacía: []
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem('listaFavoritos')) || []
  })

  // Estados para guardar mensajes de loading y error en caso de que sean necesarios
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // MODIFICA LOCALSTORAGE

  // Cuando se modifique la información de gatos, se actualiza su información en localStorage
  useEffect(() => {
    localStorage.setItem('listaGatos', JSON.stringify(gatos))
  }, [gatos])

  // Cuando se modifique la información de favoritos, se actualiza su información en localStorage
  useEffect(() => {
    localStorage.setItem('listaFavoritos', JSON.stringify(favoritos))
  }, [favoritos])


  // FETCH GENÉRICO

  // Función para traer 9 imagenes aleatorias de la API
  const fetchGatos = async () => {
    if (loading) return []

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(URL, { cache: 'no-store' })
      if (!response.ok) throw new Error('Error al cargar los gatos')

      const data = await response.json()
      return data

    } catch (err) {
      setError(err.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  // CARGA INICIAL (solo si no hay gatos)
  // - Si gatos no está vacía no se hace nada
  // - Si gatos está vacía, se traen 9 imagenes con fecthGatos
  useEffect(() => {
    if (gatos.length > 0) return

    const cargarInicial = async () => {
      const nuevos = await fetchGatos()
      setGatos(nuevos.slice(0, 9).map(g => ({...g, liked: favoritos.some(f => f.id === g.id)})))
    }
    cargarInicial()
  }, []) // solo al montar

  // VER MÁS (APPEND)
  // Función para traer 9 imagenes más y añadirlas a gatos
  const verMasGatos = async () => {
    const nuevos = await fetchGatos()

    setGatos(prev => [
      ...prev,
      ...nuevos
        .slice(0, 9)
        .filter(nuevo => !prev.some(g => g.id === nuevo.id))
        .map(g => ({
          ...g,
          liked: favoritos.some(f => f.id === g.id)
        }))
    ])
  }

  // RENOVAR GALERÍA (REPLACE)
  // Función que trae 9 gatos nuevos remplaza los que había en gatos por estos
  const renovarGaleria = async () => {
    const nuevos = await fetchGatos()

    setGatos(
      nuevos.slice(0, 9).map(g => ({
        ...g,
        liked: favoritos.some(f => f.id === g.id)
      }))
    )
  }


  // TOGGLES

  const toggleHeart = (identificador) => {
    const gatoObject = gatos.find((gato) => gato.id === identificador)
    const nuevoValor = !gatoObject.liked
    setGatos(prevGatos =>
      prevGatos.map(gato =>
        gato.id === identificador
          ? { ...gato, liked: !gato.liked }
          : gato
      )
    )
    toggleFavoritos(gatoObject, nuevoValor)
  }

  const toggleFavoritos = (gatoObject, nuevoValor) => {
    nuevoValor ? setFavoritos([...favoritos, {id:gatoObject.id, url:gatoObject.url}]) : setFavoritos(favoritos.filter(obj => obj.id !== gatoObject.id))
  }

  return (
    <>
      <div className='galeriaGatos'>
        {error && <p id='error'>Error: {error}</p>}
        {loading && <p id='loadingData'>Loading data...</p>}
        <ul className='listaSinPuntos'>
          {gatos.map((gato) => {
            return (
              <li key={gato.id}>
                <img src={gato.url} alt="gato"/>
                <div id="heartDiv" onClick={() => toggleHeart(gato.id)}>{gato.liked ? <FaHeart color='red'/> : <FaRegHeart />}</div>
              </li>
            )
          })}
        </ul>
        <div className='renovarGaleria'>
          <button className='btn-renovarGaleria' onClick={renovarGaleria}>Renovar Galería</button>
        </div>
        <div className="verMas">
          <button className='btn-verMas' onClick={verMasGatos}>Ver más</button>
        </div>
      </div>
    </>
  )
}

export default Galeria