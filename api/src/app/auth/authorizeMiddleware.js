const checkIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};

module.exports = checkIfLoggedIn;
