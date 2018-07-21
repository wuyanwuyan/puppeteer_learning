const fs = require('fs');
const download = require('download');
const COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
    AppId: 'test-1250000000',
    SecretId: 'AKIDzqTr0tlF4rQq2yC8QSEl36tQhmhOf56s',
    SecretKey: 'gAPPBm9IDtKVR7XhcFdnjPrLdiZBYgbJ',
});


let files = [];
fs.readdirSync('./heros').forEach(file => {
    files.push(file);
});

(async function () {

    for (var file of files) {
        let change = false;
        const hero = require(`./heros/${file}`);
        let heroDir = file.replace('.json', '');
        for (let i = 0; i < hero.length; i++) {
            let one = hero[i];
            if (one.type == 'voice') {
                let mp3UrlArr = one.mp3Url;

                for (var j = 0; j < mp3UrlArr.length; j++) {
                    let oneMp3 = mp3UrlArr[j];
                    if (oneMp3.indexOf('dota-1256174840.cos.ap-shanghai') === -1) {
                        let fileName = oneMp3.substr(oneMp3.lastIndexOf('/') + 1);
                        let distFile = `allmp3/${heroDir}/${fileName}`;
                        if (fs.existsSync(distFile)) {
                            try {
                                let ret = await uploadFile(`/${heroDir}/${fileName}`, distFile);
                                mp3UrlArr[j] = `https://${ret.Location}`;
                                change = true;
                            } catch (error) {
                                change && fs.writeFileSync(`./heros/${heroDir}.json`, JSON.stringify(hero, null, 2), 'utf-8');
                                console.warn(error);
                            }
                        } else {
                            console.warn('not exit ', oneMp3);
                        }
                    }
                }

            }
        }
        change && fs.writeFileSync(`./heros/${heroDir}.json`, JSON.stringify(hero, null, 2), 'utf-8');
    }

})()


function uploadFile(Key, FilePath) {
    return new Promise((resolve, reject) => {
        cos.sliceUploadFile({
            Bucket: 'dota-1256174840',
            Region: 'ap-shanghai',
            Key,
            FilePath
            // Key: '/aban/fool.png',
            // FilePath: './allmp3/fool.png'
        }, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log('upload success: ', data.Location);
                resolve(data);
            }
        });
    })
}