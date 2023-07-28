// Register New User
exports.register = async function(req, res) {
  // req validation would be handled here
  const newUserInput = req.body

  // TODO - Auth Service Register User

  res.json(newUserInput)
}