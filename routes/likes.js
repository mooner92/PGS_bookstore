const express = require('express');
const router = express.Router();

router.use(express.json()); //post는 값이 필요해서 이거 해줌

router.post('/:id',(req,res)=>{
    res.json('좋아요추가');
});

router.delete('/:id',(req,res)=>{
    res.json('좋아요삭제');
});



module.exports = router;