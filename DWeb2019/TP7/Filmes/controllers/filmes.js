var Filme = require("../models/filmes")

const Filmes = module.exports

Filmes.listar = limit => {
    if (limit)
        return Filme.find().sort({ title: 1 }).limit(25).exec()
    else
        return Filme.find().sort({ title: 1 }).exec()
}

Filmes.consultar = id => {
    return Filme
            .findOne({ _id: id })
            .exec()
}

Filmes.inserir = filme => {
    return Filme
            .create(filme)
}

Filmes.eliminar = id => {
    return Filme
            .deleteOne({ _id: id })
}

Filmes.atualizar = (id, filme) => {
    return Filme
            .updateOne({ _id: id }, filme)
}
