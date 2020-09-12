function checkImgIsOutSide(imgUrl) {
    return [
        'cloudfront.net',
        'gamepedia',
        'static.wikia.nocookie.net'
    ].some(v => imgUrl.indexOf(v) !== -1)
}


module.exports.checkImgIsOutSide = checkImgIsOutSide