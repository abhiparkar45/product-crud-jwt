const db = require("../models/index");
const Product = db.Product;
const Category = db.Category;
const failerResponse = require("../responseBuilder/failerResponse");
const successResponse = require("../responseBuilder/successResponse");
const { queryBuilder } = require("../utils/queryBuilderForProducts");

exports.getProducts = async (req, res, next) => {
  try {
    const query = await req.query;
    const querystring = await queryBuilder(query);
    const products = await Product.findAll(querystring);
    // const products = await Product.findAll({
    //   include: [
    //     {
    //       model: Category,
    //     },
    //   ],
    // });
    if (products) {
      return res
        .status(200)
        .json(successResponse("Product Retrieved successfully !", products));
    }
  } catch (err) {
    next(err);
  }
};
exports.postProduct = async (req, res, next) => {
  try {
    const body = await req.body;
    const productName = body.productName;
    const exist = await Product.findOne({ where: { productName } });
    if (exist) {
      return res.status(400).json(failerResponse("Product already exists !"));
    }
    const categoryExist = await Category.findOne({
      where: { categoryID: body.categoryID },
    });
    if (!categoryExist) {
      return res.status(404).json(failerResponse("Category Does not exist"));
    }
    const result = await Product.create({
      productName: body.productName,
      productPrice: body.productPrice,
      categoryID: body.categoryID,
    });
    if (result) {
      return res
        .status(201)
        .json(successResponse("Product Created successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const productID = await req.params.id;
    const body = await req.body;
    const exist = await Product.findOne({ where: { productID } });
    if (!exist) {
      return res.status(404).json(failerResponse("Product does not exist !"));
    }
    const categoryExist = await Category.findOne({
      where: { categoryID: body.categoryID },
    });
    if (!categoryExist) {
      return res.status(404).json(failerResponse("Category does not exists !"));
    }
    const updated = await Product.update(
      {
        productName: body.productName,
        productPrice: body.productPrice,
        categoryID: body.categoryID,
      },
      { where: { productID } }
    );
    if (updated) {
      const updatedProduct = await Product.findOne({ where: { productID } });
      return res
        .status(200)
        .json(
          successResponse("Product Updated successfully !", updatedProduct)
        );
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const productID = await req.params.id;
    const product = await Product.findOne({ where: { productID } });
    if (!product) {
      return res.status(404).json(failerResponse("Product Not found !"));
    }
    const deleted = await Product.destroy({ where: { productID } });
    if (deleted) {
      return res
        .status(200)
        .json(successResponse("Product Deleted Successfully !", product));
    }
  } catch (err) {
    next(err);
  }
};
