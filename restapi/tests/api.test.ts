import path, { normalize } from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import request, {Response} from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import {createApp, createServer, closeServer, loadDatabase} from './setUpServerForTest';
import api from '../api';
import User from '../models/User';
import Order from '../models/Order';
import { ListaCarrito, ProductType, UserType } from '../types';
import Product from '../models/Product';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(api);

    server = createServer(app);  
    await loadDatabase(); 
});

afterAll(async () => {
    await closeServer(server);
})

describe('user ', () => {
    
    jest.setTimeout(10000);

    /**
     * Test that we can list users without any error.
     */
     it('list users',async () => {
        const response:Response = await request(app).get("/users/list");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].username.length).toBeGreaterThan(0);
        expect(response.body[0].email.length).toBeGreaterThan(0);
    });

     it('can be created correctly', async () => {
        let username:string = 'test123';
        let email:string = 'test123@email.com';
        let password:string = process.env.password_for_test!;
        const response:Response = await request(app).post('/users/add').send({username: username,email: email,password: password}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(201);

        const user:UserType = await User.findOne({username: username}) as unknown as UserType;
        expect(user.username).toBe(username);
        expect(user.email).toBe(email); 
        await User.deleteOne({username:username});
    });

    it('cant be created correctly due to empty email', async () => {
        let username:string = 'test123';
        let password:string = process.env.password_for_test!;
        const response:Response = await request(app).post('/users/add').send({username: username,email: '',password: password}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(500);
    });

    it('cant be created correctly due to empty name', async () => {
        let email:string = 'test123@email.com';
        let password:string = process.env.password_for_test!;
        const response:Response = await request(app).post('/users/add').send({username: '',email: email,password: password}).set('Accept', 'application/json');
        expect(response.statusCode).toBe(500);
    });
    

    it('correct login', async () => {
        const response:Response = await request(app).post('/login').send({
            username:"test1",
            password: process.env.password_for_test!
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(302);
    });

    it('logout', async () => {
        const response:Response = await request(app).get("/logout");
        expect(response.statusCode).toBe(200);
    });

    
});


describe('product ', () => {
    
    jest.setTimeout(10000);

    it('list products',async () => {
        const response:Response = await request(app).get("/catalogo/all");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].nombre.length).toBeGreaterThan(0);
        expect(response.body[0].marca.length).toBeGreaterThan(0);
    });

    it('can be created correctly', async () => {
        let nombre:string = 'thunderbitch';
        let marca:string = 'thunderbitch';
        let precio:number = 12.0;
        let categoria:string = 'whisky';
        let descripcion:string = 'sabor canela';
        const response:Response = await request(app).post('/products/add').send({   
                nombre:nombre, 
                marca: marca, 
                precio: precio, 
                categoria: categoria, 
                descripcion: descripcion 
            }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(201);

        const prod:ProductType = await Product.findOne({nombre: nombre}) as unknown as ProductType;
        expect(prod.nombre).toBe(nombre);
        expect(prod.marca).toBe(marca); 
        expect(prod.precio).toBe(precio);
        expect(prod.categoria).toBe(categoria);
        expect(prod.descripcion).toBe(descripcion);
        await Product.deleteOne({nombre:nombre});
    });


});

describe('order ', () => {
    
    jest.setTimeout(10000);

    it('can create order correctly', async () => {
        let carrito:ListaCarrito[] = [{
            producto:{
                nombre: "",
                marca: "",
                precio: 10.0,
                categoria: "ginebra",
                descripcion: "",
            },
            unidades: 3
        },{
            producto:{
                nombre: "dry gin",
                marca: "gin london",
                precio: 10.0,
                categoria: "ginebra",
                descripcion: "",
            },
            unidades: 2
        }];
        const response:Response = await request(app).post('/createOrder').send({   
            carrito: carrito,
            precio: 50.0,
            name: "paco",
            street: "Doctor Severo Ochoa",
            city: "Avilés",
            zipcode: "33400"
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });

    it('save order correctly', async () => {
        let carrito:ListaCarrito[] = [{
            producto:{
                nombre: "bombay",
                marca: "london gin",
                precio: 10.0,
                categoria: "ginebra",
                descripcion: "",
            },
            unidades: 3
        },{
            producto:{
                nombre: "dry gin",
                marca: "london gin",
                precio: 10.0,
                categoria: "ginebra",
                descripcion: "",
            },
            unidades: 2
        }];
        await request(app).post('/login').send({
            username:"test1",
            password:process.env.password_for_test!
        }).set('Accept', 'application/json');
        const response:Response = await request(app).post('/saveOrder').send({
            carrito:carrito,
            precio: 50.0
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        Order.deleteOne({precio: 50});
    });

});