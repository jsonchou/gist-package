define(function () {
    return function add(val) {
        //console.log(_ug);
        console.log(_env);
        $('body').append("<p>" + val++ + "</p>");
    }
});