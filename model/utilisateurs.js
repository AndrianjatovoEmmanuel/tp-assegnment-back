let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UtilisateurSchema = Schema({
    _id: { type:String,required:true},
    id:{ type:Number,required:true},
    nom: { type:String,required:true},
    prenom: { type:String,required:true},
    nomUtilisateur:{ type:String,required:true},
    motDePasse:{ type:String,required:true},
    admin:{ type:Boolean,required:true},
    prof: { type:Boolean,required:true},
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('utilisateurs', UtilisateurSchema);