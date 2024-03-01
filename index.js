import express from "express";
import path from "path";
import ejslayout from "express-ejs-layouts";
import ProductController from "./src/controller/product.controller.js";
import validateMiddlewarePostAddRequest from "./src/middleware/postAddMiddlewareValidation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(ejslayout);
// parsing form data
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
const productController = new ProductController();
server.get("/", productController.getProducts);
server.get("/add-product", productController.getAddProduct);
server.use(express.static("src/views"));
// server.get("/new", productController.getAddForm);
server.post(
  "/",
  uploadFile.single("imageUrl"), validateMiddlewarePostAddRequest,
  productController.postAddProduct
);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/delete-product/:id", productController.deleteProduct);
server.post("/update-product", productController.postUpdateProduct);
server.listen(3400, () => {
  console.log("Server is listening at 3400..");
});
