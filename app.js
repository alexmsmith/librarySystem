const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');

const mongojs = require('mongojs');
const db = mongojs('users');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* GLOBAL VARIABLES */
app.use(function(req, res, next) {
	res.locals.message = null;
	res.locals.errors = null;
	next();
});

// MIDDLEWARE
// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// express-validator
app.use(expressValidator());

// Set the static folder for css, js, imgs etc
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


// ROUTES
// get request
app.get('/', (req, res) => {
	res.render('login');
});
// get request (non-existing routes)
app.get('*', (req, res) => {
	res.render('error');
});


/* Librarian (GET) */
/*
app.get('/librarian', (req, res) => {
	db.books.find(function (err, docs) {
		//res.send(docs);
		res.render('librarian', {
			titles: docs
		});
	});
});
*/

/* Librarian (POST) */
app.post('/librarian', (req, res) => {
	
	// Express validator for form
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	
	const errors = req.validationErrors();
	if (errors) {
		res.render('login', {
			errors: errors
		});
	}else {
		let user = req.body.username;
		let pass = req.body.password;
		let message = "";
	
		db.customers.find(function (err, docs) {
			for(let i=0; i<docs.length; i++) {
				if (user === docs[i].username) {
					if (pass === docs[i].password) {
						message = "Success";
					}else {
						message = "Unsuccessful";
					}
				}else {
					message = "User not found";
				}
			}
		
			if (message === "Success") {
				// Book (POST)
				app.post('/librarian/add', (req, res) => {
					// Express validator for form
					req.checkBody('title', 'Title is required').notEmpty();
					req.checkBody('author', 'Author is required').notEmpty();
	
					const errors = req.validationErrors();
					if (errors) {
						res.render('librarian', {
							errors: errors
						});
					}else {
						let t = req.body.title;
						let a = req.body.author;
						db.books.insert({'Title' : t, 'Author' : a});
						db.books.find(function (err, docs) {
						res.render('librarian', {
							titles: docs
						});
					});
					}
				});

				db.books.find(function (err, docs){
					res.render('librarian', {
						titles: docs
					});
				});
			}else if (message === "Unsuccessful") {
				res.render('login', {
					message: message
				});
			}else if (message === "User not found") {
				res.render('login', {
					message: message
				});
			}
		});
	}
});

/*
app.get('/api/books/:Title', (req, res) => {
	const book = db.books.find(b => b.Title === parseInt(req.params.Title));
	if (!book) res.status(404).send('The book was not found'); // 404 (obejct not found)
	res.send(book);
});
*/


// PORT
const port = process.env.PORT || 3002;

// Listen on port
app.listen(port, function() {
	console.log(`Server started on port ${port}...`);
});