const express = require('express');
const router = express.Router();
const axios = require('axios')
const lhost = require('../config/env').host

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(lhost + '/api/ficheiros')
    .then(dados=> {
      res.render('index',{lista: dados.data});
    })
    .catch(erro =>{
      res.render('error',{error: erro})
    })
});

/*Download file */
router.get('/download/:fnome',function(req,res,next){
  res.download(__dirname + '/../public/ficheiros/' + req.params.fnome)
});



module.exports = router;
