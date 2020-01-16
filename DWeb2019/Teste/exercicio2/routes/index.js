var express = require('express');
var router = express.Router();
var axios = require('axios');

var api = 'http://clav-api.dglab.gov.pt/api/'
var apikey = 'apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ'
var fullinfo = 'info=completa&'+apikey

/* GET home page. */
router.get('/', function(req, res) {
  axios.get(api+'entidades?' + apikey)
    .then(dados=>{
      res.render('index',{ lista: dados.data})
    })
    .catch(erro=>{
      res.render('error',{error: erro});
      })
});

router.get('/entidades/:id',function(req,res){
  var id = req.params.id
  axios.get(api+'/entidades/'+id+'?'+fullinfo)
    .then(dados=> res.render('entidade',{e: dados.data}))
    .catch(erro => res.render('error',{error:erro}))
})

router.get('/tipologia/:id',function(req,res){
  var id = req.params.id
  axios.get(api+'tipologias/'+id+'?'+fullinfo)
    .then(dadosTipologia =>{
      axios.get(api+'tipologias/'+id+'/elementos?'+fullinfo)
        .then(dadosElementos =>{
          res.render('tipologia',{t : dadosTipologia.data , elems: dadosElementos.data})
        })
        .catch(erro => res.render('error',{error: erro}))
    })
    .catch(erro => res.render('error',{error: erro}))
})




module.exports = router;