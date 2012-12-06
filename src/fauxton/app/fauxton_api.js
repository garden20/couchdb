define([
  "app",

  // Modules
  "modules/dashboard",
  "modules/fauxton"
],

function(app, Dashboard, Fauxton) {
  var FauxtonAPI = app.module();

  FauxtonAPI.moduleExtensions = {
    Routes: {
    }
  };

  FauxtonAPI.View = Backbone.View.extend({
    // This should return an array of promises, an empty array, or null
    establish: function() {
      return null;
    }
  });

  FauxtonAPI.navigate = function(url) {
    Backbone.history.navigate(url, true);
  };

  FauxtonAPI.addHeaderLink = function(link) {
    app.dashboard.navBar.addLink(link);
  };

  FauxtonAPI.Deferred = function() {
    return $.Deferred();
  };

  FauxtonAPI.addRoute = function(route) {
    app.router.route(route.route, route.name, route.callback);
  };

  FauxtonAPI.module = function(extra) {
    return app.module(FauxtonAPI.moduleExtensions, extra);
  };

  FauxtonAPI.addNotification = function(options) {
    options = _.extend({
      msg: "Notification Event Triggered!",
      type: "info",
      selector: "#global-notifications"
    }, options);
    var view = new Fauxton.Notification(options);

    return view.renderNotification();
  };

  FauxtonAPI.UUID = Backbone.Model.extend({
    initialize: function(options) {
      options = _.extend({count: 1}, options);
      this.count = options.count;
    },

    url: function() {
      return app.host + "/_uuids?count=" + this.count;
    },

    next: function() {
      return this.get("uuids").pop();
    }
  });

  FauxtonAPI.RouteObject = function() {
    this._options = arguments;

    this.initialize.apply(this, arguments);
  };

  _.extend(FauxtonAPI.RouteObject.prototype, Backbone.Events, {
    initialize: function() {},
    getLayout: function() { return this.layout; },
    getCrumbs: function() { return []; },
    getViews: function() { return {}; },
    apiUrl: function() {},
    establish: function() {},
    getRoute: function() { return this.route; },
    validSubroute: function() { return false; },
    handle: function() {}
  });

  return app.fauxtonAPI = FauxtonAPI;
});
