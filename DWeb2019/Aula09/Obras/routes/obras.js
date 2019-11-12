var express = require('express');
var router = express.Router();

var Obras = require('../controllers/obras')



/*GET obras*/
router.get('/', function (req,res,next){
  var ano = req.query.ano
  var compositor = req.query.compositor
  var duracao = req.query.duracao
  var periodo = req.query.periodo
  
  if(compositor && duracao){
    Obras.listarCompositorDuracao(compositor,duracao)
      .then(dados=> res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }

  else if (ano){
    Obras.listarAno(ano)
      .then(dados=> res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }

  else if(periodo){
    Obras.listarPeriodo(periodo)
      .then(dados=> res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  
  else{
    Obras.listar()
      .then(dados=> res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
});

/*Consultar uma obra*/
router.get('/:id',function(req,res,next){
  Obras.consultar(req.params.id)
  .then(dados=> res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
