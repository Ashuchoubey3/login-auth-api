const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

// serve login page CSS/JS
app.use(express.static(path.join(__dirname, 'login')));

app.get(['/', '/dashboard'], (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'dashbord.html'));
});

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
