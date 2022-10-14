module.exports = (req, res, next) => {
  res.status(400).json({ message: 'resource is not found in this server' })
}
