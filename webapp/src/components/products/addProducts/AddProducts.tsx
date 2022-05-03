import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProducts.css';
import {addProduct, isAdmin} from '../../../api/api';
import {Product} from '../../../shared/shareddtypes';
import BarraNavegacion from '../../BarraNavegacion';
import Errorpage from '../../ErrorPage';
import { useState, useEffect } from 'react';
import AddProductsAdmin from './AddProductsAdmin'

export default function AddProducts(){

    const [admin,setIsAdmin] = useState<boolean>();
    const refreshIsLogged =  () => {
        setIsAdmin( isAdmin());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);

 

    if(admin){
        return(
            <AddProductsAdmin/>
        );
    }else{
        return(
            <Errorpage msg = "Debes ser administrador para acceder aqui" />
        );
    }
}