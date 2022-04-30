let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatieresSchema = Schema({
    _id: { type:String,required:true},
    id:{ type:Number,required:true},
    matiere: { type:String,required:true},
    photo: { type:String,required:true},
    idProf: { type:Number,required:true},
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('matieres',MatieresSchema);