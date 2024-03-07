import express from "express";
import path from "path";
import ejslayout from "express-ejs-layouts";
import ProductController from "./src/controller/product.controller.js";
import validateMiddlewarePostAddRequest from "./src/middleware/postAddMiddlewareValidation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
import userController from "./src/controller/user.controller.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/cookie.middleware.js";
const users = new userController();

const server = express();
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(cookieParser());
// server.use(setLastVisit);
server.use(ejslayout);
// parsing form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
const productController = new ProductController();
server.get("/",auth,setLastVisit, productController.getProducts);
server.get("/add-product", auth, productController.getAddProduct);
server.use(express.static("src/views"));
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateMiddlewarePostAddRequest,
  productController.postAddProduct
);
server.get("/register", users.getRegister);
server.post("/register", users.postregister);
server.get("/login", users.getLogin);
server.post("/login", users.postLogin);
server.get("/logout", users.logout);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/delete-product/:id", auth, productController.deleteProduct);
server.post("/update-product", auth, productController.postUpdateProduct);
server.listen(3400, () => {
  console.log("Server is listening at 3400..");
});
