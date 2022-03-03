import dotenv from "dotenv";
import passport from "passport";
import localStrategy from "passport-local";
import users from "../api/user.js";
import config from "../config.js";
import {
  createHash,
  deleteImage,
  filePath,
  isValidPassword,
  returnMessage,
} from "../utils/functions.js";
import { sendMail } from "./mailer.js";
dotenv.config();

const LocalStrategy = localStrategy.Strategy;

const initializePassportConfig = () => {
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const user = await users.getOneByProperty("username", username);
        if (!req.file) {
          return done(
            null,
            false,
            returnMessage(true, 500, "Error al subir la imagen", null)
          );
        }
        const avatar = filePath(req.file.filename);
        if (user.code === 200) {
          await deleteImage(avatar);
          return done(
            null,
            false,
            returnMessage(true, 400, "Usuario ya existe")
          );
        }
        const newUser = {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: createHash(password),
          username: req.body.username,
          phoneNumber: req.body.prefix + req.body.phoneNumber,
          avatar: avatar,
          age: req.body.age,
          address: req.body.address,
        };
        await users.createOne(newUser).then((user) => {
          if (user.code === 200) {
            sendMail(
              config.EMAIL,
              "Nuevo Registro",
              generateNewUserHtml(newUser)
            );
            return done(null, user);
          }
          return done(null, false, user);
        });
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(async (email, password, done) => {
      const user = await users.getOneByProperty("email", email);
      if (user.code !== 200) {
        return done(null, false, user);
      }
      if (!isValidPassword(user, password)) {
        return done(
          null,
          false,
          returnMessage(true, 400, "Contraseña incorrecta")
        );
      }

      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.payload.id);
  });

  passport.deserializeUser(async (id, done) => {
    await users.getOneById(id).then((user) => {
      done(null, user.payload);
    });
  });
};

export default initializePassportConfig;

function generateNewUserHtml(user) {
  return `
    <h1>Nuevo usuario registrado</h1>
    <p>
      Nombre: ${user.name}
    </p>
    <p>
      Apellido: ${user.surname}
    </p>
    <p>
      Email: ${user.email}
    </p>
    <p>
      Username: ${user.username}
    </p>
    <p>
      Teléfono: ${user.phoneNumber}
    </p>
    <p>Avatar:</p><br>
    <img src='${user.avatar}' width='300'>
    <p>
      Edad: ${user.age}
    </p>
    <p>
      Dirección: ${user.address}
    </p>
  `;
}
