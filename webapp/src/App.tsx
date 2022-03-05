import React, { useState, useEffect } from 'react';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import MenuBar from './components/MenuBar/MenuBar';

import './App.css';

export default function App(){
    
  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <main>
      <div className="App">
          <MenuBar />
      </div>    
    </main>
  );
}


