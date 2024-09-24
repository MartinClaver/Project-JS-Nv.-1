import express from 'express';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectToMongo, deleteAllTasks, findAllTasks, postTask, findUserByEmail, insertUser } from './mongo.mjs';

dotenv.config();

const app = express();
const port = 3000;
const SECRET_KEY = process.env.JWT_SECRET;
app.use(cors());
app.use(express.json());

const collectionUser = await connectToMongo("DbNv1", "ColNv1");
const collectionTasks = await connectToMongo("DbNv1", "Tasks");

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
  console.log(token)
    if (!token) return res.status(401).json({ message: 'Access denied' });
    console.log('SECRET KEY :', SECRET_KEY)
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = { email, password: hashedPassword };
    await insertUser(collectionUser, user);
    res.json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(collectionUser, email);
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });
    
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ accessToken: token });
});

app.get('/task', verifyToken, async (req, res) => {
    try {
        const tasks = await findAllTasks(collectionTasks);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks' });
    }
});

app.post('/post-task', verifyToken, async (req, res) => {
    const { name, description, creator } = req.body;
    const task = { name, description, creator };
    await postTask(collectionTasks, task);
    res.json({ message: 'Task posted' });
});

app.delete('/delete', verifyToken, async (req, res) => {
    await deleteAllTasks(collectionTasks);
    res.json({ message: 'Tasks deleted' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
