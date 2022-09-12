const express = require("express");

const {
	createTask,
	deleteTask,
	getAllTasks,
	getTaskByStatus,
	updateTask,
} = require("../controllers/task.controller");

const taskRouter = express.Router();

//endpoints
taskRouter.get("/", getAllTasks);

taskRouter.get("/:status", getTaskByStatus);

taskRouter.post("/", createTask);

taskRouter.patch("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);

module.exports = {
	taskRouter,
};
