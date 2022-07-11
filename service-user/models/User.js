module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.ENUM,
			values: ['admin', 'students'],
			allowNull: false,
			defaultValue: 'students'
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true
		},
		profession: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
	}, {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscored: true,
		tableName: 'users',
	})

	return user
}