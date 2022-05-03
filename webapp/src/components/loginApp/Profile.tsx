
import { isLogged} from '../../api/api';
import { useState, useEffect } from 'react';
import ErrorPage from '../ErrorPage';
import './profile.css';
import ProfileLogged from './ProfileLogged';

export default function Profile() {
    const [log,setIsLogged] = useState<boolean>();
    
    const refreshIsLogged =  () => {
        setIsLogged( isLogged());
    }
    useEffect(()=>{ refreshIsLogged(); }, []);

    if(log){
        return(
            <ProfileLogged />
        );
    }else{
        return( 
            <ErrorPage msg="Debes iniciar sesión para poder acceder"/>
        );
    }
}