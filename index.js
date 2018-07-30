// Reddit Dependencies
const Snoowrap = require('snoowrap');
const SnooStream = require('snoostream');

//Environment Variables
const env = require('dotenv').config({ path: "./src/data/env/var.env" });

if (env.error) {
    console.log('Error initializing environment variables:\n' + env.error);
    process.exit(0);
}

//Database setup
const setupDatabase = require('./src/data/db/setup.js');

//require handleMessage
const handleMessage = require('./src/handleMessage.js');

//Define snoosetup
const setupSnoowrap = () => {
    const snoowrap = new Snoowrap({
        userAgent:    process.env.USER_AGENT,
        clientId:     process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        username:     process.env.PROJECT_NAME,
        password:     process.env.PASSWORD
    });

    const snoostream = SnooStream(snoowrap).commentStream('PrequelQuoteStats');

    return {
        snoowrap,
        snoostream
    };
};

//Define main function

const main = async () => {
    await setupDatabase();
    const {snoowrap, snoostream} = await setupSnoowrap();

    snoostream.on('post', (post) => {
        handleMessage(post, snoowrap);
    });

};

main().catch((err) => {
    console.log(err);
    process.exit(0);
});
