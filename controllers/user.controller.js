const { json } = require("sequelize");
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllUsers = async (req, res) => {
	try {
		const user = await User.findAll({
			where: { status: "active" },
			include: { model: Task },
		});
		res.status(200).json({
			user,
		});
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const newUser = await User.create({
			name,
			email,
			password,
		});
		res.status(201).json({
			status: "succes",
			data: { newUser },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email } = req.body;

		const user = await User.findOne({ where: { id } });
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "user not found, sorry",
			});
		}
		await user.update({ name, email });
		res.status(200).json({
			status: "success",
			data: { user },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ where: { id } });
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "users id was not found",
			});
		}
		await user.update({ status: "cancelled" });
		res.status(204).json({
			status: "success",
			message: "deleted succesfuly",
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createUser,
	getAllUsers,
	updateUser,
	deleteUser,
};
