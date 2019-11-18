var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var ano = req.query.ano 
  var periodo = req.query.periodo
  if(ano && periodo){
    axios.get('http://localhost:3000/api/compositores?ano='+ano+'&periodo='+periodo)
      .then(dados => res.render('lista-compositores',{compositores:dados.data}))
      .catch(erro => res.render('error',{error: erro}))
  }
  else if(ano){
    axios.get('http://localhost:3000/api/compositores?ano='+ano)
      .then(dados => res.render('lista-compositores',{compositores:dados.data}))
      .catch(erro => res.render('error',{error: erro}))
  }
  else if(periodo){
    axios.get('http://localhost:3000/api/compositores?periodo='+periodo)
      .then(dados => res.render('lista-compositores',{compositores:dados.data}))
      .catch(erro => res.render('error',{error: erro}))
  }
  else{
    axios.get('http://localhost:3000/api/compositores')
      .then(dados => res.render('lista-compositores',{compositores:dados.data}))
      .catch(erro => res.render('error',{error: erro}))
  }  
});

router.get('/:id', function(req,res,next){
  axios.get('http://localhost:3000/api/compositores/'+req.params.id)
    .then(dados => res.render('compositor',{compositor:dados.data}))
    .catch(erro => res.render('error',{error:erro}))
})

module.exports = router;
