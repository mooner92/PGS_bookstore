const express = require('express');
const { allCategory } = require('../controller/CategoryController');
const router = express.Router();

router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.get('/',allCategory);

//router.get('/:id',bookDetail);

module.exports = router;
