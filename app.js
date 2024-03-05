const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { authRouter } = require("./src/routes/authRoutes");
const { mongoConnection } = require("./src/db/dbConection");
const { loginRouter } = require("./src/routes/loginRoutes");
const { productRoter } = require("./src/routes/productRoutes");
const { categoryRouter } = require("./src/routes/categoryRoutes");
const { packRouter } = require("./src/routes/packRoutes");
const { emailRouter } = require("./src/routes/emailRoutes");
const { checkoutRouter } = require("./src/routes/checkoutRoutes");
const port = process.env.PORT || 3001;
const app = express();

const links = {
  authentication: "/auth",
  login: "/login",
  product: "/product",
  category: "/category",
  pack: "/pack",
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use(links.authentication, authRouter);
app.use(links.login, loginRouter);
app.use(links.product, productRoter);
app.use(links.category, categoryRouter);
app.use(links.pack, packRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({ msg: "Page not found, try again" });
});

app.listen(port, () => {
  console.log(`Server is runing in port: ${port}`);
});
