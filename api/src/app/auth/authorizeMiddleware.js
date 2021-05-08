const checkIfLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
};

module.exports = checkIfLoggedIn;
