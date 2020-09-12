const fs = require('fs');
const download = require('download');

const {checkImgIsOutSide} =require('./utils')

var all = {};

let files = [];
fs.readdirSync('./heros').forEach(file => {
    files.push(file);
});

(async function () {

    for (var file of files) {
        console.log('start ', file);
        const hero = require(`./heros/${file}`);
        await downloadOneHero(hero, file.replace('.json', ''));
    }

})()



async function downloadOneHero(hero, heroDir) {
    for (let i = 0; i < hero.length; i++) {
        let one = hero[i];
        if (one.type == 'voice') {
            let imgs = one.imgs;
            if (imgs && imgs.length !== 0) {
                for (var imgObj of imgs) {
                    if (checkImgIsOutSide(imgObj.img)) {
                        try {
                            let finalUrl = await downloadUrl(imgObj.img);
                            imgObj.img = finalUrl;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            }

        } else if (one.type == 'rune' || one.type == 'skill') {
            if (checkImgIsOutSide(one.imgUrl)) {
                let finalUrl = await downloadUrl(one.imgUrl);
                one.imgUrl = finalUrl;
            }
        }
    }
    fs.writeFileSync(`./heros/${heroDir}.json`, JSON.stringify(hero, null, 2), 'utf-8');
}


async function downloadUrl(url) {

    let finalUrl = url.replace(/\.png.*$/, '.png').replace(/\.jpg.*$/, '.jpg')
    // let removeQuery = url.substr(0, url.lastIndexOf('?'));
    let fileName = finalUrl.substr(finalUrl.lastIndexOf('/') + 1);

    // 小图片存放到腾讯云
    let cosUrl = `https://dota-mini-1256174840.cos.ap-shanghai.myqcloud.com/${encodeURIComponent(fileName)}`;
    let texists = await isUrlOk(cosUrl);

    if (texists) {
        return cosUrl;
    } else {
        console.log('------------- 不可能：', url, '  fileName: ', fileName);
    }

    return url;
}

async function isUrlOk(url) {
    return new Promise((resolve, reject) => {
        require('url-exists')(url, function (err, exists) {
            if (err) {
                reject()
                return;
            }
            resolve(exists);
        });
    })
}
