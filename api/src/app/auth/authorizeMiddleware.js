const checkIfLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json('Not logged');
  }
};

module.exports = checkIfLoggedIn;
