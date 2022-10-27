const express = require('express');
const categoryController = require('../controller/categoryController');

const router = express.Router();

router.post('/create', categoryController.createCategory);
router.post('/create-list', categoryController.createCategoryByList);
router.get('/list', categoryController.getCategoryList);

module.exports = router;
