require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const refreshTokenRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const chaptersRouter = require('./routes/chapters');
const lessonsRouter = require('./routes/lessons');
const imageCoursesRouter = require('./routes/imageCourses');
const myCoursesRouter = require('./routes/myCourses');
const reviewsRouter = require('./routes/reviews');
const webhookRouter = require('./routes/webhook');
const ordersRouter = require('./routes/orders');

const verifyToken = require('./middleware/verifyToken');
const can = require('./middleware/permission')

const app = express();

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/refresh-tokens', refreshTokenRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/chapters', verifyToken, can('admin'), chaptersRouter);
app.use('/lessons', verifyToken, can('admin'), lessonsRouter);
app.use('/media', verifyToken, can('admin','students'), mediaRouter);
app.use('/my-courses', verifyToken, can('admin','students'), myCoursesRouter);
app.use('/mentors', verifyToken, can('admin'), mentorsRouter);
app.use('/reviews', verifyToken, can('admin','students'), reviewsRouter);
app.use('/image-courses', verifyToken, can('admin'), imageCoursesRouter);
app.use('/orders', verifyToken, can('admin','students'), ordersRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
