const validateMiddleware = require("../middleware/validateMiddleware");
const { addProductValidator, editProductValidator, viewProductValidator } = require("../validations/productValidations");
const {
  listProducts,
  viewProductDetails,
  addProduct,
  editProduct,
} = require("../controllers/productController");

module.exports = (app) => {
  app.get("/", listProducts);
  app.get("/:slug", validateMiddleware(viewProductValidator, "params"), viewProductDetails);
  app.post("/", validateMiddleware(addProductValidator, "body"), addProduct);
  app.put("/", validateMiddleware(editProductValidator, "body"), editProduct);
  // app.patch("/", validateMiddleware(idProductValidator), addProduct);
  // app.delete("/", validateMiddleware(idProductValidator, "params"), addProduct);
};
