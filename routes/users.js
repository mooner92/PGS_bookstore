const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const {join,login,passwordReset,passwordResetRequest} = require("../controller/UserController")
router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.post('/join',join);

router.post('/login',login);

router.post('/reset',passwordResetRequest);

router.put('/reset',passwordReset);

module.exports = router;