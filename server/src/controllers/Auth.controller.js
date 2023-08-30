const authService = require("../services/Auth.service");
const Sushi = require("../models/Sushi.model");
const {PutObjectCommand, GetObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

exports.upload = async function (req, res) {
  // Now creating the S3 instance which will be used in uploading photo to S3 bucket

  const client = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-1",
  });

  console.log("req.file", req.file); // check data in console that is being uploaded

  try {

    if (req.file) {
      // Create unique keys for each photo
      const uid = req.decoded?.uid || req.body.userId
      const datetime = Date.now().toString() 
      const key = `${uid}_${datetime}_${req.file.originalname}`;


      const params = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME, // bucket name
        Key: key, // name of image
        Body: req.file.buffer, // body which will contain the image in buffer format
        ACL: 'bucket-owner-full-control',
        ContentType: "image/jpeg", // necessary to define the image content-type to view photo in browswer with link
      });

      // uploading photo using s3 instance and saving link in database
      const data = await client.send(params);

      // if not then below code will be executed

      // console.log("data", data); // will give information about object in which photo is stored

      // save info in database
      const sushi = await Sushi.create({
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        image: key,
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



/**
 * get Sushi Feed
 * TODO: Add pagination
*/
exports.getSushiFeed = async function (req, res) { 
  try {
    // Find the latest 10 sushi posts
    const sushiData = await Sushi.findAll({
      limit: 10,
      order: [['createdAt', 'DESC']]
    });
    res.json(sushiData);
  }
  catch (err) {
    console.error(err);
    next(err);
  }
}

/**
 * get Single Sushi
 * 
 */
exports.getSushiURL = async function (req, res) { 
    // TODO: Add support for other file types
    const { fileName } = req.query;
    const params = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    });


    const client = new S3Client({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "us-west-1",
    });

    try {
        const signedUrl = await getSignedUrl(client, params, { expiresIn: 120 });
        // console.log(signedUrl);
        res.json({ signedUrl })
    } catch (err) {
        console.error(err);
        next(err);
    }
}