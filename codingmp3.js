const fs = require('fs');

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
                    let fileName = oneMp3.substr(oneMp3.lastIndexOf('/') + 1);
                    let distFile = `allmp3/${heroDir}/${fileName}`;
                    if (fs.existsSync(distFile)) {

                        // https://dovahkiin.coding.net/p/tempData/d/tempData/git/raw/master/allmp3/Arc%20Warden/Arcwar_ally_02.mp3

                        mp3UrlArr[j] = `https://dovahkiin.coding.net/p/tempData/d/tempData/git/raw/master/allmp3/${encodeURIComponent(heroDir)}/${fileName}`;
                        change = true;
                    } else {
                        console.warn('not exit ', oneMp3);
                    }

                }

            }
        }
        change && fs.writeFileSync(`./heros/${heroDir}.json`, JSON.stringify(hero, null, 2), 'utf-8');
    }
})()