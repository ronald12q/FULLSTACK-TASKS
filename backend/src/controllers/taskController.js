const Task = require('../models/Task');


const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addTask = async (req, res) => {
    const { title, description } = req.body;
    try {


        if(!title || !description){
            return res.status(400).json({error: 'todos los campos son obligatorios'});
        }

        const newTask = await Task.create({title, description, owner: req.user._id});
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error inesperado' });
    }
};


const modifyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskUpdate = await Task.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!taskUpdate) {
            return res.status(404).json({ message: 'tarea no encontrada' });
        }
        res.json(taskUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findOneAndDelete({ _id: id, owner: req.user._id });
        if (!deletedTask) {
            return res.status(404).json({ message: 'tarea no encontrada!' });
        }
        res.json({ message: 'tarea eliminada', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }




}

module.exports = {getTask, addTask, modifyTask, deleteTask};