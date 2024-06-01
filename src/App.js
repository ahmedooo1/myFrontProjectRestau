import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dishes from './components/Dishes';
import Orders from './components/Orders';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DishDetails from './components/DishDetails';
import Header from './components/Header';
import Panier from './components/Panier';
import AdminDishes from './components/AdminDishes';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/dishes/:id" element={<DishDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
