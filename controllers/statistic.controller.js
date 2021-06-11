
const renderChartsPage = async (req, res) => {
  res.render("statistic/chart", {
    activeMenu: "charts-item"
  });
}

module.exports = {
  renderChartsPage
}