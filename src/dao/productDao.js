const ProductModel = require("../models/productModel");

/**
 * Fetch all the products from the database
 * @param {object} filter Filter the products based on provided filters
 * @param {object} projection Filter the fetched filled by projection
 * @returns {Promise}
 */
const getProducts = async (filter, projection = {}) => {
  filter.is_deleted = false;
  return ProductModel.find(filter, projection).lean().exec();
};

/**
 * Add new product in the database.
 * @property {object} data - Data to be save.
 * @returns {Promise}
 */
const saveProduct = async (data) => {
  const result = await (new ProductModel(data).save());
  return { _id: result._id};
};

/**
 * This function is used to get product details by the matching filters
 * @param {object} filter Filter conditions to get the product details
 * @returns
 */
const getProduct = async (filter, projection = {}) => {
  return ProductModel.findOne(filter, projection).lean().exec();
};

/**
 * get single object of product by ID.
 * @property {string} id - product ID
 * @returns {Promise}
 */
const getProductById = async (id, projection) => {
  return ProductModel.findById(id, projection).lean().exec();
};

/**
 * This function is used to count document on the basis of filter
 * @param {object} query match condition
 * @returns {Promise} return count of the object that match with the filter
 */
const getCount = async (query) => {
  return ProductModel.countDocuments(query);
};

/**
 * This function is used to check is the object exists with the provided filter query
 * @param {object} query match condition
 * @returns {boolean}
 */
const isProductExist = async (query) => {
  return ProductModel.countDocuments(query);
};

/**
 * This function is used to update the product details
 * @param {string} id Product ID
 * @returns {object} data Data object to be update
 */
const updateProductById = async (id, data) => {
  return ProductModel.updateOne({ _id: id }, data);
};

const isProductExistWithSlug = async (slug, id = null) => {
  const query = { slug };
  if (id) {
    query._id = { $ne: id };
  }
  return ProductModel.countDocuments(query);
};

module.exports = {
  getProducts,
  saveProduct,
  getProduct,
  getProductById,
  getCount,
  isProductExist,
  updateProductById,
  isProductExistWithSlug,
};
