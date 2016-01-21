define(function (require, exports, module) {

    exports.index = function () {
        console.log('index:' + jQuery('#j_demo').attr('id'));
    }

    exports.fullPage = function () {
        var oFP = $('#j_fullPage');
        oFP.fullpage({
            navigation: true,
            afterRender: function () {
                setTimeout(function () {
                    //$.fn.fullpage.moveSectionDown();
                }, 3000);
            },
            afterLoad: function (anchorLink, index) {

            },
            onLeave: function (index, direction) {

            }
        });

    }

    $(function () {

        exports.index();
        exports.fullPage();

    });
});