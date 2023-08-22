const dynamoose = require("dynamoose");

const sushiSchema = new dynamoose.Schema({
  "id": String, // UUIDv4 ID
  "userId": {
    type: Object,
  },
  "title": String,
  "image": String,
}, {
  "timestamps": true
})

const Sushi = dynamoose.model("Sushi", sushiSchema)

module.exports = Sushi