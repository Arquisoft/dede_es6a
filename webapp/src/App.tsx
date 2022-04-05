import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import AddProducts from './components/products/addProducts/AddProducts';
import ConfirmacionEdad from './components/ConfirmacionEdad';
import { useState } from 'react';
import Producto from './components/Producto';
import { ListaCarrito, Product } from './shared/shareddtypes';
import Carrito from './components/carrito/Carrito';
import AboutUs from './components/aboutUs/AboutUs';
import Login from "./components/loginApp/FormLogin"
import Register from './components/Register/FormRegister';
import DatosPedido from './components/pedido/DatosPedido';
import ConfirmacionPago from './components/pedido/ConfirmacionPago';
import toast, { Toaster } from 'react-hot-toast';

import ListUsers from './components/listUsers/ListUsers';
import {duration} from "@mui/material";

const App = () => {

  const [listaCarrito,setListaCarrito] = useState<ListaCarrito[]>([]);

  const cargarCarrito = () => {
    const sessionCart = localStorage.getItem("listaCarrito");
    if (sessionCart)
      setListaCarrito(JSON.parse(sessionCart));
  }


  const addToCarrito = (product: Product) => {
    cargarCarrito();

    let productosLista = listaCarrito.slice();
    console.log(productosLista);
    let encontrado: boolean = false;
    for(let i=0; i< productosLista.length; i++){
      if(productosLista[i].producto.nombre === product.nombre){
        productosLista[i].unidades += 1;
        encontrado = true;
      }
    }
    if(!encontrado){
      var c:ListaCarrito = {'producto':product, 'unidades':1};
      productosLista.push(c);
    }

    toast.success(product.nombre + ': Añadida una unidad al carrito', {duration: 3500});

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    setListaCarrito(productosLista);
  };


  const removeFromCarrito = (product: Product) => {
    cargarCarrito();

    let productosLista = listaCarrito.slice();
    let encontrado: boolean = false;
    for(let i=0; i<= productosLista.length; i++){
      if(!encontrado)
        if(productosLista[i].producto.nombre === product.nombre){
          encontrado = true;
          productosLista[i].unidades -= 1;
          if (productosLista[i].unidades === 0)
            productosLista.splice(i, 1);
        }
    }

    toast.error(product.nombre +': Eliminada una unidad del carrito', {duration: 3500});

    localStorage.setItem("listaCarrito", JSON.stringify(productosLista));
    setListaCarrito(productosLista);
  }

  const vaciarCarrito = () => {
    localStorage.removeItem("listaCarrito");
    setListaCarrito([]);
    localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));

    toast.error('Carrito vaciado', {duration:3500});
  }

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="catalogo" element={<Catalogo  addToCarrito={addToCarrito}/>} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="users/list" element={<ListUsers />} />
        <Route path="carrito" element={<Carrito listaCarrito={listaCarrito} addToCarrito={addToCarrito} removeFromCarrito={removeFromCarrito} vaciarCarrito={vaciarCarrito}/>} />
        <Route path="pedido" element={<DatosPedido listaCarrito={listaCarrito} />} />
        <Route path="pago" element={<ConfirmacionPago listaCarrito={listaCarrito} />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      </BrowserRouter>

      <Toaster
        position={"bottom-left"}
        reverseOrder={false}
      />
    </>
  );
};

export default App;
