const bcrypt = require('bcrypt')
const { User } = require('../../../models')
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
	const schema = {
		email: "email|required",
		password: "string|required",
	}

	const validate = v.validate(req.body, schema)

	if (validate !== true) {
		return res.status(400).json({
			'status': 'error',
			'message': validate
		})
	}

	const user = await User.findOne({
		where: { email: req.body.email }
	})

	if (!user) {
		return res.status(404).json({
			'status': 'error',
			'message': 'User not found'
		})
	}

	const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

	if (!isPasswordValid) {
		return res.status(400).json({
			'status': 'error',
			'message': 'Password is incorrect'
		})
	}

	return res.status(200).json({
		'status': 'success',
		'data': {
			'id': user.id,
			'name': user.name,
			'email': user.email,
			'profession': user.profession,
			'role': user.role,
			'avatar': user.avatar
		}
	})
}
