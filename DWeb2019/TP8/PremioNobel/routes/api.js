var express = require('express');
var router = express.Router();

var Nobels = require('../controllers/nobel')

//GET nobels listing
router.get('/premios', function(req, res, next) {
    var categoria = req.query.categoria
    var ano = req.query.data
    if(categoria && ano){
        Nobels.pesquisarCategoriasAno(categoria,ano)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
        
    else if(categoria){
        Nobels.pesquisarCategorias(categorias)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
    else {    
    Nobels.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
});

// GET nobel info by id
router.get('/premios/:id',function(req,res,next){
    Nobels.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro)) 
});


router.get('/categorias', function(req, res, next) {
    Nobels.listarCategorias()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});


router.get('/laureados', function(req, res, next) {
    Nobels.listaOrdenada()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});



module.exports=router;