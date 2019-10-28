var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var bd = __dirname + "/../cancoes.json"
// console.log(bd)

/* GET home page. */
router.get('/', function(req, res, next) {
  jsonfile.readFile(bd, (erro, cancoes) => {
    if(!erro){
      res.render('index', {lista: cancoes})
    }
    else{
      res.render('error', {error: erro})
    }
  })
})

router.get('/adicionar', function(req, res, next) {
      res.render('form', {})
})

router.get('/cancao:id',function(req,res,next){
  var id = req.params.id
  jsonfile.readFile(bd, (erro, cancoes) => {
    if(!erro){
      var index = cancoes.findIndex(a => a.id==id )
      if(index > -1){
       var c = cancoes[index] 
       res.render('cancao',{cancao : c})
        
       }
       else
       console.log('Index =-1')     
    }
    else
    console.log('Erro: não leu a base de dados.')
  })
})


router.get('/editar:id', function(req, res, next) {
  var id = req.params.id
  console.log(id)
  jsonfile.readFile(bd, (erro, cancoes) => {
    if(!erro){
      var index = cancoes.findIndex(a => a.id==id )
      if(index > -1){
       var c = cancoes[index] 
       res.render('editar',{cancao : c})
        
       }
       else
       console.log('Index =-1')     
    }
    else
    console.log('Erro: não leu a base de dados.')
  })
})




router.post('/', function(req, res) {
  jsonfile.readFile(bd, (erro, cancoes)=>{
    if(!erro){
      var obj = {
        prov: req.body.prov,
        local: req.body.local,
        tit: req.body.tit,
        musico: req.body.musico,
        file: {
          t: req.body.file,
          text: ""
        },
        duracao: req.body.duracao,
    
      };
      obj.id= nanoid()
      cancoes.push(obj)
      jsonfile.writeFile(bd, cancoes, erro => {
        if(erro) console.log(erro)
        else console.log('Registo gravado com sucesso.')
      })
    }
  })
  res.redirect('/')
})

router.post('/editar:id', function(req, res) {
  var id = req.params.id
  console.log(id)
  jsonfile.readFile(bd, (erro, cancoes) => {
    if(!erro){
      var index = cancoes.findIndex(a => a.id==id )
      if(index > -1){
      cancoes[index].prov=req.body.prov
      cancoes[index].local=req.body.local
      cancoes[index].tit=req.body.tit
      cancoes[index].musico=req.body.musico
      cancoes[index].file.t=req.body.file
      cancoes[index].duracao=req.body.duracao
      jsonfile.writeFile(bd, cancoes, erro => {
        if(erro) console.log(erro)
        else console.log('Registo gravado com sucesso.')
      })
    }
  }
  })
  res.redirect('/cancao'+id)
})



router.delete('/:id',function(req,res){
var id = req.params.id
jsonfile.readFile(bd, (erro, cancoes)=>{
    if(!erro){
        var index = cancoes.findIndex(a => a.id==id )
        if(index > -1){
            cancoes.splice(index, 1)
            jsonfile.writeFile(bd, cancoes, erro =>{
                if(erro) console.log(erro)
                else console.log("BD atualizada com sucesso.")
            })
            res.end('0')
        }
        else{
            console.log('Erro: não foi possível encontrar o elemento a remover.')
            res.end('1')
        }
    }
    else{
        console.log("Erro na leitura da Base de Dados.")
        res.end('1')
    }
})
//res.redirect('/')
})


module.exports = router