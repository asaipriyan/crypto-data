const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment')
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const createPath = path.join(__dirname, '../../crypto-currency-data/list-of-cards');
if (!fs.existsSync(createPath)) {
    fs.mkdirSync(createPath);
}

module.exports = cron.schedule('0 */3 * * *', () => {
    request('https://minerstat.com/hardware/gpus', (error, response, html) => {
   
        console.log('loopy guy start');
        if (!error && response.statusCode == 200) {
            const currentTime = moment().format('DD_MM_YYYY_HH_mm');
            const writeStream = fs.createWriteStream(`${createPath}/data-${currentTime}.csv`);
            writeStream.write(`Card name, Coin name, Price \n`);

            const $ = cheerio.load(html);
            $('.box_table .tr').each((i, el) => {
                const title = $(el).find('.flexHardware > a').text();
                const value = $(el).find('.flexProfit .profits .coin:first .text > b').text().replace(/USD/g, '')
                const coinName = $(el).find('.flexProfit .profits .coin:first .text > small').text()
                writeStream.write(`${title}, ${coinName}, ${value} \n`) //1 dollar usd = 73 in INR
            })
            console.log('clonning is done');
        }
    })
});

