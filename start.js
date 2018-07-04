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
    one.bannerImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530743418191&di=a255d7c96a0b7873a4d1c38a431c8088&imgtype=0&src=http%3A%2F%2Fi3.17173cdn.com%2F2fhnvk%2FYWxqaGBf%2Foutcms%2FiNkxgKbkvtjfEnj.jpg';
    if (!fs.existsSync(`./heros/spectremercurial.json`))
        await crawHeroVoice('https://dota2.gamepedia.com/Mercurial%27s_Call', 'spectremercurial', one);

})();