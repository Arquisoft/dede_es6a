import path, { normalize } from 'path';

var dotenvPath = path.resolve('./../../../webapp/.env');
require("dotenv").config({path: dotenvPath});

import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./e2e/features/login.feature');

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
    let password:string

    given("Página sin usuario logueado", () => {
      username = "test"
      password = "123456"
    });

    when("Proceso de login", async () => {
      // Proceso de logueo
      await page.setViewport({ width: 1200, height: 1300 });
      //await expect(page).toMatch("Catálogo de productos");
      await expect(page).toClick("a[href='/login']");
      await page.waitForNavigation()
      await expect(page).toMatch("Login");
      await expect(page).toFill("input[name='name']", username);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick("button[id='inicio-sesion']");
      await page.waitForNavigation()
      //Redirige a /catalogo
      //await expect(page).toMatch("Catálogo de productos");
      //Añado producto
      await expect(page).toMatch("Cerrar Sesión");
      await expect(page).toMatch("Perfil");
    });

    then("Se muestra su perfil", async () => {
      await expect(page).toClick('a[href="/perfil"]');
      await page.waitForNavigation();
      await expect(page).toMatch("test");
      await expect(page).toMatch("test@email.com");
      await expect(page).toMatch("Cerrar Sesión");
    });
  });
});
