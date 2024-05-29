const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const {StatusCodes} = require('http-status-codes');
const { cookie } = require('express-validator');

const join = (req,res)=>{
    const {email, password} = req.body;
    let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    let values = [email,password];

    conn.query(sql,values,
    (err,results) => {
        if(err){
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
        }

        res.status(StatusCodes.CREATED).json(results);
    })
    //res.json('회원가입');
}

const login = (req,res)=>{
    const {email,password} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    let values = [email,password];
    conn.query(sql,values,
        (err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
            }
            const loginUser = results[0];
            if(loginUser && loginUser.password ==password){
                const token = jwt.sign({
                    email : loginUser.email
                },process.env.PRIVATE_KEY,{
                    expiresIn : '5m',
                    issuer : "mooner92"
                });
                res.cookie("token",token,{
                    httpOnly : true
                });
                console.log(token);
                return res.status(StatusCodes.OK).json(results);
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).end(); //401 : unauthorized , 403 : forbidden | 401은 서버가 사용자가 누군지 모를 때, 403은 서버가 유저가 누군지 알 때 (둘 다 접근권한 관련임)
            }
        })
    //res.json('로그인');
}

const passwordResetRequest = (req,res)=>{
    res.json('비밀번호 초기화 요청');
}

const passwordReset = (req,res)=>{
    res.json('비밀번호 초기화');
}

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};