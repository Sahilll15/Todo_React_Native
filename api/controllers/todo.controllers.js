const { todo } = require('../models/todo.models')

const createTodo = (req, res) => {
    try {
        const { title, completed } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' })
        }

        const newTodo = new todo({
            title,
            completed: completed || false
        })

        newTodo.save()

        console.log(newTodo)
        return res.status(201).json({ success: true, message: 'Todo created', data: newTodo })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

const getTodos = async (req, res) => {
    try {
        const todos = await todo.find().sort({ createdAt: -1 });

        return res.status(200).json({ success: true, message: 'Todos fetched', data: todos });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}



const completeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: 'Id is required' })
        }
        const todo = await todo.findOne({ _id: id })
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' })
        }
        todo.completed = completed;
        await todo.save();
        return res.status(200).json({ success: true, message: 'Todo updated', data: todo })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports = {
    createTodo,
    getTodos,
    completeTodo
}