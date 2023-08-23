const dynamoose = require("dynamoose");

const sushiSchema = new dynamoose.Schema({
  "id": {
    type: String, // UUIDv4 ID
    hashKey: true, // Primary partition key
  },
  "userId": {
    type: String,
  },
  "title": String,
  "image": String,
}, {
  "timestamps": true
})

const Sushi = dynamoose.model("Sushi", sushiSchema)

module.exports = Sushi