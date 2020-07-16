process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const should = require('chai').should();
const request = require('supertest');

const app = require('../MagazineServer/app');
const conn = require('../MagazineServer/utils/db');


describe('POST /user', () => {
    before((done) => {
        conn.open()
            .then(() => done())
            .catch((err) => done(err));
    });

    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    it('Create a New user ', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram', password: "omaramora11", email: "omarakram958@gmail.com"})
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Fail, Wrong Email', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram', password: "omaramora11", email: "omarakram958"})
            .expect(409)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});
