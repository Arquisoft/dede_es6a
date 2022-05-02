import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-carrito.feature');

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
      .goto("https://dede-es6a.herokuapp.com/catalogo", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });
  
  test("Usuario añade producto", ({given,when,then}) => {
    let username:string
    let password:string

    given("Usuario logueado", () => {
      username = "test"
      password = "123456"
    });

    when("Añade producto al carrito", async () => {
      // Proceso de logueo
      await page.setViewport({ width: 1100, height: 1200 });
      await expect(page).toMatch("Catálogo de productos");
      await expect(page).toClick("a[href='/login']");
      await page.waitForNavigation()
      await expect(page).toMatch("Login");
      await expect(page).toFill("input[name='name']", username);
      await expect(page).toFill("input[name='password']", password);
      await expect(page).toClick('a', { text: 'Iniciar sesión' });
      await page.waitForNavigation()
      //Redirige a /catalogo
      await expect(page).toMatch("Catálogo de productos");
      //Añado producto
      await expect(page).toClick('button[id="boton-añadir"]');
    });

    then("Aparece en el carrito", async () => {
      await expect(page).toClick("a[href='/carrito']");
      await page.waitForNavigation();
      await expect(page).toMatch("Absolut");
    });
  });
});