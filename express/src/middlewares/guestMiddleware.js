function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    return res.redirect("/Usuario/profile2");
  }
  next();
}
module.exports = guestMiddleware;
