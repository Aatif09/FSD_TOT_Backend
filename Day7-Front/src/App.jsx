import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/homePage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import SignUpPage from './pages/signUpPage';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, name: 'Guest' });

  const checkIsUSerLoggedIn = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"http://www.localhost:2002/api/v1/isLoggedIn", {
      credentials: "include"
    });
    const resObj = await response.json();
    if (response.status === 200) {
      setUser({ isLoggedIn: true, name: resObj.data.name, email: resObj.data.email });
    } else {
      setUser({ isLoggedIn: false, name: 'Guest' });
    }
  }
  useEffect(() => {
    checkIsUSerLoggedIn();

  }, [])

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element=<SignUpPage /> />
        <Route path="/" element={user.isLoggedIn ? <HomePage /> : <Navigate to="/sign-up" />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/nav" element={<NavBar />} />
        <Route path="/login" element={user.isLoggedIn ? <Navigate to="/products" /> : <LoginPage />} />
        <Route path="/sign-up" element={user.isLoggedIn ? <Navigate to="/products" /> : <SignUpPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
