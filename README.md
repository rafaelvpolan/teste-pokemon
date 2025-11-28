
<div align="center">
  <img src="https://i0.wp.com/lordlibidan.com/wp-content/uploads/2019/03/Running-Pikachu-GIF.gif?fit=70%2C342&ssl=1" alt="api">
</div>

# Teste API Pokemon

## Description

API de gerenciamento de treinadores, times e pokemons.

## Requisitos

## Setup

Iniciar o Mysql:
```bash
$ docker-compose up -d
```
Instalar dependências:
```bash
$ npm install
```

## Executar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Host

``` http://localhost:${PORT}/ ``` 

## Documentação API

Doc Swagger: ``` http://localhost:${PORT}/api/docs ``` 

Doc MD: [Link MD](https://github.com/rafaelvpolan/teste-pokemon/blob/main/API_Documentation.md)

## Deploy

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```
