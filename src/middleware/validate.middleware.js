import Joi from "joi";
import authService from "../services/auth.service.js"; // Giả định bạn có service này

class ValidateMiddleware {
    async validateId(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
            });
            await schema.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "ID không hợp lệ",
            });
        }
    }

    async validateName(req, res, next) {
        try {
            const schema = Joi.object({
                name: Joi.string()
                    .pattern(/^[A-Z][a-zA-Z\s]*$/)
                    .required(),
            }).unknown(true);
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "Invalid name",
            });
        }
    }

    async validateEmail(req, res, next) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
            }).unknown(true);

            await schema.validateAsync(req.body, { abortEarly: false });

            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }
    }
}

export default new ValidateMiddleware();
