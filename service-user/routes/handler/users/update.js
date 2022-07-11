const { User } = require('../../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator')
const v = new Validator()

module.exports = async (req, res) => {
	const schema = {
		name: 'string|required',
		email: 'email|required',
		password: 'string|min:6|optional',
		profession: 'string|optional',
		avatar: 'string|optional',
	}

	const validate = v.validate(req.body, schema)

	if (validate !== true) {
		return res.status(400).json({
			status: 'error',
			message: validate
		})
	}

	const { id } = req.params;

	const { name, email, password, profession, avatar } = req.body;

	// get user
	const user = await User.findByPk(id);
	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found'
		});
	}

	if (email) {
		const checkEmail = await User.findOne({
			where: { email }
		});

		// can't update email if it's already taken
		if (checkEmail && email !== user.email) {
			return res.status(400).json({
				status: 'error',
				message: 'Email already exist'
			});
		}
	}
	
	user.name = name;
	user.email = email;
	user.profession = profession;
	user.avatar = avatar;

	if (password) {
		const hash = await bcrypt.hash(password, 10);
		user.password = hash;
	}

	await user.save();

	return res.status(200).json({
		status: 'success',
		message: 'User updated',
		data: {
			id: user.id,
			name: user.name,
			email: user.email,
			profession: user.profession,
			avatar: user.avatar,
		}
	});
}