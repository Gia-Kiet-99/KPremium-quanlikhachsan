const renderLoginPage = async (req, res, next) => {
  res.render("auth/login", {layout: false});
}

module.exports = {
  renderLoginPage
}