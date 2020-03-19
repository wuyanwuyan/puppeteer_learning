const puppeteer = require('puppeteer');
const fs = require('fs');


async function crawHeroVoice(url, heroName, heroData) {

    console.log('crawl ', url, heroName);


    const browser = await puppeteer.launch(
        {
            headless: false,
            // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            executablePath: 'D:\\Program Files (x86)\\chrome-win\\chrome.exe'
        }
    );
    const page = await browser.newPage();

    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
            console.log(`${i}: ${msg.args()[i]}`);
    });

    await page.goto(url, {
        waitUntil: ['domcontentloaded']
    });

    let ret = await page.evaluate(() => {
        const nodeNameArr = ['h2', 'p', 'ul'];

        let content = document.querySelector('#mw-content-text');
        if(content.children.length == 1) {
            content = content.querySelector('.mw-parser-output');
        }

        let sectionArr = [];

        Array.from(content.children).forEach((child, index) => {

            let nodeName = child.nodeName.toLowerCase();
            if (nodeNameArr.indexOf(nodeName) === -1) {
                return;
            }
            if (nodeName === 'h2') {
                sectionArr.push({
                    headTitle: child.textContent.trim(),
                    type: 'title'
                })
            } else if (nodeName === 'p') {

                Array.from(child.children).forEach((pchild, index) => {
                    let pNodeName = pchild.nodeName.toLowerCase();
                    if (pNodeName === 'b' && pchild.querySelector('img')) {

                        sectionArr.push({
                            imgUrl: pchild.querySelector('img').src,
                            skillName: pchild.textContent.trim(),
                            type: 'skill'
                        })
                    } else if (pNodeName === 'b') {
                        sectionArr.push({
                            text: pchild.textContent.trim(),
                            type: 'subTitle'
                        })

                    } else if (pNodeName === 'i' && pchild.querySelector('a') && pchild.querySelector('img') && pchild.querySelectorAll('img').length === 1) {
                        sectionArr.push({
                            imgUrl: pchild.querySelector('img').src,
                            skillName: pchild.textContent.trim(),
                            type: 'rune'
                        })
                    } else if (pNodeName === 'i') {

                        if(pchild.querySelectorAll('img').length > 1){
                            console.warn(' more than one image ');
                        }

                        sectionArr.push({
                            text: pchild.textContent.trim(),
                            type: 'middle'
                        })
                    } else if (pNodeName === 'small') {
                        let text = pchild.textContent.trim();
                        if (/\d+% chance/g.test(text) || /\d+ seconds cooldown/g.test(text)) {

                        } else {
                            sectionArr.push({
                                text: text,
                                type: 'small'
                            })
                        }

                    }
                })

            } else if (nodeName === 'ul') {
                let voices = [];
                let lis = child.querySelectorAll('li');
                Array.from(lis).forEach(li => {
                    if (!li.querySelector('audio.ext-audiobutton')) return;
                    if (li.innerHTML.indexOf('Unused response') !== -1 || li.innerHTML.indexOf('response rule error') !== -1) return;
                    let one = {
                        type: 'voice',
                        mp3Url: Array.from(li.querySelectorAll('audio.ext-audiobutton')).map(ele => {
                            return ele.firstChild.src
                        }),
                        // mp3Text: li.lastChild.textContent.trim()
                    };

                    Array.from(li.querySelectorAll('audio.ext-audiobutton')).forEach(el => el.parentNode.removeChild(el));
                    Array.from(li.querySelectorAll('a.ext-audiobutton')).forEach(el => el.parentNode.removeChild(el));
                    Array.from(li.querySelectorAll('.tooltip')).forEach(el => el.parentNode.removeChild(el));
                    let mp3Text = li.textContent.trim();
                    // if (!mp3Text) return;

                    one.mp3Text = mp3Text || '~~~';

                    let imgs = Array.from(li.querySelectorAll('img'));

                    if (imgs && imgs.length !== 0) {
                        one.imgs = imgs.map(img => {
                            return {
                                img: img.src,
                                name: img.parentNode.title
                            }
                        })
                    }

                    voices.push(one);
                });

                sectionArr.push({
                    voices
                })
            }
        });

        return sectionArr;

    });

    function findNearVoice(arr, value, index) {
        if (value.headTitle) {

            let result = [];
            for (var i = index + 1; i < arr.length; i++) {

                if (arr[i].voices && arr[i].voices.length !== 0) {
                    result = result.concat(arr[i].voices);
                }

                if (arr[i].headTitle) {
                    break;
                }
            }

            return result;
        }


        for (var i = index + 1; i < arr.length; i++) {
            if (arr[i].voices) {
                return arr[i].voices;
            }

            if (arr[i].headTitle) {
                return [];
            }
        }

        return [];
    }

    let finalResult = [];

    ret.forEach((value, index) => {
        if (value.voices && value.voices.length !== 0) {
            finalResult = finalResult.concat(value.voices);
            return;
        }

        let voice = findNearVoice(ret, value, index);
        if (voice && voice.length !== 0) {
            finalResult.push(value);
            return;
        }

    })


    delete heroData.href;
    finalResult.unshift(heroData);


    fs.writeFileSync(`./heros/${heroName}.json`, JSON.stringify(finalResult, null, 2), 'utf-8');


    await browser.close();
}


module.exports = {
    crawHeroVoice
}