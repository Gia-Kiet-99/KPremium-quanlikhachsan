"use strict";
const ajv = require("../config/ajv");

module.exports = {
    validate: (type) => (req, res, next) => {
        const validate = ajv.getSchema(type);

        const valid = validate(req.body);

        if (!valid) {
            console.log(validate.errors);
            res.status(400).json({
                error: "input error",
                detail: validate.errors
            });
            return;
        }
        return next();
    }
};
