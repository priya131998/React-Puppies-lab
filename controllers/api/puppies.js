const Puppy = require('../../models/puppy');

module.exports = {
	index,
	create,
	show,
	update,
	delete: deleteOne,
};

async function index(req, res) {
	const puppies = await Puppy.find({});
	res.status(200).json(puppies);
}

async function create(req, res) {
	const newPuppy = await Puppy.create(req.body);
	res.status(201).json(newPuppy);
}

async function show(req, res) {
	const puppy = await Puppy.findById(req.params.id);
	res.status(200).json(puppy);
}

async function update(req, res) {
	const updatedPuppy = await Puppy.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);
	res.status(200).json(updatedPuppy);
}

async function deleteOne(req, res) {
	// find document by the ID from the collection mapped to the Model and remove that document,
	// return the removed document
	const deletedPuppy = await Puppy.findByIdAndRemove(req.params.id);
	res.status(200).json(deletedPuppy);
}
