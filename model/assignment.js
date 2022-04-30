let mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id:{ type: Number,required:true},
    dateDeRendu: { type:Date,required:true},
    nom: { type: String,required:true},
    rendu : { type:Boolean,required:true},
    note : { type : Number , required:false ,min: 0, max: 20},
    idAuteur:{ type: Number,required:true},
    idMatiere:{ type: Number,required:true},
    remarque:{type:String,required:false},
    datecreation : {type :Date , default: new Date()}
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('assignments', AssignmentSchema);