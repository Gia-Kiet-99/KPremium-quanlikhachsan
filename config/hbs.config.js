const handlebars = require("express-handlebars");
const hbs = handlebars.create({
  defaultLayout: "layout",
  layoutsDir: __dirname + "/../views",
  extname: ".hbs",
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    isAvailable: function (value) {
      return value === "Available";
    },
    isUnavailable: function (value) {
      return value === "Unavailable";
    },
    isFixing: function (value) {
      return value === "Fixing";
    }
  }
});

module.exports = hbs;