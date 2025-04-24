import { getDB } from "../config/db.config.js"

class UserService {
    async createUser(name) {
        try {
            const user = await getDB()
                .collection("users")
                .insertOne({
                    name,
                    _id:
                        (await getDB().collection("users").countDocuments()) +
                        1,
                })
            return user.insertedId
        } catch (err) {
            throw err
        }
    }

    async getAllUsers() {
        try {
            const users = await getDB().collection("users").find().toArray()
            return users
        } catch (err) {
            throw err
        }
    }

    async getUser(userId) {
        try {
            const user = await getDB()
                .collection("users")
                .findOne({ _id: Number(userId) })
            return user
        } catch (err) {
            throw err
        }
    }

    async updateUser(userId, userName) {
        try {
            const user = await getDB()
                .collection("users")
                .updateOne(
                    { _id: Number(userId) },
                    { $set: { name: userName } }
                )
            if (user.matchedCount === 0) {
                return null
            }
            const userUpdated = getDB()
                .collection("users")
                .findOne({ _id: Number(userId) })
            return userUpdated
        } catch (err) {
            throw err
        }
    }

    async deleteUser(userId) {
        try {
            const user = await getDB()
                .collection("users")
                .deleteOne({
                    _id: Number(userId),
                })
            if (user.deletedCount === 0) {
                return null
            }
            const users = await getDB().collection("users").find().toArray()
            return users
        } catch (err) {
            throw err
        }
    }
}
export default new UserService()
