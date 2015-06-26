define(function () {
    return function div(val) {
        $('body').append("<p>" + val/2 + "</p>");
    }
});