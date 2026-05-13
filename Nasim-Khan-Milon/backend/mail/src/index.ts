import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());


app.listen(port, () => {
  console.log(`Mail service is running on port ${port}`);
});