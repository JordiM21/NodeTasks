const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const getAllTasks = async (req, res) => {
	try {
		const task = await Task.findAll({
			include: { model: User },
		});
		res.status(200).json({
			task,
		});
	} catch (error) {
		console.log(error);
	}
};

const getTaskByStatus = async (req, res) => {
	try {
		const validStatus = [
			"active",
			"completed",
			"late",
			"cancelled",
		];
		const { status } = req.params;
		if (!validStatus.includes(status)) {
			return res.status(404).json({
				status: "error",
				message: `Sorry dude, i could not find ${status}, try with another one`,
			});
		}

		const task = await Task.findAll({ where: { status } }); //almacenamos en task el id que coincida con el parametro
		if (!task) {
			return res.status(404).json({
				status: "error",
				message: "status not found",
			});
		}
		res.status(200).json({
			task,
		});
	} catch (error) {
		console.log(error);
	}
};

const createTask = async (req, res) => {
	try {
		const { title, userId, startDate, limitDate } = req.body; //destructuring
		const newTask = await Task.create({
			title,
			userId,
			startDate,
			limitDate,
		});
		//201 => success and a source created
		res.status(201).json({
			status: "success",
			data: { newTask },
		});
	} catch (error) {
		console.log(error);
	}
};

const updateTask = async (req, res) => {
	try {
		const { finishDate } = req.body; //definimos los elementos a recibir en el body de la peticion
		const { id } = req.params; //usamos el parametro enviado en la url de la peticion

		const task = await Task.findOne({ where: { id } }); //almacenamos en task el id que coincida con el parametro
		if (!task) {
			//manejo de error, si no consigue el id le devuelve un status 404
			return res.status(404).json({
				status: "error",
				message: "task not found",
			});
		}
		if (task.status !== "active") {
			res.status(400).json({
				status: "error",
				message: 'hey buddy, your task must be active, try updating task with status "active"',
			});
		}
		const terminado = new Date(finishDate);
		const fechaEntrega = new Date(task.limitDate);
		if (terminado > fechaEntrega) {
			await task.update({ finishDate, status: "late" }); //valores a modificar con update
		} else {
			await task.update({ finishDate, status: "completed" }); //valores a modificar con update
		}

		res.status(200).json({
			status: "success",
			data: { finishDate },
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id } = req.params;
		const task = await Task.findOne({ where: { id } });
		if (!task) {
			res.status(404).json({
				status: "error",
				message: "task not found",
			});
		}
		await task.update({ status: "cancelled" });
		res.status(200).json({
			status: "success",
			message: "deleted succesfuly",
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createTask,
	updateTask,
	deleteTask,
	getAllTasks,
	getTaskByStatus,
};
