const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/blogdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const SECRET = "BLOG_APP_SECRET";

/* ================== SCHEMAS ================== */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' }
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  authorId: mongoose.Schema.Types.ObjectId
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

/* ================== MIDDLEWARE ================== */
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

/* ================== AUTH ROUTES ================== */
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email }))
    return res.status(409).send("Email exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  res.status(201).send("Registered");
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("Invalid email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Invalid password");

  const token = jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    SECRET,
    { expiresIn: "1h" }
  );

  res.send({ token, user });
});

/* ================== POSTS ================== */
app.post('/posts', auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user.name,
    authorId: req.user.id
  });
  await post.save();
  res.status(201).send(post);
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

app.put('/posts/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.authorId.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send("Forbidden");
  }

  Object.assign(post, req.body);
  await post.save();
  res.send(post);
});

app.delete('/posts/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (
    post.authorId.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).send("Forbidden");
  }

  await post.deleteOne();
  res.send("Deleted");
});

/* ================== ADMIN ================== */
app.get('/admin/users', auth, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).send("Admin only");

  const users = await User.find();
  res.send(users);
});

app.listen(4000, () => console.log("Server running on 4000"));
