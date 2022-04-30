const { status } = require('express/lib/response');
let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
/*function getAssignments(req, res){
    console.log("Function getAssignments");
    Assignment.find((err, assignments) => {
        if(err){
            res.send(err)
        }
        res.send(assignments);
    });
}*/


function getAssignments(req, res) {
    console.log("Function getAssignments")
    var aggregateQuery = Assignment.aggregate();
    
    console.log("req.query.page" + req.query.page)
    console.log("req.query.limit" + req.query.limit)
    
    Assignment.aggregatePaginate(aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    console.log("Function getAssignment");
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

function getDetailsAssignment(req, res) {
    Assignment.aggregate([
        {
            $lookup:
            {
                from: 'utilisateurs',
                localField: 'idAuteur',
                foreignField: 'id',
                as: 'auteur'
            }
        }
    ], (err, assignment) => {
        if (err) {
            res.send(err)
        }
        res.send(assignment);
    });
}

function getStatAssignment(req, res) {
    Assignment.$match({note : { $gt :10}}, (err, res) => {
        if (err) {
            res.send(err)
        }
        console.log(res)
        //res.json({ count: count });
    });
}

function CountAssignment(req, res) {
    Assignment.countDocuments({}
        , (err, count) => {
            if (err) {
                res.send(err)
            }
            res.json({ count: count });
        });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    console.log("Fonction postAssignment ")
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;
    assignment.idMatiere = req.body.idMatiere;
    assignment.idAuteur = req.body.idAuteur;
    assignment.remarque = req.body.remarque;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save((err) => {
        if (err) {
            console.log(err)
        }
        res.json({ message: `${assignment.nom} saved depuis la version HEROKU!` })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("Fonction updateAssignment ")

    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({ message: 'updated' })
        }
    });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    console.log("Fonction deleteAssignment ")
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted` });
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment, getDetailsAssignment, CountAssignment,getStatAssignment };
