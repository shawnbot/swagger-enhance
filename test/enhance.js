var enhance = require("../"),
    assert = require("assert");

describe("enhance()", function() {

  it("should enhance JSON data with a base URL", function(done) {
    var first = {
          path: "/pet",
          description: "blah blah blah"
        },
        data = {apis: [first]};

    enhance(data, "http://petstore.swagger.wordnik.com/api/api-docs", function(error) {
      assert.ok(!error, "Error: " + error);
      assert.equal(data.apis[0], first, "the first API was overwritten");
      assert.equal(first.resourcePath, "/pet");
      done();
    });
  });

});

describe("enhance.url()", function() {

  it("should enhance URLs", function(done) {
    enhance.url("http://petstore.swagger.wordnik.com/api/api-docs", function(error, data) {
      assert.ok(!error, "error: " + error);
      var first = data.apis[0];
      assert.ok(first.apis, "not enhanced: " + JSON.stringify(first, null, "  "));
      done();
    });
  });

  it("should return an error on 404", function(done) {
    enhance.url("http://flim.flam", function(error, data) {
      assert.ok(error, "No error: " + JSON.stringify(data));
      done();
    });
  });

});
