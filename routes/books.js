const express = require('express');
const router = express.Router();

router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.get('/',(req,res)=>{
    res.json('전체도서조회');
});

router.get('/:id',(req,res)=>{
    res.json('개별도서조회');
});

router.get('/',(req,res)=>{
    res.json('비밀번호 초기화 요청');
});

router.put('/reset',(req,res)=>{
    
    res.json('비밀번호 초기화');
});

module.exports = router;