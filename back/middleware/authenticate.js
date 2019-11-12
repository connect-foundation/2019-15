module.exports = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).send(true);
  } else res.status(401).send(false);
};
