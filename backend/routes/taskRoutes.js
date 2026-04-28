const express = require('express');
const { getMyTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.use(verifyToken);

router.get('/', getMyTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
