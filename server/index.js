const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.error("❌ Database connection failed:", err.message));

app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/createUser', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("⚠️ Global Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => {
    console.log("🚀 Server is running on port 3000");
});
