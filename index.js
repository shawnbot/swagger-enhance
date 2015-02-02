var request = require("request"),
    async = require("async"),
    extend = require("util-extend");

module.exports = enhance;
enhance.url = enhanceURL;

var ignoreKeys = [
  "swaggerVersion",
  "apiVersion"
];

function enhance(data, baseUrl, done) {
  async.map(data.apis, function(api, next) {
    var apiUrl = baseUrl + api.path;
    request(apiUrl, function(error, response, body) {
      if (error) return next(error);
      extend(api, JSON.parse(body));
      ignoreKeys.forEach(function(k) {
        delete api[k];
      });
      next(null, api);
    });
  }, function(error, apis) {
    done(error, data);
  });
}

function enhanceURL(url, done) {
  var baseUrl = url.match(/\.json$/)
    ? url.slice(0, url.lastIndexOf("/"))
    : url;
  request(url, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      return done("Unable to load '" + url + "': " + error);
    }
    var data = JSON.parse(body);
    enhance(data, baseUrl, function(error) {
      if (error) return done("Unable to enhance data: " + error);
      return done(null, data);
    });
  });
}
