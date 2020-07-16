const mongoose = require('mongoose');

function open() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            let Mockgoose = require('mockgoose').Mockgoose;
            let mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage().then(function () {
                mongoose.connect("mongodb://localhost:27017/MagazineApp", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useCreateIndex: true
                    },
                    (err, res) => {
                        if (err) return reject(err);
                        resolve();
                    });
            }).catch(reject);
        } else {
            mongoose.connect("mongodb://localhost:27017/MagazineApp", {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                },
                (err, res) => {
                    if (err) return reject(err);
                    resolve();
                });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = {close, open};
