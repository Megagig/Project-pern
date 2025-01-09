import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';

dotenv.config();

// import userRoute from './routes/userRoute';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Welcome to the Server',
//   });
// });

//ALL ROUTES GO HERE

app.use('/api/v1/auth', authRoute);
// app.use('/api/v1/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``;
