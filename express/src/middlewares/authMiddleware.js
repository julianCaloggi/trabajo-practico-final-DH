function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    return res.redirect("/Usuario/Login");
  }
  next();
}
module.exports = authMiddleware;
