const dynamoose = require("dynamoose");

const todoSchema = new dynamoose.Schema({
    "id": String, // UUIDv4 ID
    "user": Object,
    "title": String,
    "content": String,
}, {
    "timestamps": true
})

const Todo = dynamoose.model("Todo", todoSchema)

module.exports = Todo