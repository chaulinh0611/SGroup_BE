import authModel from "../models/auth.model.js";
import AuthProvider from "../providers/auth.provide.js";
import hashProvide from "../providers/hash.provide.js";
import emailProvider from "../providers/email.provider.js";

import bcrypt from 'bcryptjs';
class AuthService {
    async register(name, email, password) {
        try {
            const isExisted = await authModel.getUserByEmail(email);
            if (isExisted) {
                throw new Error("Email already exists");
            }

            const user = await authModel.createUser({ name, email, password });
            console.log(
                password
            );
            
            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async login(email, password) {
        try {
            const user = await authModel.getUserByEmail(email);
            if (!user) {
                throw new Error("Wrong email or password");
            }
            const isMatch = await hashProvide.compareHash(password, user.password);
            if (!isMatch) {
                console.log("err");
                throw new Error("Wrong email or password");

            }

            const token = await AuthProvider.encodeToken(user);
            return token;
        } catch (err) {
            throw err;
        }
    }

    async getMe(id) {
        try {
            const user = await authModel.getUserById(id);
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (err) {
            throw err;
        }
    }
    async forgotPassword(email){
        try{
            const user = await authModel.getUserByEmail(email);
            if(!user){
                throw new Error("User not found");
            }

            const resetPasswordToken = await bcrypt.genSalt(10);
            const resetPasswordExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10p
            const result = await authModel.setResetPasswordToken(resetPasswordToken, resetPasswordExpiration, email);
            if(!result){
                throw new Error("Can not reset password");
            }
            emailProvider.sendEmail({
                emailFrom: process.env.SMTP_USER,
                emailTo: email,
                emailSubject: "Reset password",
                emailText: `Here is your token to reset password: ${resetPasswordToken}`
            })
                return true;
        }catch(err){
            throw err;
        }
    }
    async resetPassword(email, token, newPassword){
        try{
            const check = await authModel.checkResetPasswordToken(email, token);
            if(!check){
                throw new Error("Invalid token or token has expired");
            }
            const hashedPassword = await hashProvide.generateHash(newPassword);
            const result = await authModel.resetPassword(email, hashedPassword);
            console.log(result)
            if(!result){
                throw new Error("Can not reset password");
            }
            return true;
        }catch(err){
            throw err;
        }
    }
}

export default new AuthService();
