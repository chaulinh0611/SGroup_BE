import { getDB } from "../config/db.config.js"
import { ObjectId } from "mongodb";
import  UserModel from "../models/user.model.js";
class UserService {
    async createUser(name, email, password) {
        try {
            const user = await UserModel.insertOne({name, email, password});
            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (err) {
            throw err;
        }
    }

    async getUser(userId) {
        try {
            const user = await  UserModel.findById(userId)
            return user;
        } catch (err) {
            throw err;
        }
    }

    async updateUser(userId, userName) {
        try {
            const user = await UserModel.updateById(userId, { name: userName });
            if (user.matchedCount === 0) {
                return null;
            }
            const userUpdated = await UserModel.findById(userId);
            return userUpdated;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await UserModel.deleteById(userId)
            if (user.deletedCount === 0) {
                return null;
            }
            const users = await UserModel.findAll();
            return users;
        } catch (err) {
            throw err;
        }
    }

    async isEmailExisted(email) {
        const user = await UserModel.findByEmail(email);
        return !!user;
    }
}

export default new UserService();
