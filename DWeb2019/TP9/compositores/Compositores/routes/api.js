var express = require('express');
var router = express.Router();

var Compositores = require('../controllers/compositores')

/* GET home page. */
router.get('/compositores', function(req, res, next) {
  var ano = req.query.ano
  var periodo = req.query.periodo
  if(ano && periodo){
    Compositores.listaAnoPeriodo(ano,periodo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  else if(ano){
    Compositores.listaAno(ano)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  else if(periodo){
    Compositores.listarPeriodo(periodo)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    Compositores.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }  
});

router.get('/compositores/:id',function(req,res,next){
  Compositores.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});



module.exports = router;
