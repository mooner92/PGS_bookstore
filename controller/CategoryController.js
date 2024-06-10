const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const allCategory = (req,res)=>{
    
        let sql = "SELECT * FROM category";

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

module.exports = {
    allCategory
}