const { User } = require('../../../models')
const bcrypt = require('bcrypt')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
	const schema = {
		name: 'string|required',
		email: 'email|required',
		password: 'string|required',
	}

	const validate = v.validate(req.body, schema)

	if (validate !== true) {
		return res.status(400).json({
			status: 'error',
			message: validate,
		})
	}

	const user = await User.findOne({
		where: {
			email: req.body.email,
		},
	})

	if (user) {
		return res.status(400).json({
			status: 'error',
			message: 'Email already exists',
		})
	}

	const hash = await bcrypt.hash(req.body.password, 10)

	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: hash,
		profession: req.body.profession,
		role: "students"
	})

	return res.status(201).json({
		status: 'success',
		message: 'User created',
		data: newUser,
	})
}