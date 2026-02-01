const validator = require('validator');

const validateSignup = (req, res, next) => {
  const { name, email, age, location, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !age || !location || !password) {
    return res.status(400).json({ 
      error: 'All fields (name, email, age, location, password) are required' 
    });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate age is a number and positive
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum) || ageNum <= 0) {
    return res.status(400).json({ error: 'Age must be a positive number' });
  }

  // Validate name is not empty and valid
  if (!validator.isLength(name.trim(), { min: 1 })) {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }

  // Validate location is not empty
  if (!validator.isLength(location.trim(), { min: 1 })) {
    return res.status(400).json({ error: 'Location cannot be empty' });
  }

  // Validate password length
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  next();
};

module.exports = { validateSignup };
