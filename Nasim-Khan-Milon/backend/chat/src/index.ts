import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/prisma.js';
import ChatRouter from './routes/chat.js';
import cors from 'cors';
import { app, server } from './config/socket.js';

dotenv.config();

const port = process.env.PORT || 4002;


app.use(express.json());
app.use(cors());

app.use("/api/v1", ChatRouter);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});