const express = require("express");
const { taskRouter } = require("./routes/task.routes");
const { userRouter } = require("./routes/user.routes");

const app = express();

app.use(express.json());

//use endpoints on routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/tasks", taskRouter);

app.all("*", (req, res) => {
	res.status(404).json({
		status: "error",
		message: `Oops! seems that ${req.method}/${req.url} does not esxists on this server!`,
	});
});

module.exports = { app };
