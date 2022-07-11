'use strict';
const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface, Sequelize) {

		await queryInterface.bulkInsert('users', [
			{
				name: 'Zaki Choiruddin',
				profession: 'Software Engineer',
				role: 'admin',
				email: 'zaki@gmail.com',
				password: await bcrypt.hash('zakizaki', 10),
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Meisha',
				profession: 'Frontend Developer',
				role: 'students',
				email: 'meisha@gmail.com',
				password: await bcrypt.hash('zakizaki', 10),
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
