const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ctypto = require('crypto'); //암호화
dotenv.config();
const {StatusCodes} = require('http-status-codes');
//const { cookie } = require('express-validator');

const join = (req,res)=>{
    const {email, password} = req.body;
    const salt = ctypto.randomBytes(10).toString('base64'); //이렇게 하면 랜덤으로 됨
    const hashPassword = ctypto.pbkdf2Sync(password,salt,10000,10,'sha512').toString('base64'); //10글자의 암호화를 함

    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    let values = [email,hashPassword,salt];

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
            const hashPassword = ctypto.pbkdf2Sync(password,loginUser.salt,10000,10,'sha512').toString('base64'); //10글자의 암호화를 함
            if(loginUser && loginUser.password ==hashPassword){
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
    const {email} = req.body;
    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql,email,
        (err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
            }
            //email로 user가 있는지 찾아봐야 함
            const user = results[0];
            if(user){
                return res.status(StatusCodes.OK).json({
                    email : email
                });
            }else{
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }

        }
    )

    //res.json('비밀번호 초기화 요청');
}

const passwordReset = (req,res)=>{
    const {email,password} = req.body;
    let sql = 'UPDATE users SET password=?, salt=? WHERE email=?';
    
    const salt = ctypto.randomBytes(10).toString('base64'); //이렇게 하면 랜덤으로 됨
    const hashPassword = ctypto.pbkdf2Sync(password,salt,10000,10,'sha512').toString('base64'); //10글자의 암호화를 함
    let values = [hashPassword,salt,email];
    conn.query(sql,values,
        (err,results) => {
            if(err){
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQ
            }
            //email로 user가 있는지 찾아봐야 함
            if(results.affectedRows ==0){
                return res.status(StatusCodes.BAD_REQUEST).end();
            }else{
                return res.status(StatusCodes.OK).json(results);
            }
        }
    )
    //res.json('비밀번호 초기화');
}

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
};