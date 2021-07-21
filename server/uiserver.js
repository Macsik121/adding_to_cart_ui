import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import render from './render.jsx';
const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('public'));

app.get('*', render);

app.listen(port, () => console.log(`Server has been started on port ${port}`));