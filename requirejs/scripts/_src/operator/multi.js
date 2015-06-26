define(function () {
    return function multi(val) {
        $('body').append("<p>" + val*2 + "</p>");
    }
});