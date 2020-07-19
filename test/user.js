process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const should = require('chai').should();
const request = require('supertest');

const app = require('../MagazineServer/app');
const conn = require('../MagazineServer/utils/db');

/*
* Testing Signup, Login, Article CRUD operations
* */

describe('Signup, Login, Article CRUD operations /user /article /login', () => {
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

    let getArticleId;

    let testArticle1 = {
        title: "Test Article1",
        description: "This is a test1",
    };

    let testArticle2 = {
        title: "Test Article2",
        description: "This is a test2",
    };
    let testArticle3 = {
        title: "Test Article3",
        description: "This is a test3",
    };

    let updateArticle = {
        title: "Update Article",
        description: "This is Article updated"
    };

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
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('Pass, posting article1 ', (done) => {
        request(app).post('/article')
            .set({JWT: token})
            .send(testArticle1)
            .expect(201)
            .end(function (err, res) {
                console.log(res.body);
                getArticleId = res.body._id;
                if (err) return done(err);
                done();
            });
    });

    it('Pass, posting article2 ', (done) => {
        request(app).post('/article')
            .set({JWT: token})
            .send(testArticle2)
            .expect(201)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, posting article3 ', (done) => {
        request(app).post('/article')
            .set({JWT: token})
            .send(testArticle3)
            .expect(201)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get all Articles ', (done) => {
        request(app).get('/article/all')
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get current user Articles ', (done) => {
        request(app).get('/article/myarticles')
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get a specific Article ', (done) => {
        request(app).get(`/article/${getArticleId}`)
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Update a specific Article ', (done) => {
        request(app).patch(`/article/${getArticleId}`)
            .set({JWT: token})
            .send(updateArticle)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get all Articles after update ', (done) => {
        request(app).get('/article/all')
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, delete a specific Article ', (done) => {
        request(app).delete(`/article/${getArticleId}`)
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    it('Pass, Get all Articles after delete ', (done) => {
        request(app).get('/article/all')
            .set({JWT: token})
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                done();
            });
    });

    // it('Pass, Update user by ID  ', (done) => {
    //     request(app).patch(`/user/${userId}`)
    //         .set({JWT: token})
    //         .send(editedUser)
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) return done(err);
    //             done();
    //         });
    // });
    //
    // it('Pass, delete user by ID  ', (done) => {
    //     request(app).delete(`/user/${userId}`)
    //         .set({JWT: token})
    //         .expect(200)
    //         .end(function (err, res) {
    //             if (err) return done(err);
    //             done();
    //         });
    // });

});


/*
* Testing User CRUD operations
* */
// describe('POST /user', () => {
//     before((done) => {
//         conn.open()
//             .then(() => done())
//             .catch((err) => done(err));
//     });
//
//     after((done) => {
//         conn.close()
//             .then(() => done())
//             .catch((err) => done(err));
//     });
//
//     it('Create a New user ', (done) => {
//         request(app).post('/user')
//             .send({fullName: 'Omar Akram', password: "omarakram11", email: "omarakram958@gmail.com"})
//             .expect(201)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
//
//     it('Fail, Wrong Email', (done) => {
//         request(app).post('/user')
//             .send({fullName: 'Omar Akram', password: "omarakram11", email: "omarakram958"})
//             .expect(409)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
//
//     it('Fail, Short password', (done) => {
//         request(app).post('/user')
//             .send({fullName: 'Omar Akram', password: "omara", email: "omarakram958"})
//             .expect(409)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
//
//     it('Fail, Missing Values', (done) => {
//         request(app).post('/user')
//             .send({fullName: 'Omar Akram'})
//             .expect(409)
//             .end(function (err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
//
// });
