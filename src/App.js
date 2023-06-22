import './styles/index.css';
import './styles/app.css';
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurant from './pages/Restaurant';
import Reviews from './pages/Reviews';
import ProfileSetUp from './pages/ProfileSetUp';

import SharedLayout from './components/SharedLayout'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
          <Route path='setup' element={<ProfileSetUp />}></Route>
          <Route path='restaurant/:restaurantId' element={<Restaurant />} />
          <Route path='restaurant/:restaurantId/reviews' element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
