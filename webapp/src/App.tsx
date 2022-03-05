import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import Catalogo from './components/Catalogo';
import  {getProducts, getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import {Product} from './shared/shareddtypes';
import './App.css';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshProducts = async () => {
    setProducts(await getProducts());
  }

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshProducts();
    refreshUserList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"/>
        <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>       
        <UserList users={users}/>
        <Link href="https://github.com/Arquisoft/dede_es6a">Source code</Link>
        <Catalogo products={products}/>
      </Container>
    </>
  );
}

export default App;
