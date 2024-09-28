<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://pokeapi.co/" target="blank"><img src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg" width="200" alt="Pokémon Logo" /></a>
</p>

# Ejecutar en desarrollo

Sigue estos pasos para ejecutar el proyecto en un entorno de desarrollo:

1.  **Clonar el Repositorio** 🔄

```
https://github.com/SebasDev807/NestJsPokeDex.git
```

2.  **Instalar Dependencias** 📦

```
yarn install
```

3. **Instalar Nest CLI** 🌟
   <br>
   Asegúrate de tener Nest CLI instalado globalmente:

```
npm i -g @nest/cli
```

4. **Levantar la base de datos** 🗃️
   <br>
   Utiliza Docker🐳 para levantar la base de datos:

```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renonmbrar la copia a __.env___

6. Llenar las variables de entorno

7. Ejecutar en desarrollo

```
    yarn start:dev
```

8. **Recargar la Base de Datos con Datos de Semilla** 🌱
   <br>
   Accede al siguiente endpoint para cargar los datos de semilla en la base de datos:

```
http://localhost:3000/api/v2/seed
```

# Stack usado

- MongoDB 🍃
- Nest 😺
