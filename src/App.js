import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Home'

import SharedLayout from './components/SharedLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<div>login</div>} ></Route>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
