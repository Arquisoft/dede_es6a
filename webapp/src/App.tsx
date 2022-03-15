import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Login from "./components/loginApp/FormLogin";
import Register from './components/Register/FormRegister'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import AddProducts from './components/products/addProducts/AddProducts';
import ConfirmacionEdad from './components/ConfirmacionEdad';

export default function App(){

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfirmacionEdad />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="products/add" element={<AddProducts />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

