/* eslint-disable no-unused-vars */
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const response = require("./helpers/response");
const webVisitorCtl = require("./socketControllers/visitor");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  return response(res, "POKEMON API");
});

// auth middleware
const authMiddleware = require("./middlewares/auth");

// router for static file
app.use("/Uploads", express.static("./Assets/Public/Uploads"));

// auth router
const authRouter = require("./routers/auth");
app.use("/auth", authRouter);

// products router
const productRouter = require("./routers/products");
app.use("/products", productRouter);

// registration router
const registrationRouter = require("./routers/registrations");
app.use("/registrations", registrationRouter);

// categories router
const categoriesRouter = require("./routers/categories");
app.use("/categories", categoriesRouter);

// roles router
const rolesRouter = require("./routers/roles");
app.use("/roles", rolesRouter);

// users router
const usersRouter = require("./routers/users");
app.use("/users", authMiddleware, usersRouter);

// visitor router
const visitorRouter = require("./routers/webVisitor");
app.use("/visitors", visitorRouter);

server.listen(process.env.APP_PORT, () => {
  console.log(`App listening on port ${process.env.APP_PORT}`);
});
