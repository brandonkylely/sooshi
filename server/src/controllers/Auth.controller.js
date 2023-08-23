const authService = require("../services/Auth.service");
const Sushi = require("../models/Sushi.model");
const {PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");

// Register New User
exports.register = async function (req, res) {
  // req validation would be handled here - We're just assuming the request is properly formed
  // fine for a proof-of-concept, terrible in practice
  const newUserInput = req.body;

  let newUser;
  try {
    newUser = await authService.registerUser(newUserInput);
  } catch (err) {
    console.log(err);
    if (err.message == "EXISTING_USER_ERROR") {
      return res.status("422").json({ message: "User already exists" });
      // If you don't include the above return, the code will continue executing
      // and hit the throw new Error("REGISTER_USER_ERROR") below, causing our app to crash
    }
    throw new Error(err);
  }

  res.json(newUser);
};

exports.login = async function (req, res) {
  const userInput = req.body;

  let existingUser;
  try {
    existingUser = await authService.loginUser(userInput);
  } catch (err) {
    console.log(err);
    if (err.message == "INVALID_LOGIN_CREDENTIALS") {
      return res
        .status("401")
        .json({ message: "Invalid username or password" });
    }
    throw new Error(err);
  }

  res.json(existingUser);
};

exports.protected = async function (req, res) {
  console.log("Reached Protected Route");

  res.send("/post");
};

exports.uploadImage = async function (req, res) {
  // Now creating the S3 instance which will be used in uploading photo to S3 bucket

  const client = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-1",
  });

  console.log(req.file); // check data in console that is being uploaded

  try {

    if (req.file) {
      const params = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME, // bucket name
        Key: req.file.originalname, // name of image
        Body: req.file.buffer, // body which will contain the image in buffer format
        ACL: "public-read", // defining the permissions to get public link
        ContentType: "image/jpeg", // necessary to define the image content-type to view photo in browswer with link
      });

      // uploading photo using s3 instance and saving link in database
      const data = await client.send(params);

      // if not then below code will be executed

      console.log(data); // will give information about object in which photo is stored
      // save info in database
      const sushi = await Sushi.create({
        userId: req.user.id,
        title: req.body.title,
        image: data.Location,
      });

      res.status(200).json(sushi);
    } else {
      return res.status(400).json({ message: "No file uploaded." });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
