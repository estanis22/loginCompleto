function requireLogin(req, res, next) {

  console.log("ENTRE A REQUIRE LOGIN")
  // Si el usuario está logueado, lo redirigimos a "/profile" sin importar lo que ponga en la url
  if (req.session.user) {
    return res.redirect('/profile');
  }
  
  // Si el usuario no está logueado y accede a la ruta "/register" o "/login",
  // pasamos la solicitud al siguiente middleware para que pueda acceder a esas vistas
  if (!req.session.user && (req.url === '/register' || req.url === '/login')) {
    console.log("NO ESTAS LOGUEADO; SOLO PODES IR A REGISTER O LOGIN")
    return next();
  }
  
  // Si el usuario no está logueado y accede a cualquier otra ruta,
  // lo redirigimos a "/login"
  return res.redirect('/login');
}

module.exports = requireLogin;