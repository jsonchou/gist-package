require.config({
    baseUrl: "/requirejs/scripts/_src/",
    paths: {
        core: '/requirejs/scripts/core',
    },
    urlArgs: "v=" + (new Date()).getTime()
});

require(['core', 'operator/operator'], function (core, operator) {
    operator(222);
    //console.log($('#j_tigger').html());
});


//总结：
//1、相比seajs，seajs的方法暴露手段，更加优雅美观，requirejs: return function(){}，而seajs统一使用exports.xxx()
//2、AMD与CDM的区别：两者都可以依赖加载JS，但，AMD：JS加载前置，CMD：JS可按需加载
//3、两者在压缩方法，需要屏蔽关键字'define', 'require', 'exports', 'module'