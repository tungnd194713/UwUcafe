import './index.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Home from './pages/Home'
import Login from './pages/Login'

import SharedLayout from './components/SharedLayout'

function App() {

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />} >
            <Route path='/login' element={<Login />} ></Route>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default App;
