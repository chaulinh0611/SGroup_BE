import userService from '../services/user.service.js';
import hashProvide from '../providers/hash.provide.js';

// const register = userService.register;
// const login = userService.login;
// const getUsers = userService.getUsers;
// const getProfile = userService.getProfile;
// const updateProfile = userService.updateProfile;
// const deleteUser = userService.deleteUser;

// const userController = {
//   register,
//   login,
//   getUsers,
//   getProfile,
//   updateProfile,
//   deleteUser
// };

// export default userController;
class userController {
    async createUser(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const role = req.body.role || 'user';
            const userId = await userService.createUser(name, email, password, role);
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
            const users = await userService.getAllUsers()
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
            const user = await userService.getUser(userId)
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
            const user = await userService.updateUser(userId, userName)
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
            const users = await userService.deleteUser(userId)
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
    async register(req, res, next) {
        try {
          const { name, email, password, role } = req.body;
          const hashedPassword = await hashProvide.generateHash(password);

          const authId = await userService.register(name, email, hashedPassword, role);
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
            
            const token = await userService.login(email, password);
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
            const user = await userService.getMe(userId);
            // if(user.password){
            //     delete user.password;
            // }
            // res.status(200).json({
            //     success: true,
            //     data: user
            // })
            const plainUser = user.toObject(); 
            delete plainUser.password;

            res.status(200).json({
            success: true,
            data: plainUser
            });
        }catch(err){
            next(err);
        }
    }
    async updateProfile(req, res, next) {
        try {
            const userId = req.user; 
            const { name, email } = req.body;

            const updatedUser = await userService.updateProfile(userId, { name, email });

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Profile updated successfully",
                data: updatedUser
            });
        } catch (err) {
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
            const check = await userService.resetPassword(email, token, newPassword);
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

export default new userController()
