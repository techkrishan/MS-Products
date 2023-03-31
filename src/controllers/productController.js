const { successResponse, errorResponse } = require("../utils/httpResponse");
const { getAllProducts, getProductDetails, saveProductDetails, editProductDetails } = require("../services/productService");

const listProducts = async (req, res) => {
  try {
    const responseData = await getAllProducts(req);
    return successResponse(res, { data: responseData });
  } catch (err) {
    return errorResponse(err, res, "listProducts");
  }
};

const viewProductDetails = async (req, res) => {
  try {
    const responseData = await getProductDetails(req.params.slug);
    return successResponse(res, { data: responseData });
  } catch (err) {
    return errorResponse(err, res, "listProducts");
  }
};

const addProduct = async (req, res) => {
  try {
    const responseData = await saveProductDetails(req.body);
    return successResponse(res, { data: responseData, statusCode: 201 });
  } catch (err) {
    return errorResponse(err, res, "listProducts");
  }
};

const editProduct = async (req, res) => {
  try {
    await editProductDetails(req.body);
    return successResponse(res, { data: { _id: req.body.id } });
  } catch (err) {
    return errorResponse(err, res, "Controller - editProduct");
  }
};

module.exports = {
  listProducts,
  viewProductDetails,
  addProduct,
  editProduct,
};
