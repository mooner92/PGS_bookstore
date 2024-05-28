const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.post('/join',(req,res)=>{
    const {email, password} = req.body;
    let sql = 'INSERT INTO (email, password) VALUES (?, ?)';
    let values = [email,password];

    conn.query(sql,values,
    (err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
        }

        res.status(StatusCodes.CREATED).json(results);
    })
    res.json('회원가입');
});

router.post('/login',(req,res)=>{
    res.json('로그인');
});

router.post('/reset',(req,res)=>{
    res.json('비밀번호 초기화 요청');
});

router.put('/reset',(req,res)=>{
    res.json('비밀번호 초기화');
});

module.exports = router;