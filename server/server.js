const express = require("express");
const app = express();
const dotenv = require("dotenv");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// logger middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:4173', 'http://localhost:5173', 'https://sooshi.vercel.app', 'https://sooshi-brandonkylely.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(require("./src/routes"));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Dynamoose configuration
const dynamoose = require("dynamoose");

dotenv.config();

// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  region: "us-west-1",
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

module.exports = app;
