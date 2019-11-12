var Obra = require('../models/obras')

//Lista todas as obras (/obras)
module.exports.listar = () => {
    return Obra.find().exec()
}

//Lista todas as obras de um determinado ano (/obras?ano=X)
module.exports.listarAno = ano => {
    return Obra.find({anoCriacao:ano})
            .exec()
}

module.exports.listarCompositorDuracao = (comp,dur) =>{
    return Obra.find({$and:[{compositor:comp},{duracao:{"$gte":dur}}]}).exec()
}

module.exports.listarPeriodo = per =>{
    return Obra.find({periodo:per}).exec()
}

module.exports.consultar = id =>{
    return Obra.findOne({ _id : id }).exec()
}