const user = require('../models/Task');


const getTask = async(req,res ) => {
    try {
        const users = await user.find();

        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
}

const addTask = async (req,res) => {
    const {title, description} = req.body;
    try {

        if(!title || !description){
            return res.status(400).json({error: 'todos los campos son obligatorios'});
        }else{
            const newUser = await user.create({title, description});
            res.status(200).json(newUser);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error inesperado'});
    }

}


const  modifyTask = async (req,res) => {

    try {
        const {id} = req.params;

        const taskUpdate = await user.findByIdAndUpdate( id,
            {$set: req.body},
            {new: true, runValidators: true}
        );
        if(!taskUpdate){
            return res.status(404).json({message: 'usuario no encontrado'})
        }
        res.json(taskUpdate);
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
    
} 

const deleteTask = async(req, res) => {
    
    try {
        const {id} = req.params;

        const deleteTask_ = await user.findByIdAndDelete(id);

        if(!deleteTask_){
            return res.status(404).json({message: 'usuario no encontrado!'});
        }

        res.json({message: 'usuario eliminado', user: deleteTask_});

        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }




}

module.exports = {getTask, addTask, modifyTask, deleteTask};