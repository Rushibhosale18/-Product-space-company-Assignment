const { Task } = require('../models');

const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const task = await Task.create({
            title,
            userId: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) return res.status(404).json({ error: "Task not found" });

        task.status = status;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) return res.status(404).json({ error: "Task not found" });

        await task.destroy();

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getMyTasks, createTask, updateTask, deleteTask };
