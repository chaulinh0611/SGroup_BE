import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, "data.json");

const app = express();
const port = 3000;

app.use(express.json());


function readUsersFromFile(callback) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return callback({ error: "Failed to read data file" });
        }
        try {
            const users = JSON.parse(data);
            callback(null, users);
        } catch (parseError) {
            callback({ error: "Failed to parse JSON data" });
        }
    });
}


function writeUsersToFile(users, callback) {
    fs.writeFile(dataFile, JSON.stringify(users, null, 1), (err) => {
        if (err) {
            return callback({ error: "Failed to write data file" });
        }
        callback(null);
    });
}

//get all users
app.get("/users", (req, res) => {
    readUsersFromFile((err, users) => {
        if (err) return res.status(500).json({ message: err.error });
        res.json(users);
    });
});

//get a user
app.get("/user/:id", (req, res) => {
    readUsersFromFile((err, users) => {
        if (err) return res.status(500).json({ message: err.error });

        const user = users.find((u) => u.id === Number(req.params.id));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    });
});

//create a new user
app.post("/users", (req, res) => {
    readUsersFromFile((err, users) => {
        if (err) return res.status(500).json({ message: err.error });
        
        const userId = users.length + 1;
        const newUser = { id: userId, name: req.body.name};
        users.push(newUser);
        writeUsersToFile(users, (err) => {
            if (err) return res.status(500).json({ message: err.error });
            res.json(users);
        });
    });
});

//update a user
app.put("/users/:id", (req, res) => {
    readUsersFromFile((err, users) => {
        if (err) return res.status(500).json({ message: err.error });

        const userId = Number(req.params.id);
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        users[userIndex] = { id: userId, name: req.body.name };

        writeUsersToFile(users, (err) => {
            if (err) return res.status(500).json({ message: err.error });
            res.json(users);
        });
    });
});

//delete a user
app.delete("/users/:id", (req, res) => {
    readUsersFromFile((err, users) => {
        if (err) return res.status(500).json({ message: err.error });

        const userId = Number(req.params.id);
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        users.splice(userIndex, 1);

        writeUsersToFile(users, (err) => {
            if (err) return res.status(500).json({ message: err.error });
            res.json(users);
        });
    });
});


// //get user
// app.get('/user/:id', (req, res) => {
//     const user = data.find((u) => u.id === Number(req.params.id));
//     res.json(user)
// })
// // create a new user
// app.post('/users', (req, res) =>{
//     const newUser = req.body
//     data.push(newUser)
//     res.json(data)
// })
// //update a user
// app.put('/:id', (req, res) => {
//     const userId = Number(req.params.id);
//     const index = data.findIndex((u) => u.id === Number(userId));
//     const userName = req.body.name;
//     if(index !== -1){
//         data[index].name = userName;
//         res.json(data);
//     }else{
//         res.status(404).send();
//     }
// })
// //delete a user
// app.delete('/:id', (req, res) => {
//     const userId = Number(req.params.id);
//     const index = data.findIndex((u) => u.id === Number(userId));
//     if(index !== -1){
//         data.splice(index, 1);
//         res.json(data);
//     }else{
//         res.status(404).send();
//     }
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
