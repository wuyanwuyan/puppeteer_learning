const fs = require('fs');

const {crawHeroVoice} = require('./content');

const baseInfo = require('./save/index.json');
(async () => {
    // await crawHeroVoice("https://dota2.gamepedia.com/Phantom_Assassin/Responses", "Phantom Assassin");
    // await crawHeroVoice("https://dota2.gamepedia.com/Pudge/Responses", "Pudge");
    // await crawHeroVoice("https://dota2.gamepedia.com/Shadow_Fiend/Responses", "Shadow Fiend");
    for (var one of baseInfo) {
        if (!fs.existsSync(`./heros/${one.heroName}.json`))
            await crawHeroVoice(one.href, one.heroName, one);
    }

    // https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy

    //特殊处理
    one = baseInfo.find(v => v.heroName == 'Juggernaut');
    one.bannerImg = 'https://edge.alluremedia.com.au/m/k/2017/03/juggernaut.jpg';
    if (!fs.existsSync(`./heros/juggarcana.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Call_of_the_Bladeform_Legacy', 'juggarcana', one);


    one = baseInfo.find(v => v.heroName == 'Spectre');
    one.bannerImg = 'http://img-www.pcgames.com.cn//html/viewpic_pcgames.htm?http://img0.pcgames.com.cn/pcgames/1308/21/2961342_7.jpg&channel=4793';
    if (!fs.existsSync(`./heros/spectremercurial.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Mercurial%27s_Call', 'spectremercurial', one);

})();