import authService from "../services/auth.service.js"
import hashProvide from "../providers/hash.provide.js";

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await hashProvide.generateHash(password);
            console.log(hashedPassword);
            
            const authId = await authService.register(name, email, hashedPassword);
            res.status(200).json({
                success: true,
                message: "Success",
                data: authId,
            });
        } catch (err) {
            next(err);
        }
    }
    async login(req, res,next){
        try{
            const {email, password} = req.body;
            
            const token = await authService.login(email, password);
            res.status(201).json({
                success: true,
                token: token,
                message: "Login successfully"
            })
        }catch(err){
            next(err);
        }
    }
    async getMe(req, res, next){
        try{
            const userId = req.user;
            const user = await authService.getMe(userId);
            if(user.password){
                delete user.password;
            }
            res.status(200).json({
                success: true,
                data: user
            })
        }catch(err){
            next(err);
        }
    }
    async forgotPassword(req, res, next){
        try{
            const {email} = req.body;

            const check = await authService.forgotPassword(email);
            if(check){
                return res.status(200).json({
                    success: true,
                    message: 'Reset password email sent successfully'
                });
            }
        }catch(err){
            next(err)
        }
    }
    async resetPassword(req, res, next){
        try{
            const {email,  newPassword, token} = req.body;
            const check = await authService.resetPassword(email, token, newPassword);
            if(check){
                return res.status(200).json({
                    success: true,
                    message: 'Reset password successfully'
                });
            }
        }catch(err){
            next(err)
        }
    }
}

export default new AuthController();
