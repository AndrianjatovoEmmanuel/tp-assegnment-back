let Matieres = require('../model/matieres');

function getMatieres(req, res){
    Matieres.find((err, matieres) => {
        if(err){
            res.send(err)
        }
        res.send(matieres);
    });
}
function getMatiere(req, res){
    let matiereId = req.params.id;
    Matieres.findOne({id: matiereId}, (err, matieres) =>{
        if(err){res.send(err)}
        res.json(matieres);
    })
}

module.exports = {getMatieres,getMatiere};