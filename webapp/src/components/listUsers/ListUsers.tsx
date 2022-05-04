
import {isAdmin, getUsers} from '../../api/api';
import { User} from '../../shared/shareddtypes';
import Errorpage from '../ErrorPage';
import { useState, useEffect } from 'react';
import ListUsersAdmin from './ListUsersAdmin';



export default function ListUsers(){
    const [admin,setIsAdmin] = useState<boolean>();
    const [users,setUsers] = useState<User[]>([]);
    const refreshIsLogged =  () => {
        setIsAdmin( isAdmin());
    }
    const refreshUsers = async () => {
        setUsers(await getUsers());
      }
    useEffect(()=>{ refreshIsLogged(); refreshUsers(); }, []);
    
    
    if(admin){
        return(
            
               <ListUsersAdmin users={users}/>
        );
    }else{
        return(
            <Errorpage msg="Debes ser administrador para poder acceder"/>
        );
    }
}