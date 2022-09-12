const { app } = require("./app");

//utils
const { initModels } = require("./models/relations.model");
const { db } = require("./utils/database.util");

const startServer = async () => {
	try {
		await db.authenticate().then(console.log("db authentiacte"));
		await db.sync().then(console.log("db sync!"));

		//establish relations between models
		initModels();

		const PORT = 4000;
		app.listen(PORT, () => {
			console.log("express app runnning");
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
