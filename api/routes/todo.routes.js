const express = require('express')

const router = express.Router();

const { createTodo, getTodos, completeTodo } = require('../controllers/todo.controllers')

router.post('/', createTodo)
router.get('/', getTodos)
router.put('/:id', completeTodo)

module.exports = router;
