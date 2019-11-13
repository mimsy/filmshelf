import server from "../../../src/index";
import { describe, it, after } from "mocha";
import { use, expect, request } from "chai";
import chaiHttp from "chai-http";
import dirtyChai from "dirty-chai";

use(chaiHttp);
use(dirtyChai);

describe("Film routes", () => {
  after(() => {
    server.close();
  });

  let filmId: string;

  it("should successfully add a film", done => {
    request(server)
      .post("/film/add")
      .send({
        title: 'Laser ants',
        format: 'VHS',
        length: 360,
        year: 1988,
        rating: 5})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        filmId = res.body._id;
        expect(filmId).to.be.a("string");
        done();
      });
  });

  it("should successfully get a film", done => {
    request(server)
      .get(`/film/get/${filmId}`)
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        const filmName = res.body.title;
        expect(filmName).to.be.a("string");
        done();
      });
  });

  it("should successfully edit a film", done => {
    const newName = "a new name";
    request(server)
      .put(`/film/edit/${filmId}`)
      .send({title: newName})
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        const filmName = res.body.title;
        expect(filmName).to.equal(newName);
        done();
      });
  });

  it("should successfully delete a film", done => {
    request(server)
      .delete(`/film/delete/${filmId}`)
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.true();
        done();
      });
  });

  it("should successfully list films", done => {
    request(server)
      .get("/film/list")
      .end((err, res) => {
        expect(err).to.be.null();
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
