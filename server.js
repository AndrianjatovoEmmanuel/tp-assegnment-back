let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let utilisateur = require('./routes/utilisateur');
let matiere = require('./routes/matieres');

let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://itumongo:mongo@clusteritu.hpfct.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

//API pour les Assignments
app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignmentsdetails')
  .get(assignment.getDetailsAssignment);

app.route(prefix + '/statassignments')
  .get(assignment.getDetailsAssignment);
  
app.route(prefix + '/assignmentsmax')
  .get(assignment.getAssignmentsMax);

app.route(prefix + '/statmatiere')
  .get(assignment.getStatByMatiere);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);

app.route(prefix + '/countAssignments')
  .get(assignment.CountAssignment);

app.route(prefix + '/countAssignmentsRendu')
  .get(assignment.CountAssignmentRendu);

app.route(prefix + '/countAssignmentsNonRendu')
  .get(assignment.CountAssignmentNonRendu);

app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

//API pour les utilisateurs
app.route(prefix + '/utilisateurs')
  .get(utilisateur.getUtilisateurs)
  .post(utilisateur.postUtilisateur)

app.route(prefix + '/utilisateurs/:id')
  .get(utilisateur.getUtilisateur)

app.route(prefix + "/matieres")
.get(matiere.getMatieres)

app.route(prefix + "/matieres/:id")
.get(matiere.getMatiere)

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


