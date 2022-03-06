import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './EmailForm';
import Welcome from './Welcome';

export default function MainView(){
    return (
        <>
            <Container maxWidth="sm">
                <Welcome message="ASW students"/>
                <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
                <Link href="https://github.com/Arquisoft/dede_es6a">Source code</Link>
            </Container>
        </>
    );
}