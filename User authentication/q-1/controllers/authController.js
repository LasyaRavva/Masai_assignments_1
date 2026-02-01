const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

// ✅ Signup endpoint - /signup
const signup = async (req, res) => {
  try {
    const { name, email, age, location, password } = req.body;

    // Check if email already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Ignore "no rows" error - it's expected for new users
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          age,
          location,
          password: hashedPassword
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

// ✅ Get user profile by name - /myprofile?name=<name>
const getProfile = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate name parameter
    if (!name) {
      return res.status(400).json({ error: 'Name query parameter is required' });
    }

    // Fetch user by name (without password)
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, age, location')
      .eq('name', name)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

module.exports = { signup, getProfile };
