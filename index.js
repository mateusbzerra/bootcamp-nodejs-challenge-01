const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
/*
=== Middlewares ===
const loginMiddleware = (req, res, next) => {
	console.log(`HOST: ${req.headers.host}`);
	return next();
};
app.use(loginMiddleware);
*/

const ageMiddleware = (req, res, next) => {
	if (req.query.age) {
		return next();
	} else {
		return res.redirect('/');
	}
};

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true
});

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'njk');

app.get('/', (req, res) => {
	res.render('form');
});

app.get('/new', (req, res) => {
	res.render('new');
});
app.get('/major', ageMiddleware, (req, res) => {
	res.render('major', { age: req.query.age });
});
app.get('/minor', ageMiddleware, (req, res) => {
	res.render('minor', { age: req.query.age });
});

app.post('/check', (req, res) => {
	const { age } = req.body;
	let page = '';
	if (age > 18) {
		page = 'major';
	} else {
		page = 'minor';
	}
	return res.redirect(`${page}?age=${age}`);
});

app.listen(3000);

/*
/major : Rota que renderiza uma página com o texto: Você é maior de idade e
possui x anos , onde x deve ser o valor informado no input do formulário;
/minor : Rota que renderiza uma página com o texto: Você é menor de idade e
possui x anos , onde x deve ser o valor informado no input do formulário;
  
 */
