const fs = require('fs');

fs.readdirSync('./heros').forEach(file => {
    var contents = fs.readFileSync('./heros/' + file, 'utf8');
    fs.writeFileSync(`./herosjs/${file.replace('json','js')}`, 'module.exports = ' + contents);
})
