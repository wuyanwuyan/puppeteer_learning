const fs = require('fs');

const {crawHeroVoice} = require('./content');

const baseInfo = require('./save/index.json');
(async () => {
    for (var one of baseInfo) {
        if (!fs.existsSync(`./heros/${one.heroName}.json`)){
            if(one.href){
                await crawHeroVoice(one.href, one.heroName, one);
            }else{
                fs.writeFileSync(`./heros/${one.heroName}.json`, JSON.stringify([one], null, 2), 'utf-8');
            }
        }

    }

    // https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy

    //特殊处理
    let jsonName = 'juggarcana';
    one = baseInfo.find(v => v.heroName == 'Juggernaut');
    one.bannerImg = 'https://dota-image-1256174840.cos.ap-shanghai.myqcloud.com/omxKY.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy', jsonName, one);


    jsonName = 'spectremercurial';
    one = baseInfo.find(v => v.heroName == 'Spectre');
    one.bannerImg = 'https://dota-image-1256174840.cos.ap-shanghai.myqcloud.com/ozTWn.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Mercurial%27s_Call', jsonName, one);

    jsonName = 'Acolyte of the Lost Arts';
    one = baseInfo.find(v => v.heroName == 'Invoker');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/invoker_mini.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Acolyte_of_the_Lost_Arts/Responses', jsonName, one);

})();