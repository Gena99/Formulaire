// Inclure les librairies tierces
var express = require('express');
var bodyParser = require('body-parser');

// Créer une instance du serveur express
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Déclarer Ejs comme moteur de template
//app.set('view engine', 'ejs');
//app.use(express.static('node_modules'));
//app.use(express.static('css'));
//app.use(express.static('js'));

// Crééer les routes
app.get('/', function(req, res){
        console.log('servir la page d\'accueil');
        res.end('index');
	//res.render('pages/index');
    });

app.post('/enregistrerutilisateur', function(req, res){
	console.log(req.body);
	// Tester la présence et la taille différente de 0 des variables attendues
	// Déclarer un tableau pour recueillir les erreurs rencontrées lors des tests
	var erreur = {};
	// Declarer une liste des variables attendues et les tester dans une boucle
	var listeVariablesAttendues = Array('nom', 'prenom', 'login', 'motDePasse', 'civilite', 'dateNaissance', 'ville', 'email', 'website', 'hobbys', 'numeroTelephone', 'couleurPreferee');
	listeVariablesAttendues.forEach(function(parametre, index ){
		if(req.body.hasOwnProperty(parametre)=== false || req.body[parametre].length === 0){
		    //error.push( "Parametre " + parametre + " non fourni ou vide.");
		    erreur[parametre] = "Parametre " + parametre + " non fourni ou vide."; 
		}
	});

	// tests spécifiques à certaines variables
	// login ne doit déjà exister
	if(req.body.hasOwnProperty('login') && req.body.login == 'toto'){
	    erreur.login = "Ce login existe déjà veuillez en choisir un autre.";
	}

	// mot de passe
	var expressionReguliere = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{8,}$/g;
	if(req.body.hasOwnProperty('motDePasse') && req.body.motDePasse.match(expressionReguliere) === null){
	    erreur.motDePasse = "Le mot de passe doit contenir au moins 8 caractères dont au moins une majuscule, un caractère spécial et un chiffre";
	}

	//hobbys
	if(req.body.hasOwnProperty('hobbys') && req.body.hobbys.length > 200){
	    erreur.hobbys = "Maximum 200 caractères";
	}
	// 

	// Si il y a eu une ou des erreurs, on renvoie un status d'erreur 400 (http://www.restapitutorial.com/httpstatuscodes.html) et le message d'erreur
	if(Object.keys(erreur).length > 0){
	    res.status(400).json(erreur);
	}
	// sinon on renvoie un status 200 et un message de victoire
	res.end('YOUHOU utilisateur reçu');
});

var port = 3337;
app.listen(port);
console.log('Le serveur ecoute sur le port : ' + port);