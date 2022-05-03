import { useState, useEffect } from 'react';
import './DatosPedido.css';
import ErrorPage from '../ErrorPage';
import {isLogged} from '../../api/api';
import DatosPedidoLogged from './DatosPedidoLogged';

type DatosPedidoType = {
    
}

const DatosPedido: React.FC<DatosPedidoType> = () => {

    const [log,setIsLogged] = useState<boolean>();
    const refreshIsLogged =  () => {
        setIsLogged( isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);

    
    if(log){
        return (
            <DatosPedidoLogged />
        );
    }else{
        return (
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }

}
export default DatosPedido;