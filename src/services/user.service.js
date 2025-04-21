import * as mockData from '../database/user.database.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "../data.json");

// Get all users
export const getAll = async () => {
    return await mockData.readAllUsers(dataFile);
};

// Get one user
export const getUser = async (id) => {
    const users = await mockData.readAllUsers(dataFile);
    return users.find((u) => u.id === Number(id));
};

// Create a user
export const postUser = async (name) => {
    const users = await mockData.readAllUsers(dataFile);
    const userId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: userId, name };
    users.push(newUser);
    await mockData.writeUserToFile(dataFile, users);
    return newUser;
};

// Update user
export const putUser = async (id, name) => {
    const users = await mockData.readAllUsers(dataFile);
    const userId = Number(id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return null;
    }
    users[userIndex].name = name;
    await mockData.writeUserToFile(dataFile, users);
    return users[userIndex];
};

// Delete user
export const deleteUser = async (id) => {
    const users = await mockData.readAllUsers(dataFile);
    const userId = Number(id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return null;
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    await mockData.writeUserToFile(dataFile, users);
    return deletedUser;
};
