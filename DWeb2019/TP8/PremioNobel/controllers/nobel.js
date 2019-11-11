var Nobel = require('../models/nobels')

// Devolve a lista de prémios apenas com os campos "year" e "category"
module.exports.listar = () =>{
    return Nobel.find({},{_id: 0, year: 1, category: 1})
            .exec()
}

// Devolve a informação completa de um prémio
module.exports.consultar = id =>{
    return Nobel.findById(id).exec()
}

// Devolve a lista de categorias, sem repetições
module.exports.listarCategorias = () =>{
    return Nobel.aggregate([{$group : {_id: "$category"}}]).exec()
}

//Devolve a lista de prémios que tenham o campo "category" com o valor "YYY"
module.exports.pesquisarCategorias = cat =>{
    return Nobel.find({category: cat}).exec()
}

// Devolve a lista de prémios que tenham o campo "category" com o valor "YYY" e o campo "year" com um valor superior a "AAAA"
module.exports.pesquisarCategoriasAno = (cat,ano) =>{
    return Nobel.find({category: cat, year : {$gt: ano } }).exec()
}

// Devolve uma lista ordenada alfabeticamente por nome dos laureados com os campos correspondentes ao nome, ano do prémio e categoria
module.exports.listaOrdenada = () =>{
    return Nobel
        .aggregate([ {$unwind: "$laureates"},
                    {$group:{_id:"$laureates.id",firstname:{$first:"$laureates.firstname"},surname: {$first: "$laureates.surname"},
                    "premio":{$push: {"ano":"$year","categoria":"$category"}} } } ])
            .exec()
}


