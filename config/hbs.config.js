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
    },
    isUnpaid: function (value) {
      return value === "Unpaid";
    },
    equal: function (a, b) {
      return a === b;
    },
    ifEqual: function (arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    json: function (obj) {
      return JSON.stringify(obj);
    },
  }
});

module.exports = hbs;
