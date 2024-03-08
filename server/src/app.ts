import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import connectDB from './db';
import { graphqlRouter } from './routes';

const app = express();

app.use(graphqlRouter);

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
});
