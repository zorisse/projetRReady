
var exports = module.exports = {};

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/login')
  }
}

const checkRoles = (role) => {
  return function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

exports.checkGuest = checkRoles('GUEST');
exports.checkEditor = checkRoles('EDITOR');
exports.checkAdmin = checkRoles('ADMIN');



