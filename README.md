# DeDe_es6a

[![pages-build-deployment](https://github.com/Arquisoft/dede_es6a/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Arquisoft/dede_es6a/actions/workflows/pages/pages-build-deployment)
[![CI for ASW2122](https://github.com/Arquisoft/dede_es6a/actions/workflows/asw2122.yml/badge.svg)](https://github.com/Arquisoft/dede_es6a/actions/workflows/asw2122.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_dede_es6a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_dede_es6a)
[![codecov](https://codecov.io/gh/Arquisoft/dede_es6a/branch/main/graph/badge.svg?token=M51xGm4zyA)](https://codecov.io/gh/Arquisoft/dede_es6a)

Bienvenido a tu nuevo lugar favorito de compra de bebidas alcohólicas. En nuestra tienda encontrarás las mejores selecciones y marcas al mejor precio. Tanto si quieres disfrutar de la degustación de una copa con la mayor calidad como si quieres pasar un rato agradable en compañia de sus seres queridos y una buena cerveza.
🥂🍻<br>
[Tienda](https://dede-es6a.herokuapp.com/)<br>
Ten cuidado con el Larios que lo carga el diablo. ⚠️<br>
No nos hacemos responsables de posibles resacas mareos y/o nauseas. <br>

<img src="https://res.cloudinary.com/dnuyp5afa/image/upload/v1651504291/logo-original_hxlcwx.png" height="100">

Aqui puedes ver un resumen de nuestro trabajo:<br>
[Decisiones arquitectónicas](./decisiones%20arquitectonicas.pdf)<br>
[Demo](https://dede-es6a.herokuapp.com/)<br>
[issues](https://github.com/Arquisoft/dede_es6a/issues)<br>
[wiki](https://github.com/Arquisoft/dede_es6a/wiki)<br>
[kanban](https://github.com/Arquisoft/dede_es6a/projects/1)<br>

## Miembros del equipo 
<ul>
 <li>Diego García Quirós - UO276688 </li>
 <li>Óscar López González - UO269489 </li>
 <li>Daniel Machado Sánchez - UO276257 </li>
 <li>Juan Mera Menéndez - UO277406 </li>
 <li>David Maldonado Álvarez - UO259893 </li>
</ul>

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

Este proyecto es un ejemplo basico de un sitio web utilizando **React** con **Typescript** y un endpoint usando **NodeJS** con **express**

## Guia de inicio rápido

<mark>Si tienes instalados node.js y npm, asegurate de actualizarlos antes de intentar construir las imagenes</mark>

Si quieres ejecutar el proyecto necesitarás [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) y [Docker](https://docs.docker.com/get-docker/). Asegurate de tenerlos instalados en tu equipo. Descarga el proyecto con `git clone hhttps://github.com/Arquisoft/dede_es6a`. La manera más rápìda de ejecutar todo es con Docker.

```bash
docker-compose up --build
```
Este comando creará dos imagenes de docker si no existen en tu equipo (la webapp y la restapi) y lanzará un contenedor de mongoDB. Además lanzará contenedores de Prometheus y Grafana para monitorizar el servicio web. Deberias ser capaz de acceder a todo desde aqui:

 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [Ejemplo llamada a RestApi - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [Metricas RestApi - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Servidor Prometheus - http://localhost:9090](http://localhost:9090)
 - [Servidor Grafana http://localhost:9091](http://localhost:9091)
 
Si quieres ejecutar el proyecto sin Docker primero complila y ejecuta la restapi:

```shell
cd restapi
npm install
npm start
```
a continuación la webapp:
```shell
cd webapp
npm install
npm start
```

Deberias ser capaz de acceder a la aplicación en [http://localhost:3000](http://localhost:3000).

## Mas información
Encontrarás más información sobre el repositorio en los otros archivos README:
- Documentación: https://github.com/Arquisoft/dede_es6a/tree/master/docs
- Webapp: https://github.com/Arquisoft/dede_es6a/tree/master/webapp
- Restapi: https://github.com/Arquisoft/dede_es6a/tree/master/restapi


