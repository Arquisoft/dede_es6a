


import BarraNavegacion from '../BarraNavegacion';
import Table from 'react-bootstrap/Table';


export default function ListUsers(props:any){

   
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
                    {props.users.map((user:any, userIdx:any)=>{   
                        return(
                            <tr key={userIdx+"IdUsuario"}>
                                <td>{props.users.indexOf(user)+1}</td>
                                <td>{user.username}</td>
                                <td colSpan={2}>{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            </>
            
        )   ;         
       
    }
