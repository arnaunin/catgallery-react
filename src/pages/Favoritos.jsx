import { FaTrashAlt } from "react-icons/fa";
import useFavoritos from "../hooks/useFavoritos";
import { Link } from "react-router-dom";

const Favoritos = () => {

  const { favoritos, eliminarFavoritos } = useFavoritos()

  return (
    <>
      <h2>Mis gatos favoritos</h2>
      <ul className="listaSinPuntos">
        <li>
            <Link to={'/'}>Galería de gatos</Link>
        </li>
      </ul>
      <div className="galeriaGatos">
        <ul className="listaSinPuntos">
          {favoritos.map((fav) => {
            return (
              <li key={fav.id} className="favorito-item">
                <img src={fav.url} alt="gato favorito" />
                <button className="btn-eliminar" onClick={() => eliminarFavoritos(fav.id)}><FaTrashAlt color="grey" size={18}/></button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Favoritos
