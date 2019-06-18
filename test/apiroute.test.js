const expect = require("chai").expect;
// const should = require("chai").should;
const app = require("../server");

describe("canary test", function() {
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});

// var request = require("supertest");
describe("ShortcutsTest", function() {
  // request(app)
  //   .get("/api/shortcuts")
  //   .expect("Content-Type", /json/)
  //   .end(function(err) {
  //     if (err) {
  //       throw err;
  //     }
  //   });
});
