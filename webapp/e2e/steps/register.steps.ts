import path, { normalize } from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

const crypto = require('crypto');

import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  jest.setTimeout(100000)
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
    ? await puppeteer.launch()
    : await puppeteer.launch({ headless: true }); 
  page = await browser.newPage();

    await page
      .goto("http://localhost:3000/catalogo", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });
  
  test("Usuario inicia sesión", ({given,when,then}) => {
    let username:string
    let ps:string
    let email:string

    given("Página sin usuario logueado", () => {
      username = crypto.randomUUID().toString();
      email = crypto.randomUUID().toString() + "@email.com";
      ps = "123456";
    });

    when("Proceso de login", async () => {
      // Proceso de logueo
      await page.setViewport({ width: 1200, height: 1300 });
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toClick("a[href='/login']");
      await page.waitForNavigation()
      await expect(page).toMatch("Login");
      await expect(page).toClick('a', { text: '¡Regístrate ahora!' });
      await page.waitForNavigation()
      await expect(page).toFill("input[name='username']", username);
      await expect(page).toFill("input[name='email']", email);
      await expect(page).toFill("input[name='password']", ps);
      await expect(page).toFill("input[name='confirmPwd']", ps);
      await expect(page).toClick("button[id='btnSubmit']");
      await page.waitForNavigation()
      // Inicia sesión con el nuevo usuario
      await expect(page).toMatch("Login");
      await expect(page).toFill("input[name='name']", username);
      await expect(page).toFill("input[name='password']", ps);
    });

    then("Se muestra su perfil", async () => {
        await expect(page).toClick("button[id='inicio-sesion']");
        await page.waitForNavigation()
        //Redirige a /catalogo
        await expect(page).toMatch("Catálogo de productos");
        //Añado producto
        await expect(page).toMatch("Cerrar Sesión");
        await expect(page).toMatch("Perfil");
    });
  });
});
