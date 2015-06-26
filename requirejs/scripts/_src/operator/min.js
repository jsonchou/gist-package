define(function () {
    return function min(val) {
        $('body').append("<p>" + val-- + "</p>");
    }
});