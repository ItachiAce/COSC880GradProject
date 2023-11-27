import express from 'express';
import { api } from './api';

const app = express();
app.use(api);
app.get('/api/hi', (req, res)=> res.send('Hello GOod'));
app.listen(3002, ()=>console.log("Server started on port 3002"));
