# Desplegar nuestro proyecto en la nube 
### DAMIÁN CABRIO

## Correr el proyecto localmente
Primero se debe instalar los paquetes desde npm con `npm i`
Para correr el proyecto localmente se debe correr el siguiente comando `npm run dev`. Si se quiere correr el proyecto con un puerto en particular se debe agregar a este comando el parámetro `-p puerto`. Por ejemplo `npm run dev -- -p 2000`.
El proyecto se puede correr en dos modos: Modo fork y modo cluster. Por defecto se utiliza el modo fork, para cambiar el modo utilizar el parámetro `-m` o `-mode` y el modo que se desea utilizar. Al usar el modo cluster, se creará un proceso por cada núcleo del CPU.

También se debe generar y popular un archivo .env, basándose en el archivo .env.example.
Las variables que se deben agregar al archivo .env son: `SESSION_SECRET`, `MONGODB_URL`, `FB_CLIENT_ID`, `FB_CLIENT_SECRET` y `FB_CALLBACK_URL`.

## Heroku
La aplicación fue desplegada en Heroku como una imagen de Docker, en dos entornos:
Staging: [Link](https://ecommerce-coderhouse-staging.herokuapp.com)
Producción: [Link](https://ecommerce-coderhouse-cabrio.herokuapp.com)