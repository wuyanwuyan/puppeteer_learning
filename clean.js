const fs = require('fs');


let files = [];
// fs.readdirSync('./heros').forEach(file => {
//     files.push(file);
//
// });
//
//
// files.forEach(file=>{
//     const one = require(`./heros/${file}`);
//     let newOne = [];
//     one.forEach(item=>{
//         // 25% chance
//         if(item.type === 'small' && (/\d+% chance/g.test(item.text) || /\d+ seconds cooldown/g.test(item.text) )){
//             return
//         }else{
//             newOne.push(item);
//         }
//     });
//
//     fs.writeFileSync(`./heros/${file}`, JSON.stringify(newOne, null, 2), 'utf-8');
// })

// -----------------------------------

// function getAvaterUrl(heroName){
//     var name = heroName.toLowerCase().replace(/[\s'_]/g,"");
//     return "https://coding.net/u/dovahkiin/p/tempData/git/raw/master/avatar/" + encodeURIComponent(name) + ".png";
// }
//
//
// const all = require('./save/index.json');
//
// all.forEach(one => {
//     one.longAvatar = getAvaterUrl(one.heroName);
// })
//
//
// fs.writeFileSync(`./save/index_clean.json`, JSON.stringify(all, null, 2), 'utf-8');


// ----------------------------------
// const all = require('./save/index.json');
//
// all.forEach(one => {
//     let heroJson = require(`./heros/${one.heroName}.json`);
//     delete one.href;
//     heroJson.unshift(one);
//
//     fs.writeFileSync(`./heros/${one.heroName}.json`, JSON.stringify(heroJson, null, 2), 'utf-8');
// })

// --------------------------------------
// const old = require('./save/index.json');
//
// let index = 0;
// old.forEach(v => {
//     index++;
//     let one = require(`./heros/${v.heroName}.json`);
//     if(one[0].heroName)
//          one.shift();
//     delete v.href;
//     one.unshift(v);
//     fs.writeFileSync(`./heros/${v.heroName}.json`, JSON.stringify(one, null, 2), 'utf-8');
// })
//
//
// console.log('index ', index);

// ---------------------------------------------

// const index = require('./save/index.json');
// index.forEach(v=>{
//     delete v.heroAvater;
// })
// index.sort(function (a,b) {
//     return b.heroName.toLowerCase() > a.heroName.toLowerCase() ? -1 : 1;
// })
// fs.writeFileSync(`./save/index_sort.json`, JSON.stringify(index, null, 2), 'utf-8');