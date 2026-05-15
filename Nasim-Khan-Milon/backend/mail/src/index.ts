import express from 'express';
import dotenv from 'dotenv';
import { startSendOtpConsumer } from './consumer.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mail service running");
});

app.listen(port, async () => {

  console.log(
    `Mail service is running on port ${port}`
  );

  await startSendOtpConsumer();
});