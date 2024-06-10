const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// User registration
app.post('/users', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
      }
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  

// User login
app.get('/users', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (user) res.send([user]);
        else res.send([]);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create post
app.post('/posts', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
