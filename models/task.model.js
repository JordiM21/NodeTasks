const { db } = require("../utils/database.util");
const { Sequelize, DataTypes } = require("sequelize");

const Task = db.define("task", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	limitDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	finishDate: {
		type: DataTypes.DATE,
	},
	status: {
		type: DataTypes.STRING,
		defaultValue: "active",
		allowNull: false,
	},
});

module.exports = { Task };
