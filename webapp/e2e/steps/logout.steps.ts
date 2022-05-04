import path, { normalize } from 'path';

var dotenvPath = path.resolve('../../env');
require("dotenv").config({path: dotenvPath});

import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/logout.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  jest.setTimeout(100000)
  beforeAll(async () => {

    browser = process.env.GITHUB_ACTIONS
    ? await puppeteer.launch()
    : await puppeteer.launch({ headless: true, slowMo:100}); 
  page = await browser.newPage();

    await page
      .goto("http://localhost:3000/catalogo", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });
  
  test("Usuario se desloguea de la aplicación", ({given,when,then}) => {
    let username:string
    let password:string

    given("Página con usuario logueado", () => {
      username = "test"
      password = "123456";
    });

    when("Proceso de logout", async () => {
      // Proceso de logueo
      await page.setViewport({ width: 1100, height: 1200 });
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toClick("a[href='/login']");
      await page.waitForNavigation()
      await expect(page).toMatch("Login");
      await expect(page).toFill("input[name='name']", username);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick("button[id='inicio-sesion']");
      await page.waitForNavigation()
      //Login realizado el usuario se desloguea
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toMatch("Cerrar Sesión");
      await expect(page).toMatch("Perfil");
      //Se desloguea
      await expect(page).toClick('a', { text: 'Cerrar Sesión' });
      await page.waitForNavigation();
    });

    then("Se muestra el botón iniciar sesión", async () => {
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toMatch("Inicia sesión");
    });
  });
});
