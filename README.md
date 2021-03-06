# DeDe_es6a

[![pages-build-deployment](https://github.com/Arquisoft/dede_es6a/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Arquisoft/dede_es6a/actions/workflows/pages/pages-build-deployment)
[![CI for ASW2122](https://github.com/Arquisoft/dede_es6a/actions/workflows/asw2122.yml/badge.svg)](https://github.com/Arquisoft/dede_es6a/actions/workflows/asw2122.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_dede_es6a&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_dede_es6a)
[![codecov](https://codecov.io/gh/Arquisoft/dede_es6a/branch/main/graph/badge.svg?token=M51xGm4zyA)](https://codecov.io/gh/Arquisoft/dede_es6a)

Bienvenido a tu nuevo lugar favorito de compra de bebidas alcoh贸licas. En nuestra tienda encontrar谩s las mejores selecciones y marcas al mejor precio. Tanto si quieres disfrutar de la degustaci贸n de una copa con la mayor calidad como si quieres pasar un rato agradable en compa帽ia de sus seres queridos y una buena cerveza.
馃馃嵒<br>
[Tienda](https://dede-es6a.herokuapp.com/)<br>
Ten cuidado con el Larios que lo carga el diablo. 鈿狅笍<br>
No nos hacemos responsables de posibles resacas mareos y/o nauseas. <br>

<img src="https://res.cloudinary.com/dnuyp5afa/image/upload/v1651504291/logo-original_hxlcwx.png" height="100">

Aqui puedes ver un resumen de nuestro trabajo:<br>
[Decisiones arquitect贸nicas](./decisiones%20arquitectonicas.pdf)<br>
[Tienda](https://dede-es6a.herokuapp.com/)<br>
[Demo - video](https://www.youtube.com/watch?v=Csi_1IMIfXs)<br> 
[Documentaci贸n](https://arquisoft.github.io/dede_es6a/)<br>
[issues](https://github.com/Arquisoft/dede_es6a/issues)<br>
[wiki](https://github.com/Arquisoft/dede_es6a/wiki)<br>
[kanban](https://github.com/Arquisoft/dede_es6a/projects/1)<br>

## Miembros del equipo 
<ul>
 <li>Diego Garc铆a Quir贸s - UO276688 </li>
 <li>脫scar L贸pez Gonz谩lez - UO269489 </li>
 <li>Daniel Machado S谩nchez - UO276257 </li>
 <li>Juan Mera Men茅ndez - UO277406 </li>
 <li>David Maldonado 脕lvarez - UO259893 </li>
</ul>

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

Este proyecto es un ejemplo basico de un sitio web utilizando **React** con **Typescript** y un endpoint usando **NodeJS** con **express**

## Guia de inicio r谩pido

<mark>Si tienes instalados node.js y npm, asegurate de actualizarlos antes de intentar construir las imagenes</mark>

Si quieres ejecutar el proyecto necesitar谩s [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) y [Docker](https://docs.docker.com/get-docker/). Asegurate de tenerlos instalados en tu equipo. Descarga el proyecto con `git clone hhttps://github.com/Arquisoft/dede_es6a`. La manera m谩s r谩p矛da de ejecutar todo es con Docker.

```bash
docker-compose up --build
```
Este comando crear谩 dos imagenes de docker si no existen en tu equipo (la webapp y la restapi) y lanzar谩 un contenedor de mongoDB. Adem谩s lanzar谩 contenedores de Prometheus y Grafana para monitorizar el servicio web. Deberias ser capaz de acceder a todo desde aqui:

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
a continuaci贸n la webapp:
```shell
cd webapp
npm install
npm start
```

Deberias ser capaz de acceder a la aplicaci贸n en [http://localhost:3000](http://localhost:3000).

## Mas informaci贸n
Encontrar谩s m谩s informaci贸n sobre el repositorio en los otros archivos README:
- Documentaci贸n: https://github.com/Arquisoft/dede_es6a/tree/master/docs
- Webapp: https://github.com/Arquisoft/dede_es6a/tree/master/webapp
- Restapi: https://github.com/Arquisoft/dede_es6a/tree/master/restapi


