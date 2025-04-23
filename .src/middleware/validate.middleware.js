import Joi from "joi";
import UserService from "../services/user.service.js"


class ValidateMiddleware {

    async validateId(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).hex().required()
            });
            await schema.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (err) {
            res.status(404).json({
                success: false,
                message: "Invalid ID"
            });
        }
    }

    async validateName(req, res, next) {
            try {
                const schema = Joi.object({
                    name: Joi.string().pattern(/^[A-Z][a-zA-Z\s]*$/).required()
                }).unknown(true);
        
                await schema.validateAsync(req.body, { abortEarly: false });
                next();
            } catch (err) {
                res.status(404).json({
                    success: false,
                    message: "Invalid name"
                });
            }

    }
    

    async validateEmail(req, res, next) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required()
            }).unknown(true);
    
            await schema.validateAsync(req.body, { abortEarly: false });
    
            const { email } = req.body; 
            const isExisted = await UserService.isEmailExisted(email);
            if (isExisted) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }
    
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }
        
    }
}

export default new ValidateMiddleware();
