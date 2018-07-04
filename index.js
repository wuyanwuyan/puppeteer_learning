const puppeteer = require('puppeteer');
const fs = require('fs');

console.log('---- login name');

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            executablePath: 'D:\\Program Files (x86)\\chrome-win32\\chrome.exe'
        }
    );
    const page = await browser.newPage();

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });

    await page.goto('https://dota2.gamepedia.com/Voice_actors', {
        waitUntil: ['domcontentloaded']
    });

    let ret = await page.evaluate(() => {
        var trs = document.querySelectorAll('#mw-content-text tbody tr');

        trs = Array.from(trs).filter(tr => tr.children.length !== 0);

        trs.shift();


        let result = [];
        trs.forEach(tr => {

            let actorImg = tr.children[0].querySelector('img').src;
            let actor = tr.children[1].textContent.trim();
            let actorUrl = tr.children[1].querySelector('a') && tr.children[1].querySelector('a').href;
            let lis = tr.children[2].querySelectorAll('ul li');
            for (let li of lis) {
                if (li.textContent.indexOf('responses') !== -1 && li.textContent.indexOf('Trailer') === -1 && li.querySelector('img')) {

                    let span = li.children[0];
                    let small = li.children[1];
                    let heroAvater = li.querySelector('img').src;
                    let heroName = span.children[1].textContent;
                    let href = small.querySelector('a').href;
                    result.push({
                        actorImg,
                        actor,
                        actorUrl,
                        heroAvater,
                        heroName: heroName.trim(),
                        href
                    })
                }
            }

        })

        return result;
    })



    const page2 = await browser.newPage();

    page2.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });


    for(var oneHero of ret){
        await page2.goto(oneHero.href.replace("/Responses",''), {
            waitUntil: ['domcontentloaded']
        });

        let info = await page2.evaluate(() => {
            let infobox =  document.querySelector('.infobox');
            let primaryAttribute = infobox.querySelector('#primaryAttribute');
            let ret = {
                avaterMain : infobox.querySelector('img').src,
                primaryAttribute : primaryAttribute && primaryAttribute.querySelector('a').title
            };

            return ret;
        });

        Object.assign(oneHero,info);
    }

    fs.writeFileSync('./save/index.json', JSON.stringify(ret, null, 2), 'utf-8');


    // await page.screenshot({path: 'example.png'});

    await browser.close();
})();