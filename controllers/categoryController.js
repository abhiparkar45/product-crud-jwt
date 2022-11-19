const db = require("../models/index");
const Category = db.Category;
const successResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    if (categories) {
      return res
        .status(200)
        .json(
          successResponse("Categories retrieved successfully !", categories)
        );
    }
  } catch (err) {
    next(err);
  }
};
exports.postCategory = async (req, res, next) => {
  try {
    const categoryName = await req.body.categoryName;

    const exist = await Category.findOne({ where: { categoryName } });
    if (exist) {
      return res
        .status(400)
        .json(failerResponse("Category name already exists !"));
    }
    const result = await Category.create({ categoryName });
    if (result) {
      return res
        .status(201)
        .json(successResponse("Category created successfully !", result));
    }
  } catch (err) {
    next(err);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    const categoryID = await req.params.id;
    const categoryName = await req.body.categoryName;
    const exist = await Category.findOne({ where: { categoryID } });
    if (!exist) {
      return res.status(404).json(failerResponse("Category not found !"));
    }
    const updated = await Category.update(
      { categoryName },
      { where: { categoryID } }
    );
    if (updated) {
      const updatedCategory = await Category.findOne({ where: { categoryID } });
      return res
        .status(200)
        .json(
          successResponse("Category Updated successfully !", updatedCategory)
        );
    }
  } catch (err) {
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  const categoryID = await req.params.id;
  const exist = await Category.findOne({ where: { categoryID } });
  if (!exist) {
    return res.status(404).json(failerResponse("Category not found !"));
  }
  const deletedCategory = await Category.destroy({ where: { categoryID } });
  if (deletedCategory) {
    return res
      .status(200)
      .json(successResponse("Category deleted successfully !", exist));
  }
};
