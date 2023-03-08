function userMiddleware (req, res, next){
    if(req.session.userLogged){
        return res.redirect ("profile")
    } 
    if(!req.session.userLogged) {
        return res.redirect ("login")
    }
    next()
}

module.exports = userMiddleware  