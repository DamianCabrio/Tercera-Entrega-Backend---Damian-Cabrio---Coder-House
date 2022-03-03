import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { Server as HttpServer } from "http";
import passport from "passport";
import { Server as Socket } from "socket.io";
import config from "./config.js";
import cartApiRouter from "./routers/api/cart.js";
import productsApiRouter from "./routers/api/products.js";
import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import addProductsHandlers from "./routers/ws/products.js";
import logger from "./services/logging.js";
import initializePassportConfig from "./services/passport-config.js";

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  addProductsHandlers(socket, io.sockets);
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 600000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, _, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/productos", productsApiRouter);
app.use("/api/carrito", cartApiRouter);

app.use(authWebRouter);
app.use(homeWebRouter);

app.use((req, res) => {
  logger.warn(`${req.method} ${req.url}`);
  res.sendStatus(404);
});

const connectedServer = httpServer.listen(config.PORT, () => {
  const port = connectedServer.address().port;
  console.log(`Server running at ${process.env.URL_BASE}${port}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
