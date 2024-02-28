import { body, validationResult } from "express-validator";
const validateMiddlewarePostAddRequest = async (req, res, next) => {
  // 1.Setup rules for Validation
  const rules = [
    body("name").notEmpty().withMessage("Name is require"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageUrl").isURL().withMessage("Invalid Url"),
  ];
  // 2.Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  //  3.Check if there are any errors in the code
  let validationErrors = validationResult(req);
  // 4.If errors returns the error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errormessage: validationErrors.array()[0].msg,
    });
  }
  // const { name, price, imageUrl } = req.body;
  // let errors = [];
  // if (!name || name.trim() == "") {
  //   errors.push("Name is required");
  // }
  // if (!price || parseFloat(price) < 1) {
  //   errors.push("price must be a positive value");
  // }
  // try {
  //   const validUrl = new URL(imageUrl);
  // } catch (err) {
  //   errors.push("URL is invalid");
  // }
  // if (errors.length > 0) {
  //   return res.status(401).render("new-product", { errormessage: errors[0] });
  // }
  next();
};
export default validateMiddlewarePostAddRequest;
