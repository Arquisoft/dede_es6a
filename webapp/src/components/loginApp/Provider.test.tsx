import React from 'react';
import { render, screen } from '@testing-library/react';
import Provider from "./Provider"


test("an order is executed", async () => {




    let response = await Provider.getIdentityProviders( );

    expect(response).toStrictEqual([
        {
            id: "inrupt",
            label: "Inrupt",
            image: "img/inrupt.svg",
            value: "https://inrupt.net/auth",
            registerLink: "https://inrupt.net/register",
        },
        {
            id: "solid-community",
            label: "Solid Community",
            image: "img/Solid.png",
            value: "https://solid.community",
            registerLink: "https://solid.community/register",
        }
    ])
})