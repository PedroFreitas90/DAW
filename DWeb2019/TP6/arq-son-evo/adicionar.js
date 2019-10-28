var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var db ="cancoes.json"


function adicionarNanoID(){
    jsonfile.readFile(db,(erro,cancoes)=>{
        if(!erro){
            cancoes.forEach(c=>c.id=nanoid())
            jsonfile.writeFile(db,cancoes,erro => {
                if(erro){
                    console.log("Erro: " +erro)
                }
                else
                    console.log("Registo gravado com sucesso!")
                

            })
        }
        else
        console.log("Erro de leitura.")
    
    })
}

adicionarNanoID()