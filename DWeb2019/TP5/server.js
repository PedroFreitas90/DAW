var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')
var myBD = "tarefas.json"

var myServer = http.createServer((req,resp)=>{
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log(req.method + ' ' + purl.pathname )

    if(req.method == 'GET'){
        if((purl.pathname == '/')||(purl.pathname == '/index')){
            jsonfile.readFile(myBD, (erro,alunos)=>{
                resp.writeHead(200,{
                    'Content-Type': 'text/html; charset=utf-8'
                })
                if(!erro){
                    resp.write(pug.renderFile('index.pug', {lista: alunos}))
                }
                else{
                    resp.write(pug.renderFile('erro.pug', {e: "Erro na leitura da BD"}))
                }
                resp.end()
            })
        }
        else if(purl.pathname == '/w3.css'){
            resp.writeHead(200, {'Content-Type': 'text/css'})
            fs.readFile('stylesheets/w3.css', (erro, dados)=>{
                if(!erro){
                    resp.write(dados)
                }
                else{
                    resp.write("<p>Erro: " + erro + "</p>")
                }
                resp.end()
            })
        }
        else {
            resp.write(200,{
                'Content-Type': 'text/html; charset=utf-8'
            })
            resp.write(pug.renderFile('erro.pug', {e: "Pedido Desconhecido"}))
            resp.end()
        }
    }

    else if(req.method == 'POST'){
        if(purl.pathname == '/index'){
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, alunos)=>{
                    if(!erro){
                        alunos.push(resultado)
                        jsonfile.writeFile(myBD, alunos, erro => {
                            if(erro)
                                console.log(erro)
                            else{
                                console.log('Registo gravado com sucesso...')
                                resp.writeHead(302, {Location: "/index"});// redireciona para o /
                                  resp.end();
                            }
                        })
                    }
                })
            })
        }
        
        else{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            resp.write(pug.renderFile('erro.pug', {e: "Pedido Desconhecido"}))
            resp.end()
        }
    }
    
    else{
        resp.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        console.log("ERRO: " + req.method + " não  suportado")
        resp.write(pug.renderFile('erro.pug', 
            {e: "ERRO: " + req.method + " não suportado"}))
        resp.end()
    }
})

myServer.listen(9090, ()=>{
    console.log("Servidor à escuta na porta 9090...")
})

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}