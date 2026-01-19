import { Link } from "react-router-dom";
import Galeria from '../components/Galeria'

const Home = () => {
  return (
    <div>
      <h1>CatGallery con The Cat API</h1>
      <ul className="listaSinPuntos">
        <li>
            <Link to={'/favoritos'}>Gatos Favoritos</Link>
        </li>
      </ul>
      <Galeria />
    </div>
  );
}

export default Home