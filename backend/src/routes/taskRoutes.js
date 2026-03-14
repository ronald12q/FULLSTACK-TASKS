const express = require('express');
const router = express.Router();

const {getTask, addTask, modifyTask, deleteTask} = require('../controllers/taskController');



router.get( '/', getTask);
router.post('/', addTask);
router.patch('/:id', modifyTask);
router.delete('/:id', deleteTask);
module.exports = router;
