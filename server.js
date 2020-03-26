const express = require('express');
const path = require('path');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


// Load dotenv var
dotenv.config({ path: `./config/config.env` });

// Connect to Database
connectDB();

// Load route files
const auth = require('./routes/auth');


const app = express();

// Dev logged middleware 
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set body parser
app.use(express.json());

// Set statuc path
app.use(express.static(path.join(__dirname, 'public')));

// Set cookie parser
app.use(cookieParser());

// Set cors
app.use(cors());

// Set prevent headers security
app.use(helmet());


// Mount Route
app.use('/api/v1/auth', auth);


app.use(errorHandler);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandler promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
});