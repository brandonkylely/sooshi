const express = require('express');
const app = express();

// logger middleware
const morgan = require("morgan")
app.use(morgan('dev'))

app.use(require("./routes"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

module.exports = app;