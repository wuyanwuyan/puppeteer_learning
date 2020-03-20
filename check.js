const fs = require('fs');
const download = require('download');

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
                    if (imgObj.img.indexOf('cloudfront.net') !== -1 || imgObj.img.indexOf('gamepedia') !== -1) {
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
            if (one.imgUrl.indexOf('cloudfront.net') !== -1 || one.imgUrl.indexOf('gamepedia') !== -1) {
                let finalUrl = await downloadUrl(one.imgUrl);
                one.imgUrl = finalUrl;
            }
        }
    }
    fs.writeFileSync(`./heros/${heroDir}.json`, JSON.stringify(hero, null, 2), 'utf-8');
}


async function downloadUrl(url) {

    let finalUrl = url;
    let removeQuery = url.substr(0, url.lastIndexOf('?'));
    let fileName = removeQuery.substr(removeQuery.lastIndexOf('/') + 1);

    // 小图片存放到腾讯云
    let cosUrl = `https://dota-mini-1256174840.cos.ap-shanghai.myqcloud.com/${encodeURIComponent(fileName)}`;
    let texists = await isUrlOk(cosUrl);

    if (texists) {
        finalUrl = cosUrl;
    } else {
        console.log('------------- 不可能：', url, '  fileName: ', fileName);
    }

    return finalUrl;
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