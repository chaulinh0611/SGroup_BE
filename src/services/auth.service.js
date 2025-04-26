import authModel from "../models/auth.model.js";
import AuthProvider from "../providers/auth.provide.js";
import hashProvide from "../providers/hash.provide.js";

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
}

export default new AuthService();
