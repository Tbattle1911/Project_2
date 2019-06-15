const expect = require("chai").expect;
// const should = require("chai").should;
const app = require("../server");

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});

// var sinon = require('sinon');
var request = require("supertest");

describe("ShortcutsTest", function() {
  request(app)
    .get("/api/shortcuts")
    .expect("Content-Type", /json/)
    .end(function(err) {
      if (err) {
        throw err;
      }
    });
});
