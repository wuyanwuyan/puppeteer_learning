const puppeteer = require('puppeteer');
const fs = require('fs');
const heros = require('./save/index.json');

let allHero = [];
fs.readdirSync('F:\\BaiduYunDownload\\dota\\assets\\heroes').forEach(file => {
    // var contents = fs.readFileSync('./heros/' + file, 'utf8');
    // fs.writeFileSync(`./herosjs/${file.replace('json','js')}`, 'module.exports = ' + contents);
    allHero.push(file);

});

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            executablePath: 'D:\\Program Files (x86)\\chrome-win32\\chrome.exe'
        }
    );
    const page = await browser.newPage();

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });

    for(var one of allHero){

        let name = one.toLowerCase().replace("_","");

        await page.goto(`file:///F:/BaiduYunDownload/dota/assets/heroes/${one}/anim.webp`);

        await page.setViewport({ width: 130, height: 170});

        await page.screenshot({path: `./avatar/${name}.png`});


    }



    // let ret = await page.evaluate(() => {
    // })


    // await browser.close();
})();