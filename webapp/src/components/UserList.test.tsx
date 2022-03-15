import React from 'react'
import { render } from "@testing-library/react";
import UserList from "./UserList";
import {User} from "../shared/shareddtypes";

test('check that the list of users renders propertly', async () => {
    const userList:User[] = [{username: 'Pablo', email: 'gonzalezgpablo@uniovi.es', password: "123"}];
    const {getByText} = render(<UserList users={userList}/>);
    expect(getByText(userList[0].username)).toBeInTheDocument();
    expect(getByText(userList[0].email)).toBeInTheDocument();
    expect(getByText(userList[0].password)).toBeInTheDocument();
  });