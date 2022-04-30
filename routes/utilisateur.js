let Utilisateur = require('../model/utilisateurs');

// Récupérer tous les assignments (GET)
function getUtilisateurs(req, res){
    
    Utilisateur.find((err, utilisateur) => {
        if(err){
            res.send(err)
        }
        res.send(utilisateur);
    });
}
// Récupérer un assignment par son id (GET)
function getUtilisateur(req, res){
    let utilisateurId = req.params.id;

    Utilisateur.findOne({id: utilisateurId}, (err, utilisateur) =>{
        if(err){res.send(err)}
        res.json(utilisateur);
    })
}

function postUtilisateur(req, res){
    console.log(req)
    console.log("Params 1 : "+req.body.nomUtilisateur);
    console.log("Params 2 : "+req.body.motDePasse);
    
    let nomUtilisateur = req.body.nomUtilisateur;
    let motdepasse = req.body.motDePasse;
    Utilisateur.findOne({nomUtilisateur: nomUtilisateur,motDePasse:motdepasse}, (err, utilisateur) =>{
        if(err){
            res.send(err)
        }
        res.send(utilisateur);
    })
}

module.exports = {getUtilisateurs,getUtilisateur,postUtilisateur};
