var express = require('express');
var router = express.Router();
const axios = require('axios')
const apiKey = '?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ'

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades'+apiKey)
  .then(dados =>res.render('index', {lista : dados.data}))
  .catch(erro=>{res.render('error',{error:erro})})
});

router.get('/:id',function(req, res, next) {
  var id = req.params.id
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/ent_'+id+apiKey)
  .then(dados =>{
    var entidade_data=dados.data
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/ent_'+id+'/tipologias'+apiKey)
      .then(dadostipologias =>{
        entidade_data.tipologias= dadostipologias.data
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/ent_'+id+'/intervencao/dono'+apiKey)
          .then(dono=>{
            entidade_data.dono=dono.data
            axios.get('http://clav-api.dglab.gov.pt/api/entidades/ent_'+id+'/intervencao/participante'+apiKey)  
              .then(participante=>{
                entidade_data.participante = participante.data
                res.render('entidade', {entidade : entidade_data})
              })
          })
      })
  })
  .catch(erro=>{res.render('error',{error:erro})})
});
module.exports = router;