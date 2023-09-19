const dynamoose = require("dynamoose");

const sushiSchema = new dynamoose.Schema({
  "id": {
    type: String, // UUIDv4 ID
    hashKey: true, // Primary partition key
  },
  "userId": {
    type: String,
    rangeKey: true, // Primary sort key
  },
  "title": String,
  "image": String,
  "timestamp": {
    type: Date,
    default: new Date(),
    index: true, // Global Secondary Index
  },
})

const Sushi = dynamoose.model("Sushi", sushiSchema)

module.exports = Sushi