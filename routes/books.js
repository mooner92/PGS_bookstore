const express = require('express');
const { allBooks, bookDetail, booksByCategory } = require('../controller/BookController');
const router = express.Router();

router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.get('/',allBooks);

router.get('/:id',bookDetail);

module.exports = router;
//
