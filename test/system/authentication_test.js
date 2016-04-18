"use strict";

const request  = require("supertest");
const server   = require("./_server");
const admin    = require("./_credentials");
const hacker   = {username: "h4ck3r", password: "3vil"};

describe("authentication", () => {

  const route = "/test123";

  it("PUT /... with authorization passes", (done) => {
    request(server)
      .put(route)
      .auth(admin.username, admin.password)
      .query({
        "url": "http://example.org/asdf"
      })
      .expect(201)
      .end(done);
  });

  it("PUT /... without authorization fails", (done) => {
    request(server)
      .put(route)
      .auth(hacker.username, hacker.password)
      .query({
        "url": "http://example.org/asdf"
      })
      .expect(401)
      .end(done);
  });

  it("POST /... with authorization passes", (done) => {
    request(server)
      .post(route)
      .auth(admin.username, admin.password)
      .query({
        "url": "http://example.org/1234"
      })
      .expect(200)
      .end(done);
  });

  it("POST /... without authorization fails", (done) => {
    request(server)
      .post(route)
      .auth(hacker.username, hacker.password)
      .query({
        "url": "http://example.org/1234"
      })
      .expect(401)
      .end(done);
  });

  it("POST / with authorization passes", (done) => {
    request(server)
      .post("/")
      .auth(admin.username, admin.password)
      .query({
        "url": "http://example.org/qwer"
      })
      .expect(201)
      .end(done);
  });

  it("POST / without authorization fails", (done) => {
    request(server)
      .post("/")
      .auth(hacker.username, hacker.password)
      .query({
        "url": "http://example.org/qwer"
      })
      .expect(401)
      .end(done);
  });

  it("DELETE /... with authorization passes", (done) => {
    request(server)
      .delete(route)
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done);
  });

  it("DELETE /... without authorization fails", (done) => {
    request(server)
      .delete(route)
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done);
  });

  it("GET / with authorization passes", (done) => {
    request(server)
      .get("/")
      .auth(admin.username, admin.password)
      .expect(200)
      .end(done);
  });

  it("GET / without authorization fails", (done) => {
    request(server)
      .get("/")
      .auth(hacker.username, hacker.password)
      .expect(401)
      .end(done);
  });

});