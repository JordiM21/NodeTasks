const { db } = require("../utils/database.util");
const { DataTypes, Sequelize } = require("sequelize");

const User = db.define("user", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: "active",
		allowNull: false,
	},
});

module.exports = { User };
