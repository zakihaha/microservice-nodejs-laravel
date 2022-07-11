module.exports = (sequelize, DataTypes) => {
	const refreshToken = sequelize.define('RefreshToken', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
			allowNull: false,
		},
	}, {
		timestamps: true,
		tablename: 'refresh_tokens',
	})

	return refreshToken
}