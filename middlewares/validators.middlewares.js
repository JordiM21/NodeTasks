const { body, validationResult, param } = require("express-validator");

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		//here we hech there is something on errors, BUT the messages are next the each so we gotta push them out
		const errorMessages = errors.array().map((err) => err.msg);
		const message = errorMessages.join(". ");

		return res.status(400).json({
			status: "error",
			message,
		});
	}
	next();
};

const createUserValidator = [
	body("name")
		.isString()
		.withMessage("Name must be a string")
		.notEmpty()
		.withMessage("Name cannot be empty")
		.isLength({ min: 3 })
		.withMessage("name must be at least 3 characters"),
	body("email").isEmail().withMessage("must provide a valid email"),
	body("password")
		.isString()
		.withMessage("password must be a string")
		.notEmpty()
		.withMessage("password cannot be empty")
		.isLength({ min: 8 })
		.withMessage(
			"hey, your password should be at least 8 characters"
		),
	checkValidations,
];

module.exports = { createUserValidator };
