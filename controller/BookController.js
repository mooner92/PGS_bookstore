const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');


const allBooks = (req,res)=>{
    let sql = "SELECT * FROM books";

    conn.query(sql,
        (err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
            }
    
            res.status(StatusCodes.OK).json(results);
        })
    //res.json('전체도서조회');
}
const bookDetail = (req,res)=>{
    let {id} = req.params;

    let sql = "SELECT * FROM books WHERE id=?";

    conn.query(sql,id,
        (err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
            }
            if(results[0])
                return res.status(StatusCodes.OK).json(results);
            else
                res.status(StatusCodes.NOT_FOUND).end();
        })
    //res.json('전체도서조회');
}
const booksByCategory = (req,res)=>{
    res.json('전체도서조회');
}

module.exports = {
    allBooks,
    bookDetail,
    booksByCategory
}
