define(function (require, exports, module) {
    $(function () {
        exports.index = function () {
            console.log('index:' + jQuery('#j_demo').attr('id'));
        }
        exports.index();
    });
});