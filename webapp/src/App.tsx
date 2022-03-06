import { useState, useEffect } from 'react';
import Catalogo from './components/Catalogo';
import MainView from './components/MainView';
import  {getProducts, getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import {Product} from './shared/shareddtypes';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [users,setUsers] = useState<User[]>([]);

  const refreshProducts = async () => {
    setProducts(await getProducts());
  }

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshProducts();
    refreshUserList();
  },[]);


  const rootElement = document.getElementById("root");
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="catalogo" element={<Catalogo products={products} />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
