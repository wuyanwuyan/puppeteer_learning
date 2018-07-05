const fs = require('fs');

const {crawHeroVoice} = require('./content');

const baseInfo = require('./save/index.json');
(async () => {
    for (var one of baseInfo) {
        if (!fs.existsSync(`./heros/${one.heroName}.json`))
            await crawHeroVoice(one.href, one.heroName, one);
    }

    // https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy

    //特殊处理
    let jsonName = 'juggarcana';
    one = baseInfo.find(v => v.heroName == 'Juggernaut');
    one.bannerImg = 'https://s1.ax2x.com/2018/07/05/omxKY.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy', jsonName, one);


    jsonName = 'spectremercurial';
    one = baseInfo.find(v => v.heroName == 'Spectre');
    one.bannerImg = 'https://s1.ax2x.com/2018/07/05/ozTWn.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Mercurial%27s_Call', jsonName, one);

})();