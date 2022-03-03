import { Router } from "express";
import passport from "passport";
import path from "path";
import upload from "../../services/upload.js";

const authWebRouter = new Router();

authWebRouter.get("/", (_, res) => {
  res.redirect("/home");
});

authWebRouter.get("/login", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/login.html"));
  }
});

authWebRouter.get("/register", (req, res) => {
  const name = req.session?.name;
  if (name) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(process.cwd(), "/views/register.html"));
  }
});

authWebRouter.get("/logout", (req, res) => {
  const name = req.session?.name;
  if (name) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "/views/pages/logout.ejs"), {
          name,
        });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

authWebRouter.post(
  "/register",
  upload.single("avatar"),
  passport.authenticate("signup", {
    failureRedirect: "/register?error=Error al registrarse",
  }),
  (req, res) => {
    const { name, id } = req.user.payload;
    req.session.name = name;
    req.session.userId = id;
    res.redirect("/");
  }
);

authWebRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login?error=Error al iniciar sesión",
  }),
  (req, res) => {
    const { name, id } = req.user.payload;
    req.session.name = name;
    req.session.userId = id;
    res.redirect("/");
  }
);

export default authWebRouter;
