import { getDB } from "../config/db.config.js"
import { ObjectId } from "mongodb";

const getUserByEmail = async (email) => {
    return await getDB().collection("users").findOne({ email });
};

const createUser = async (userData) => {
    return await getDB().collection("users").insertOne(userData);
};

const getUserByEmailAndPassword = async (email, password) => {
    return await getDB().collection("users").findOne({ email, password });
};

const getUserById = async(id) => {
    return await getDB().collection("users").findOne({ _id: new ObjectId(id) });
}
export default {
    getUserByEmail,
    createUser,
    getUserByEmailAndPassword,
    getUserById
};
