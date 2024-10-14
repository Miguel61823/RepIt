import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.ACCOUNT_SERVICE_PORT || 5401;
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
})