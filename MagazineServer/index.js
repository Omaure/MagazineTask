const conn = require('./utils/db'); // <-- db.js
const app = require('./app'); // <-- app.js

const PORT = process.env.PORT || 3100;

conn.open().then(() => {
    app.listen(PORT, (err) => {

        if (!err) {
            console.log(`Server is Listening on ${PORT}`);
        } else {
            console.log(chalk.bgRed.white(err))
        }
    });
});
