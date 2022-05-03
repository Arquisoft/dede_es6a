import React from 'react';
import { render, screen } from '@testing-library/react';
import ListUsersAdmin from './ListUsersAdmin';
import { User} from '../../shared/shareddtypes';


test('Acceso a la lista de usuarios admin', () => {

    let users:User[]=[];
    const user1:User ={ username:"Pepe", email:"pepe@gmail.com", password:"contraseñaDePepe"};
    users.push(user1);
    render(<ListUsersAdmin users={users}/>);
  
    const tituloPagina = screen.getByText("No Vendo Agua");
    expect(tituloPagina).toBeInTheDocument();

    const columnaUsername = screen.getByText("Username");
    expect(columnaUsername).toBeInTheDocument();

    const columnaEmail = screen.getByText("Email");
    expect(columnaEmail).toBeInTheDocument();

    const usuarioPepe = screen.getByText("Pepe");
    expect(usuarioPepe).toBeInTheDocument();

    const emailPepe = screen.getByText("pepe@gmail.com");
    expect(emailPepe).toBeInTheDocument();


  
});


