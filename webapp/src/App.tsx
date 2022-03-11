import React, { useState, useEffect } from 'react';

import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';

import  {getProducts, getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import {Product} from './shared/shareddtypes';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshProducts = async () => {
    setProducts(await getProducts());
  }

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshProducts();
    refreshUserList();
  },[]);

  return (
    <>
   
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="inicio" element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo  />} />
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
