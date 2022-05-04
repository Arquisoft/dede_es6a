import 'bootstrap/dist/css/bootstrap.min.css';
import './AddProducts.css';
import { isAdmin} from '../../../api/api';
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