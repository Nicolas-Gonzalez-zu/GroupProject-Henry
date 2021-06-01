const checkIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};

// const checkIfAuthorized = (req, res, next) => {};

module.exports = checkIfLoggedIn;
