import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/homePage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/nav" element={<NavBar />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
