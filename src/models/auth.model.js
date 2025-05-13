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
const setResetPasswordToken = async (resetPasswordToken, resetPasswordExpiration, email) => {
    try{
        const result = await getDB().collection('users').updateOne(
            { email: email },
            { $set: { resetPasswordToken: resetPasswordToken, 
                resetPasswordExpiration: resetPasswordExpiration } }
        );
        return result.matchedCount > 0;
    }catch(err){
        throw err;
    }
}
const checkResetPasswordToken = async(email, token, resetPasswordExpiration) =>{
    try{
        const result = await getDB().collection('users').findOne(
            { email: email, 
            resetPasswordToken: token, 
            resetPasswordExpiration: { $gt: new Date() } }
        );
        return result;
    }catch(err){
        throw err;
    }
}
const resetPassword = async(email, newPassword) => {
    try{
        const result = await getDB().collection('users').updateOne(
            { email },
            { $set: { password: newPassword,
                passwordResetToken: null,
                passwordResetExpiration: null,
                lastResetPasswordDate: new Date()
             } }
        );
        return result.matchedCount > 0;
    }catch(err){
        throw err;
    }
}
export default {
    getUserByEmail,
    createUser,
    getUserByEmailAndPassword,
    getUserById,
    setResetPasswordToken,
    checkResetPasswordToken,
    resetPassword 
};
