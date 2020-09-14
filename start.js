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

    jsonName = "The Disciple's Path";
    one = baseInfo.find(v => v.heroName == 'Anti-Mage');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/am_female.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/The_Disciple%27s_Path/Responses', jsonName, one);

    jsonName = "The Eminence of Ristul";
    one = baseInfo.find(v => v.heroName == 'Queen of Pain');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/qop_arcana.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/The_Eminence_of_Ristul_Bundle/Responses', jsonName, one);

    jsonName = "The One True King";
    one = baseInfo.find(v => v.heroName == 'Wraith King');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/klw_arcana.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/The_One_True_King_Bundle/Responses', jsonName, one);

    jsonName = "Compass of the Rising Gale";
    one = baseInfo.find(v => v.heroName == 'Windranger');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/wind_arcana.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Compass_of_the_Rising_Gale_Bundle/Responses', jsonName, one);

    jsonName = "The Toy Butcher";
    one = baseInfo.find(v => v.heroName == 'Pudge');
    one.bannerImg = 'https://dota-image.nos-eastchina1.126.net/tufu_arcana.jpg';
    if (!fs.existsSync(`./heros/${jsonName}.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/The_Toy_Butcher/Responses', jsonName, one);

})();