import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Server',
  });
});

//ALL ROUTES GO HERE

app.use('/api/v1/auth', authRoute);

//handle not found routes after all routes
app.use('*', (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``;
