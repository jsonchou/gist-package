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


