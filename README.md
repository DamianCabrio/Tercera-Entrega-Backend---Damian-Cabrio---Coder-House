# Tercera Entrega
### DAMIÁN CABRIO

## Correr el proyecto localmente
Primero se debe instalar los paquetes desde npm con `npm i`
Para correr el proyecto localmente se debe correr el siguiente comando `npm run dev`. Si se quiere correr el proyecto con un puerto en particular se debe agregar a este comando el parámetro `-p puerto`. Por ejemplo `npm run dev -- -p 2000`.

También se debe generar y popular un archivo .env, basándose en el archivo .env.example.
Las variables que se deben agregar al archivo .env son: `URL_BASE`, `SESSION_SECRET`, `MONGODB_URL`, `PORT`, `EMAIL`, `EMAIL_PASSWORD`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_NUMBER`, `VERIFIED_NUMBER`,.

## Heroku
La aplicación fue desplegada en Heroku como una imagen de Docker, en dos entornos:
Staging: [Link](https://ecommerce-coderhouse-staging.herokuapp.com)
Producción: [Link](https://ecommerce-coderhouse-cabrio.herokuapp.com)
