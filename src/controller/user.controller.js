import Usermodel from "../model/user.model.js";
import { ProductModel } from "../model/product.model.js";
export default class userController {
  getRegister(req, res) {
    res.render("register");
  }
  getLogin(req, res) {
    console.log("inside get login");
    res.render("login", { errorMessage: null });
  }
  postregister(req, res) {
    const { name, email, password } = req.body;
    console.log("name_register", name);
    console.log("email_register", email);
    console.log("password_register", password);
    console.log(req.body);
    console.log(req.file);
    Usermodel.addUser(name, email, password);
    res.render("login", { errorMessage: null });
  }
  postLogin(req, res) {
    const { email, password } = req.body;
    console.log("email_login", email);
    console.log("password_login", password);
    // console.log(req.body);
    const user = Usermodel.verifyUser(email, password);
    if (!user) {
      return res.render("login", { errorMessage: "Invalid credentials" });
    }
    var products = ProductModel.get();
    res.render("product", { products });
  }
}
