var Musica = require('../models/musicas')

// Devolve a lista de obras musicais apenas com os campos "id", "titulo", "tipo" e "compositor";
module.exports.listar = () => {
    return Musica
            .find({},{_id:0,id:1,titulo:1,tipo:1,compositor:1})
            .exec()
}

//Devolve a informação completa de uma obra;
module.exports.consultar = id =>{
    return Musica
            .find({id: id})
            .exec()
}

// Devolve a lista de tipos, sem repetições;
module.exports.listarTipos = () =>{
    return Musica
            .distinct('tipo')
            .exec()
}

//Devolve a lista de obras que tenham o campo "compositor" com o valor "XXX";
module.exports.filtraCompositor = c =>{
    return Musica
            .find({compositor: c})
            .exec()
}

//Devolve a lista de obras que tenham uma ou mais partituras para o instrumento III;
module.exports.filtraPartiturasInstrumento = inst =>{
        return Musica
                .find({instrumentos : {$elemMatch: {designacao: inst}}})
                .exec()
    }

//Devolve uma lista de obras musicais com os seguintes campos: id, titulo, partituras (número de partituras disponíveis);

module.exports.listaObras = () =>{
    return Musica
    .aggregate([{$project: {id:1,titulo:1,_id:0,numeroPartituras: { $cond: { if: { $isArray: "$instrumentos.partitura" }, then: { $size: "$instrumentos" }, else: "0"} }}}])
    .exec()
    }
    

//module.exports.listaOrdenada = () =>{
 //   return Nobel
  //      .aggregate([ {$unwind: "$laureates"},
   //                 {$group:{_id:"$laureates.id",firstname:{$first:"$laureates.firstname"},surname: {$first: "$laureates.surname"},
    //                "premio":{$push: {"ano":"$year","categoria":"$category"}} } } ])
     //       .exec()
//}


//,{$match: {designacao: inst}}