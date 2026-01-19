import { useState, useEffect } from "react"

const useFavoritos = () => {

    const [favoritos, setFavoritos] = useState(() => {
        return JSON.parse(localStorage.getItem('listaFavoritos')) || []
    })

    useEffect(() => {
        localStorage.setItem('listaFavoritos', JSON.stringify(favoritos))
    }, [favoritos])

    const eliminarFavoritos = (identificador) =>  {
        const nuevosFavoritos = favoritos.filter((fav) => fav.id !== identificador)
        setFavoritos(nuevosFavoritos)
    }

    return { favoritos, eliminarFavoritos }
}

export default useFavoritos

