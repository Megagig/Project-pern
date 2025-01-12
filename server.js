const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoute');
const projectRoute = require('./routes/projectRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//ALL ROUTES GO HERE

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/projects', projectRoute);

//handle not found routes after all routes
app.use(
  '*',
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
