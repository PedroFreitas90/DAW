var express = require('express');
var router = express.Router();
var Musicas = require('../controllers/musicas')

//GET /api/obras
router.get('/obras', function(req,res){
  var compositor = req.query.compositor
  var instrumento = req.query.instrumento
  
  if(compositor){
    Musicas.filtraCompositor(compositor)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }
  else if(instrumento){
    Musicas.filtraPartiturasInstrumento(instrumento)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else{
    Musicas.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
  }
});

//GET /api/obras/:id
router.get('/obras/:id',function(req,res){
  Musicas.consultar(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//GET /api/tipos
router.get('/tipos',function(req,res){
  Musicas.listarTipos()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

//GET /api/autores
router.get('/ObrasQuant',function(req,res){
  Musicas.listaObras()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports=router;