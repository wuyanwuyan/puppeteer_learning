// https://cdn.max-c.com/app/dota2/sniper@3x.png
var urlExists = require('url-exists');
const fs = require('fs');

let isUrlOk = async function (url) {
    return new Promise((resolve, reject) => {
        urlExists(url, function (err, exists) {
            if (err) {
                reject()
                return;
            }
            resolve(exists);
        });
    })
}

const fix = require('./save/fix');


const heros = require('./save/index.json');

let index = 0;
(async function () {
    for (var hero of heros) {

        let name = hero.heroName;
        let urlName = name.toLowerCase().replace(/\s+/g, '_');
        let imgUrl = `https://cdn.max-c.com/app/dota2/${urlName}@3x.png`;


        let isExist = await isUrlOk(imgUrl);
        if (isExist) {

            hero.bannerImg = imgUrl;
            index++;
        } else if(fix[name]){
            hero.bannerImg = fix[name];
            index++;

        }else{
            console.log('not exit: ', name, ' - ', imgUrl);
        }
    }
    fs.writeFileSync(`./save/index_banner.json`, JSON.stringify(heros, null, 2), 'utf-8');
})();







