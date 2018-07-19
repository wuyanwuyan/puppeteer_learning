const fs = require('fs');
const download = require('download');
const COS = require('cos-nodejs-sdk-v5');

let files = [];
fs.readdirSync('./heros').forEach(file => {
    files.push(file);
});

files = ["Nature's Prophet"];

(async function () {

    for (var file of files) {
        const hero = require(`./heros/${file}`);
        await downloadOneHero(hero);
    }

})()


async function downloadOneHero(hero) {
    let heroName = hero[0].heroName;
    for (let i = 0; i < hero.length; i++) {
        let one = hero[i];
        if (one.type == 'voice') {
            let mp3UrlArr = one.mp3Url;

            for (var oneMp3 of mp3UrlArr) {
                if(oneMp3.indexOf('dota-1256174840.cos.ap-shanghai') === -1){
                    await downloadUrl(oneMp3, heroName);
                }
            }

        }
    }
}


function downloadUrl(url, heroName) {
    // console.log('download ', url);
    let fileName = url.substr(url.lastIndexOf('/') + 1);

    // return;


    let dir = `allmp3/${heroName}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let distFile = `allmp3/${heroName}/${fileName}`;
    if (fs.existsSync(distFile)) {
        return Promise.resolve();
    }

    return download(url).then(data => {
        console.log('download success: ', url);
        fs.writeFileSync(distFile, data);
    });
}

//
// var cos = new COS({
//     AppId: 'test-1250000000',
//     SecretId: 'AKIDzqTr0tlF4rQq2yC8QSEl36tQhmhOf56s',
//     SecretKey: 'gAPPBm9IDtKVR7XhcFdnjPrLdiZBYgbJ',
// });
//
//
// function uploadFile(Key, FilePath) {
//     return new Promise((resolve, reject) => {
//         cos.sliceUploadFile({
//             Bucket: 'dota-1256174840',
//             Region: 'ap-shanghai',
//             Key,
//             FilePath
//             // Key: '/aban/fool.png',
//             // FilePath: './allmp3/fool.png'
//         }, function (err, data) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }