import { Router } from "express";
import path from "path";
import { webAuth } from "../../auth/index.js";
const homeWebRouter = new Router();

homeWebRouter.get("/home", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/index.ejs"), {
    name: req.session.name,
    id: req.session.userId,
    avatar: req.user.avatar,
  });
});

homeWebRouter.get("/carrito", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/carrito.ejs"), {
    name: req.session.name,
    id: req.session.userId,
    avatar: req.user.avatar,
  });
});

homeWebRouter.get("/perfil", webAuth, (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/perfil.ejs"), {
    user: req.user,
  });
});

export default homeWebRouter;
