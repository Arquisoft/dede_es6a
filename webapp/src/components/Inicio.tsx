import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Welcome from '../components/Welcome';
import UserList from '../components/UserList';
import Catalogo from '../components/Catalogo';

import '../App.css';
import { useNavigate } from 'react-router-dom';

function Inicio(): JSX.Element {

let navigate = useNavigate();
const goToCatalog = () => navigate("/catalogo");


 
    return (
      <>
     
        <Container maxWidth="sm">
          <Welcome message="ASW students"/>
          <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>       
          <Link href="https://github.com/Arquisoft/dede_es6a">Source code</Link>
          <button onClick={goToCatalog}> hola</button>
        </Container>

      </>
    );
  }
  
  export default Inicio;