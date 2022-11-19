const { Op } = require("sequelize");
const db = require("../models/index");
const Category = db.Category;

exports.queryBuilder = async (query) => {
  const keyword = await query.keyword;
  const categoryid = await query.categoryid;
  const sortby = await query.sortby;
  const limit = (await query.limit) || 5;
  const page = (await query.page) || 1;
  const offset = limit * (page - 1) || 0;
  let minprice = (await query.minprice) ? query.minprice : 0;
  const maxprice = await query.maxprice;

  const search = {
    productName: {
      [Op.like]: "%" + keyword + "%",
    },
  };

  const filtercategory = {
    categoryID: {
      [Op.eq]: categoryid,
    },
  };
  const filterprice = {
    productPrice: {
      [Op.between]: [minprice, maxprice],
    },
  };

  let queryString = {};
  let filterArr = [];

  if (keyword) {
    filterArr.push(search);
  }
  if (categoryid) {
    filterArr.push(filtercategory);
  }

  if (maxprice) {
    filterArr.push(filterprice);
  } else {
    filterArr.push({
      productPrice: {
        [Op.gt]: minprice,
      },
    });
  }

  queryString = {
    where: {
      [Op.and]: filterArr,
    },
    include: [
      {
        model: Category,
      },
    ],
    order: sortby ? [[String(sortby)]] : [["productID"]],
    limit: Number(limit),
    offset,
  };

  return queryString;
};
