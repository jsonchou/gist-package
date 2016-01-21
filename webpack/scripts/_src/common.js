var _num = 100;
define(function (require, exports, module) {
   
    var comPath = "./com/";//why?

    var plus = require(comPath + "plus").plus;
    var min = require(comPath + "min").min;
    var multi = require(comPath + "multi").multi;
    var div = require(comPath + "div").div;

    plus(100);
    min(50);
    multi(2);
    div(5);

});