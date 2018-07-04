const puppeteer = require('puppeteer');
const fs = require('fs');


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

    await page.goto('http://www.dota2.com.cn/heroes/', {
        waitUntil: ['domcontentloaded']
    });

    let ret = await page.evaluate(() => {
        let result = [];

        Array.from(document.querySelectorAll(".heroPickerIconLink")).forEach(v=>{
            result.push(v.href);
        })

        return result;
    })



    const page2 = await browser.newPage();

    page2.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });


    let arr = []
    for(var url of ret){
        await page2.goto(url, {
            waitUntil: ['domcontentloaded']
        });

        let info = await page2.evaluate(() => {
            let topcard = document.querySelector('.top_hero_card');
            let info = {
                avatarFull : topcard.querySelector('img').src,
                cnName : topcard.querySelector('p').firstChild.textContent.trim(),
                enName : topcard.querySelector('p').lastChild.textContent.trim(),
                longAvatar : document.querySelector('img.hero_b').src
            }

            return info;
        });

        arr.push(info);

    }

    fs.writeFileSync('./save/index_CN.json', JSON.stringify(arr, null, 2), 'utf-8');


    // await page.screenshot({path: 'example.png'});

    await browser.close();
})();