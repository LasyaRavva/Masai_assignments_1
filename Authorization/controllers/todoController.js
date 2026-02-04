const supabase = require('../config/supabase');

// 🔐 Create Todo - POST /todos
const createTodo = async (req, res) => {
  try {
    const { title, completed = false } = req.body;
    const userId = req.user.userId; // From JWT middleware

    // Insert todo with userId from JWT (NOT from request body)
    const { data, error } = await supabase
      .from('todos')
      .insert([
        {
          title,
          completed,
          user_id: userId
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({ 
      message: 'Todo created successfully',
      todo: data[0]
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 🔐 Get Todos - GET /todos
const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId; // From JWT middleware

    // Return only todos belonging to the logged-in user
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ 
      todos: data,
      count: data.length
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 🔐 Update Todo - PUT /todos/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const userId = req.user.userId; // From JWT middleware

    // First, verify ownership - user can update ONLY their own todos
    const { data: existingTodo, error: fetchError } = await supabase
      .from('todos')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Validate ownership
    if (existingTodo.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied. You can only update your own todos' });
    }

    // Update the todo
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    const { data, error } = await supabase
      .from('todos')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select();

    if (error) {
      throw error;
    }

    res.json({ 
      message: 'Todo updated successfully',
      todo: data[0]
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// 🔐 Delete Todo - DELETE /todos/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // From JWT middleware

    // First, verify ownership - user can delete ONLY their own todos
    const { data: existingTodo, error: fetchError } = await supabase
      .from('todos')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Validate ownership
    if (existingTodo.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied. You can only delete your own todos' });
    }

    // Delete the todo
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };