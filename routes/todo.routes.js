const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/auth.middleware');
const { validateTodo } = require('../middleware/validation');

// All TODO routes are protected with authMiddleware
// userId is automatically attached from JWT token

// POST /todos - Create a new todo
router.post('/todos', authMiddleware, validateTodo, todoController.createTodo);

// GET /todos - Get all todos for logged-in user
router.get('/todos', authMiddleware, todoController.getTodos);

// PUT /todos/:id - Update a specific todo
router.put('/todos/:id', authMiddleware, todoController.updateTodo);

// DELETE /todos/:id - Delete a specific todo
router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);

module.exports = router;
