import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.BACKEND_PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
})