const dynamoose = require("dynamoose");

const userSchema = new dynamoose.Schema({
    "id": {
      type: String, // UUIDv4 ID
      hashKey: true, // Primary partition key
    },
    "username": {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    "email":  {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    "password": {
      type: String,
      required: true,
      // since we are storing a hashed password, min length is not required
      // minlength: 5,
    }
}, {
    "timestamps": true
})

const User = dynamoose.model("User", userSchema)

module.exports = User