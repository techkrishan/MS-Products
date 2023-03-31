const {
  getProducts,
  saveProduct,
  getCount,
  getProduct,
  updateProductById,
} = require("../dao/productDao");
const productModel = require("../models/productModel");
const CustomError = require("../utils/customError");
const {
  PRODUCT_SLUG_ALREADY_EXISTS, PRODUCT_NOT_FOUND,
} = require("../messages/validationMessages");
const { UN_PROCESSABLE_ENTITY, NOT_FOUND } = require("../constants/statusCodes");
const { paginateOptions } = require("../helpers/paginationHelper");
const { sortingOptions, searchOptions } = require("../helpers/searchHelper");

const sortableField = ['title', 'slug', 'quantity', 'created_at', 'updated_at'];

/**
 * This function is used to validate a product exist or not by ID
 * @param {string} id Product ID
 */
const isProductExist = async (id) => {
  const isExist = await getCount({ _id: id });
  if (!isExist) {
    throw new CustomError(NOT_FOUND, PRODUCT_NOT_FOUND);
  }
}

const isUniqueProductSlug = async (slug, id = null) => {
  const filter = { slug };
  if (id) {
    filter._id = { $ne: id };
  }
  const productCount = await getCount(filter);
  if (productCount > 0) {
    throw new CustomError(UN_PROCESSABLE_ENTITY, PRODUCT_SLUG_ALREADY_EXISTS);
  }
}

const getAllProducts = async (req) => {

  const sortByObj = sortingOptions(req, sortableField)
  const searchString = searchOptions(req);

  let conditions = {};
  if (searchString !== false) {
    conditions = { ...searchString };
  }
  let paginationOptions = paginateOptions(req, sortByObj);
  return productModel.paginate(conditions, paginationOptions);
};

const getProductDetails = async (slug) => {
  const product = await getProduct({ slug });

  if (!product) {
    throw new CustomError(NOT_FOUND, PRODUCT_NOT_FOUND);
  }
  return product;
};

const saveProductDetails = async (requestData) => {
  // Validate unique product slug
  await isUniqueProductSlug(requestData.slug);

  // Save product details
  return saveProduct({
    title: requestData.title,
    slug: requestData.slug.toLowerCase(),
    description: requestData.description,
    quantity: requestData.quantity,
  });
};

const editProductDetails = async (requestData) => {
  // Validate product exists
  if (requestData.id) {
    await isProductExist(requestData.id);
  }
  // Validate unique product slug
  await isUniqueProductSlug(requestData.slug, requestData.id);

  // Save product details
  return updateProductById(requestData.id, {
    title: requestData.title,
    slug: requestData.slug.toLowerCase(),
    description: requestData.description,
    quantity: requestData.quantity,
  });
};

module.exports = {
  getAllProducts,
  getProductDetails,
  saveProductDetails,
  editProductDetails,
};
