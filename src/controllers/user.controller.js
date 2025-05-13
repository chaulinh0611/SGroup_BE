import UserService from "../services/user.service.js"

class UserController {
    async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const userId = await UserService.createUser(name, email, password);
            res.status(200).json({
                success: true,
                data: userId,
            });
        } catch (err) {
            next(err);
        }
    }    

    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            console.log("Users fetched:", users);
            res.status(200).json({
                success: true,
                data: users,
            })
        } catch (err) {

            next(err)
        }
    }
    async getUser(req, res, next){
        try{
            const userId = await req.params.id
            const user = await UserService.getUser(userId)
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Can't find user"
                })
            }
            res.status(200).json({
                success: true,
                data: user,
            })
        }catch(err){
            next(err)
        }
    }

    async updateUser(req, res, next){
        try{
            const userId = req.params.id
            const userName = req.body.name
            const user = await UserService.updateUser(userId, userName)
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Can't find user"
                })
            }
            res.status(200).json({
                success: true,
                data: user,
            })
        }catch(err){
            next(err)
        }
    }

    async deleteUser(req, res, next){
        try{
            const userId = req.params.id
            const users = await UserService.deleteUser(userId)
            if(!users){
                return res.status(404).json({
                    success: false,
                    message: "Can't find user"
                })
            }
            res.status(200).json({
                success: true,
                data: users,
            })
        }catch(err){
            next(err)
        }
    }
    
}

export default new UserController()