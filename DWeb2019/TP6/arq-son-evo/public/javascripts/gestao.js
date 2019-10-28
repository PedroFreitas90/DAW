function apagaItem (ident){
    console.log("Apagar o " + ident)
    axios.delete('/' + ident)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}