var mongoose = require('mongoose')
var jsonfile= require('jsonfile')


function mongoimport_function(db_name,collection_name,json_file){
    mongoose.connect('mongodb://localhost/'+db_name, {useNewUrlParser: true ,useUnifiedTopology: true })
        .then(()=>{
            jsonfile.readFile(json_file, (erro,dados)=>{
                if(erro){
                    console.log("----!!!!ERROR READING JSON FILE!!!!----")
                    return
                }
                else{
                    var newSchema = mongoose.Schema({},{ strict: false, collection: collection_name})
                    var newModel = mongoose.model(collection_name,newSchema)
                    var novo = new newModel(dados)
                    novo.save()
                        .then(()=>{
                            console.log("Success!")
                            mongoose.connection.close()
                        })
                        .catch(error => console.log(error))
                }
            })
        })
        .catch(() =>console.log("Error in mongoimport funtion!"))
}



function main(){
    var argc = process.argv.length
    if(argc == 3 && process.argv[2]=='--h'){
        console.log("To use this program, you should type this command: ")
        console.log("\n   node mongoimport DATABASE_NAME COLLECTION_NAME JSON_FILE\n")    
    }
    
    else if (argc == 5){
        mongoimport_function(process.argv[2], process.argv[3], process.argv[4]);
    }
    else if (argc < 5 && argc!= 3){
        console.log("Insuficient number of arguments.");
    }
    else{
        console.log("Wrong number of arguments.")
    }
}

main()


