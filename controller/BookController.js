const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');


const allBooks = (req,res)=>{
    res.json('전체도서조회');
}
const bookDetail = (req,res)=>{
    res.json('전체도서조회');
}
const booksByCategory = (req,res)=>{
    res.json('전체도서조회');
}

module.exports = {
    allBooks,
    bookDetail,
    booksByCategory
}
