import * as UserService from '../services/user.service.js';


export const getAll = async (req, res) => {
        try {
             const users = await UserService.getAll();
            return res.status(200).json(users);
        }catch(err){
            return res.status(500).json({ message: err.error });
        }
}

// Get a user
export const getUser = async (req, res) => {
    try {
        const users = await UserService.getAll();
        const user = users.find((u) => u.id === Number(req.params.id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal server error" });
    }
}

    // Create a new user
    export const postUser = async (req, res) => {
        try {
            const name = req.body.name;
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }
            const newUser = await UserService.postUser(name);
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(500).json({ message: err.message || "Internal server error" });
        }
    };
    
    // Update user
    export const putUser = async (req, res) => {
        try {
            const updatedUser = await UserService.putUser(req.params.id, req.body.name);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(updatedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message || "Internal server error" });
        }
    };
    
    // Delete user
    export const deleteUser = async (req, res) => {
        try {
            const deletedUser = await UserService.deleteUser(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(deletedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message || "Internal server error" });
        }
    };
