const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const cookies = require("cookie-parser");
const session = require("express-session");
const publicPath = path.resolve(__dirname, "../public");

const mainRouter = require("./routes/main-routes");
const eventRouter = require("./routes/event-routes");
const apiRouter = require("../api/routerAPI/index");
const userRouter = require("./routes/user-routes");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
app.use(
  cors({
    origin: "http://localhost:3001/",
  })
);
app.use(express.static(publicPath));

//Registro de datos de forma segura method POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());
app.use(
  session({
    secret: "Deporteando andando",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(userLoggedMiddleware);

// Dependencia de node para el uso de los method Put&Delete
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use("/", mainRouter);
app.use("/Evento", eventRouter);
app.use("/Usuario", userRouter);
app.use("/api", apiRouter);

// view engine setup (Para renderizar ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//cors
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

//aviso de servidor funcionando
app.listen(3000, () => {
  console.log("servidor corriendo en el puerto 3000");
});

//pagina de error 404
app.use((req, res, next) => {
  res.status(404).render("error");
});

//funcion disponible para todas las vistas (decimales)
app.locals.toThousand = (n) =>
  n
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
