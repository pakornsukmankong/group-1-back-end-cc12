const AppError = require('../utils/appError');
const { Category } = require('../models');

exports.createCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryIconImage } = req.body;

    if (!categoryName || !String(categoryName)) {
      throw new AppError('categoryName is invalid', 400);
    }

    if (!categoryIconImage || !String(categoryIconImage)) {
      throw new AppError('categoryIconImage is invalid', 400);
    }

    // create category one
    const category = await Category.create({
      categoryName: categoryName || null,
      categoryIconImage
    });
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};

exports.createCategoryByList = async (req, res, next) => {
  try {
    const { list } = req.body;

    if (!Array.isArray(list)) {
      throw new AppError('list is invalid', 400);
    }

    if (list && list.length) {
      const dataList = list.map((category) => {
        return {
          categoryName: category.categoryName,
          categoryIconImage: category.categoryIconImage
        };
      });
      const resList = await Category.bulkCreate(dataList);
      res.status(200).json({
        data: resList
      });
    } else {
      res.status(500).json({ msg: 'please category list' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getCategoryList = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
};

// Mock data for category list
// {
//   "list": [
//     {
//       "categoryName": "Creative spaces",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg"
//     },
//     {
//       "categoryName": "Design",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
//     },
//     {
//       "categoryName": "Amazing views",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
//     },
//     {
//       "categoryName": "Beachfront",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg"
//     },
//     {
//       "categoryName": "Castles",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg"
//     },
//     {
//       "categoryName": "Lake",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg"
//     },
//     {
//       "categoryName": "Beach",
//       "categoryIconImage":
//         "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg"
//     }
//   ]
// };
