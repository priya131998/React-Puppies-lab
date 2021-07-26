const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
	create,
	login,
	checkToken,
};

async function create(req, res) {
	try {
		// Add the user to the database
		const user = await User.create(req.body);
		// token will be a string
		const token = createJWT(user);
		// Yes, we can use res.json to send back just a string
		// The client code takes this into consideration
		res.json(token);
	} catch (err) {
		// Client will check for non-2xx status code
		// 400 = Bad Request
		res.status(400).json(err);
	}
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) throw new Error();
		const match = await bcrypt.compare(req.body.password, user.password);
		if (match) {
			const token = createJWT(user);
			res.json(token);
		} else {
			res.status(400).json('Bad Credentials');
		}
	} catch {
		res.status(400).json('Bad Credentials');
	}
}

function checkToken(req, res) {
	// req.user will always be there for you when a token is sent
	console.log('req.user ', req.user);
	res.json(req.exp);
}

/* -- Helper Functions -- */
function createJWT(user) {
	return jwt.sign(
		// data payload
		{ user },
		process.env.SECRET,
		{ expiresIn: '24h' }
	);
}
