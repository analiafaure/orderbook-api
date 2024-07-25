<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

 # API orderbook-api

Esta API permite obtener un snapshot de un orderbook, dado un exchange y un símbolo de un par.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias usando npm:

```bash
npm install
```
## Test 

Para testear la API se debe correr el siguiente comando 

```bash

# e2e tests
$ npm run test:e2e

```
## Uso

Para utilizar esta API

1. Inicia el servidor ejecutando el siguiente comando:

```bash
npm run start
```

2. La solicitud HTTP al endpoint correspondiente

## ORDERBOOK

- `GET /orderbook?exchange=BINANCE&baseCoin=BTC&quoteCoin=USDT`: Obtiene el snapshot de un exchange con su par de manera ordenada.
  - Query Parameters: `exchange (string), baseCoin (string), quoteCoin (string)`
  - Respuesta exitosa: `200 OK`
  - Ejemplo de respuesta: `{ "timestamp": "2024-07-25T10:00:00.000Z","bids": [// array de bid orders  ],aks": [
    // array de ask orders
  ] }`

## Errores

- `400 Bad Request`: La solicitud contiene datos incorrectos o incompletos.
- `500 Internal Server Error`: Error interno del servidor.


## Stay in touch

- Author - [Analia Faure]
- linkedin - [Linkedin](https://www.linkedin.com/in/analia-faure-52ab3311a/)

## License

Nest is [MIT licensed](LICENSE).
