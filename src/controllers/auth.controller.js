import authService from "../services/auth.service.js"

class AuthController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const authId = await authService.register(name, email, password);
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
            res.status(200).json({
                success: true,
                data: user
            })
        }catch(err){
            next(err);
        }
    }
    
}

export default new AuthController();
