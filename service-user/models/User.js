module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		role: {
			type: Sequelize.ENUM,
			values: ['admin', 'students'],
			allowNull: false,
			defaultValue: 'students'
		},
		avatar: {
			type: Sequelize.STRING,
			allowNull: true
		},
		profession: {
			type: Sequelize.STRING,
			allowNull: true
		},
		createdAt: {
			type: Sequelize.DATE,
		},
		updatedAt: {
			type: Sequelize.DATE,
		},
	}, {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		tableName: 'users',
	})
}