const dynamoose = require("dynamoose");

const userSchema = new dynamoose.Schema({
    "id": String,
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
      minlength: 5,
    },
    "sushi": {
      type: Object,
    },
}, {
    "timestamps": true
})

const User = dynamoose.model("User", userSchema)

module.exports = User