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
            .send({fullName: 'Omar Akram', password: "omarakram11", email: "omarakram958@gmail.com"})
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Fail, Wrong Email', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram', password: "omarakram11", email: "omarakram958"})
            .expect(409)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Fail, Short password', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram', password: "omara", email: "omarakram958"})
            .expect(409)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Fail, Missing Values', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram'})
            .expect(409)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});


describe('GET /user', () => {
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

    let user = {
        password: "omarakram11",
        email: "omarakram95@gmail.com"
    };
    let token;

    let userId;

    it('Pass, Create a New user ', (done) => {
        request(app).post('/user')
            .send({fullName: 'Omar Akram', password: "omarakram11", email: "omarakram95@gmail.com"})
            .expect(201)
            .end(function (err, res) {
                userId = res.body._id;
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Login and get token ', (done) => {
        request(app).post('/login')
            .send(user)
            .expect(200)
            .end(function (err, res) {
                token = res.body.token;
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get user by Token ', (done) => {
        request(app).get('/user')
            .set({JWT:token})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    let editedUser = {
        fullName: 'Omar',
        password: "omaramora11",
        email: "omarakram95@gmail.com"
    };

    it('Pass, Update user by ID  ', (done) => {
        request(app).patch(`/user/${userId}`)
            .set({JWT:token})
            .send(editedUser)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Pass, delete user by ID  ', (done) => {
        request(app).delete(`/user/${userId}`)
            .set({JWT:token})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

});



