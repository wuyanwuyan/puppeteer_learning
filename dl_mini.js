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
                    if (imgObj.img.indexOf('cloudfront.net') !== -1) {
                        try {
                            await downloadUrl(imgObj.img);
                        } catch (e) {
                            console.log(e);
                            await wait();
                            await downloadUrl(imgObj.img);
                        }
                    }
                }
            }

        } else if (one.type == 'rune' || one.type == 'skill') {
            if (one.imgUrl.indexOf('cloudfront.net') !== -1) {
                await downloadUrl(one.imgUrl);
            }
        }
    }
}


function downloadUrl(url) {

    let removeQuery = url.substr(0, url.lastIndexOf('?'));
    let fileName = removeQuery.substr(removeQuery.lastIndexOf('/') + 1);

    // return;

    if (!all[fileName]) {
        all[fileName] = url;
    } else if (all[fileName] !== url) {
        throw new Error(`${ all[fileName]}  ,  ${url}`);
    }

    let distFile = `allmini/${fileName}`;
    let new_distFile = `allmini_new/${fileName}`;
    if (fs.existsSync(distFile)) {
        return Promise.resolve();
    }


    console.log('download ', url);
    return download(url).then(data => {
        fs.writeFileSync(distFile, data);
        fs.writeFileSync(new_distFile, data);
        console.log('download success: ', url);
    });
}

function wait(time = 2000) {
    return new Promise((re, rj) => {
        setTimeout(() => {
            re();
        }, time);
    })
}