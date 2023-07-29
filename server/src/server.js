const express = require('express');
const app = express();
// Dotenv config
const dotenv = require('dotenv');

// logger middleware
const morgan = require("morgan")
app.use(morgan('dev'))

app.use(require("./routes"))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dotenv.config();
dynamoose.aws.sdk.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
    "region": "us-east-1",
});

// Dynamoose configuration
const dynamoose = require("dynamoose")
dynamoose.aws.sdk.config.update({"region": "us-east-1"})

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

module.exports = app;