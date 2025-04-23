import { getDB } from "../config/db.config.js";
import { ObjectId } from "mongodb";

class UserModel {
    async insertOne(data) {
        return await getDB().collection("users").insertOne(data);
    }

    async findAll() {
        return await getDB().collection("users").find().toArray();
    }

    async findById(userId) {
        return await getDB().collection("users").findOne({ _id: new ObjectId(userId) });
    }

    async updateById(userId, data) {
        return await getDB().collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $set: data }
        );
    }

    async deleteById(userId) {
        return await getDB().collection("users").deleteOne({ _id: new ObjectId(userId) });
    }

    async findByEmail(email) {
        return await getDB().collection("users").findOne({ email });
    }
}

export default new UserModel();
