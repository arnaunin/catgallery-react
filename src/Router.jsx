import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Favoritos from './pages/Favoritos.jsx'

const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favoritos' element={<Favoritos />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
