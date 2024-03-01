import path from "path";
import { ProductModel } from "../model/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();
    console.log(products);
    console.log(path.resolve());
    res.render("product", { products });
    // return res.sendFile(
    //   path.join(path.resolve(), "src", "views", "product.html")
    // );
  }
  // getAddForm(req, res) {
  //   return res.render("new-product");
  // }
  // addNewProduct(req, res) {
  //   console.log(req.body);
  //   ProductModel.add(req.body);
  //   let products = ProductModel.get();
  //   return res.render("products", { products });
  // }
  getAddProduct(req, res, next) {
    res.render("new-product", { errormessage: null });
  }
  postAddProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.get();
    res.render("product", { products });
  }
  getUpdateProductView(req, res, next) {
    const id = req.params.id;
    const productfound = ProductModel.getById(id);
    if (productfound) {
      res.render("update-product", {
        product: productfound,
        errormessage: null,
      });
    } else {
      res.status(401).send("product not found..");
    }
  }
  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    let product = ProductModel.get();
    res.render("product", { products: product });
  }
  deleteProduct(req, res) {
    const id = req.params.id;
    const productfound = ProductModel.getById(id);
    if (!productfound) {
      res.status(401).send("product not found..");
    }
    ProductModel.delete(id);
    let products = ProductModel.get();
    res.render("product", { products });
  }
}
