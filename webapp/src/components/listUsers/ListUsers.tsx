
import {isAdmin, getUsers} from '../../api/api';
import {isLoggedType, User} from '../../shared/shareddtypes';
import BarraNavegacion from '../BarraNavegacion';
import Errorpage from '../ErrorPage';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';



export default function(){

    const [admin,setIsAdmin] = useState<isLoggedType>();
    const [users,setUsers] = useState<User[]>([]);
    const refreshIsLogged = async () => {
        setIsAdmin(await isAdmin());
    }
    const refreshUsers = async () => {
        setUsers(await getUsers());
      }
    useEffect(()=>{ refreshIsLogged(); refreshUsers(); }, []);
    
    if(admin?.logged){
        return(
            <>
                <BarraNavegacion />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>{   
                            return(
                                <tr>
                                    <td>{users.indexOf(user)+1}</td>
                                    <td>{user.username}</td>
                                    <td colSpan={2}>{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    }else{
        return(
            <Errorpage msg="Debes ser administrador para poder acceder"/>
        );
    }
}