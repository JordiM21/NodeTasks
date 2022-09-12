const express = require("express");

const {
	createUser,
	deleteUser,
	getAllUsers,
	updateUser,
} = require("../controllers/user.controller");

//middleware validator
const {
	createUserValidator,
} = require("../middlewares/validators.middlewares");

const userRouter = express.Router();

//endpoints
userRouter.get("/", getAllUsers);

userRouter.post("/", createUserValidator, createUser);

userRouter.patch("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

module.exports = {
	userRouter,
};
