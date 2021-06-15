const statisticModel = require("../models/statistic.model");

const renderChartsPage = async (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  console.log("current month: " + currentMonth);

  const monthlyRevenue = await statisticModel.getMonthlyRevenue(currentMonth, currentYear);
  // console.log("--------------- revenue of " + currentMonth + "/" + currentYear + " ----------------");
  console.log(monthlyRevenue);

  const totalRevenue = monthlyRevenue.reduce((sum, e) => {
    return sum += e.total_price;
  }, 0);

  res.render("statistic/chart", {
    activeMenu: "charts-item",
    revenueOfCurrentMonth: monthlyRevenue,
    totalRevenue: new Intl.NumberFormat('de-DE', {
      style: 'currency', currency: 'VND'
    }).format(totalRevenue),
    month: currentMonth,
    year: currentYear
  });
}

const getMonthlyRevenue = async (req, res) => {
  const {month, year} = req.query;
  const monthlyRevenue = await statisticModel.getMonthlyRevenue(month, year);
  console.log("--------------- revenue in " + month + "/" + year + " ----------------");
  console.log(monthlyRevenue);

  const totalRevenue = monthlyRevenue.reduce((sum, e) => {
    return sum += e.total_price;
  }, 0);

  res.json({
    revenue: monthlyRevenue,
    total: new Intl.NumberFormat('de-DE', {
      style: 'currency', currency: 'VND'
    }).format(totalRevenue)
  })
}

const getRoomUsageDensity = async (req, res) => {
  const {month, year} = req.query;

  const roomUsageDensity = await statisticModel.getRoomUsageDensity(month, year);
  console.log("--------------- room usage density in " + month + "/" + year + " ----------------");
  console.log(roomUsageDensity);

  res.json(roomUsageDensity);
}

module.exports = {
  renderChartsPage,
  getMonthlyRevenue,
  getRoomUsageDensity
}