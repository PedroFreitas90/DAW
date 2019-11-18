var Compositor = require('../models/compositores')

//Listar todos os compositores
module.exports.listar = () =>{
    return Compositor.find().exec()
}

//Consultar informação de um compositor
module.exports.consultar = id =>{
    return Compositor.findOne({_id : id}).exec()
}

//listar compositores de um periodo
module.exports.listarPeriodo = per =>{
    return Compositor.find({periodo: per}).exec()
}

//listar compositores de um ano e periodo
module.exports.listaAnoPeriodo = (year,per) =>{
    return Compositor.find({dataNasc:{"$lt":year},dataObito:{"$gt":year}, periodo: per}).exec()
}

//listar compositores vivos num dado ano
module.exports.listaAno = year =>{
    return Compositor.find({dataNasc:{"$lt":year},dataObito:{"$gt":year}}).exec()
}