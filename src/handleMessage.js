const {Quote} = require('./data/db/index.js');

const quoteArray = require('./data/quotes.json').quotes;

const regexp = new RegExp(quoteArray.join('|'), 'g');

module.exports = async (post) => {
    const {body, author} = await post;

    if (author.name === 'PrequelQuoteStats') return;

    const text = body.replace(/[^\w\s]/gi, '').toLowerCase(); // clean

    const matches = text.match(regexp);

    if (matches) {
        for (let quote of matches) {
            Quote.create({ quote, username: author.name, date: Date.now() }).then(async () => {
                /* Run a randdom chance generator to respond to the comment with stats for that particular quote */
                console.log('Quote inserted successfully.');
                if (Math.floor(Math.random()*100) > process.env.RESPONSE_PERCENT) {
                    //TODO add stats
                    const count = await Quote.where({ quote }).countDocuments();
                    const userCount = await Quote.where({ quote, username: author.name }).countDocuments();

                    return post.reply(`That quote, \`${quote}\`, has been used a total of \`${count}\` times in this subreddit and a total of \`${userCount}\` times by you since my release!\n\n*^(I am a bot that tracks the usage of prequel quotes in /r/prequelmemes!)*\n*^(Contact my creator /u/DaJuukes if I break!)*`);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};
