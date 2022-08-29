const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.render('index');

});
router.get('/register',(req,res)=>{
    res.render('register');
});
router.get('/cart',(req,res)=>{
    res.render('cart');
});
router.get('/final',(req,res)=>{
    res.render('final');
});
router.get('/login',(req,res)=>{
    res.render('login');
});
router.get('/index',(req,res)=>{
    res.render('index');
});
router.get('/index2',(req,res)=>{
    res.render('index2');
});
router.get('/index2',(req,res)=>{
    res.render('index2');
});

module.exports=router;