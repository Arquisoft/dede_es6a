import Catalogo from './components/Catalogo';
import {
  HashRouter,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import './App.css';
import AddProducts from './components/products/addProducts/AddProducts';
import ConfirmacionEdad from './components/ConfirmacionEdad';
import Carrito from './components/carrito/Carrito';
import AboutUs from './components/aboutUs/AboutUs';
import Login from "./components/loginApp/FormLogin";
import Register from './components/Register/FormRegister';
import DatosPedido from './components/pedido/DatosPedido';
import ConfirmacionPago from './components/pedido/ConfirmacionPago';
import { Toaster } from "react-hot-toast";

import ListUsers from './components/listUsers/ListUsers';

const App = () => {

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="users/list" element={<ListUsers />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="pedido" element={<DatosPedido />} />
        <Route path="pago" element={<ConfirmacionPago />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <Toaster
        position={"bottom-left"}
        reverseOrder={false}
      />
      </BrowserRouter>
    </>
  );
};

export default App;
