//jsonchou util
function jc() {
    
}

jc.prototype.log = function (msg) {
    console.log('####################---时间：' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    console.log(msg);
    console.log('####################');
}

module.exports = jc;


