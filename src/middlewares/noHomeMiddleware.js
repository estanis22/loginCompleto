function noHomeMiddleware(req, res, next) {
  
    return res.redirect("login");
}
  
module.exports = noHomeMiddleware;