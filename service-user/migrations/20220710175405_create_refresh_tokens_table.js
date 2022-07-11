'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('refresh_tokens', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			token: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});

		await queryInterface.addConstraint('refresh_tokens', {
			type: 'FOREIGN KEY',
			name: 'FK_REFRESH_TOKENS_USER_ID',
			fields: ['user_id'],
			references: {
				table: 'users',
				field: 'id'
			},
			onDelete: 'cascade'
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('refresh_tokens');
	}
};
