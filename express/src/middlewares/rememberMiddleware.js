function rememberMiddleware(req, res, next) {
  next();
  if (
    req.cookie.remember != undefined &&
    req.session.usuarioLogueado == undefined
  ) {
  }
}

module.exports = rememberMiddleware;
