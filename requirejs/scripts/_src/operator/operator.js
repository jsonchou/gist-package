define(['operator/add', 'operator/min', 'operator/multi', 'operator/div'], function (a, b, c, d) {
    return function operator(flag) {
        a(flag);
        b(flag);
        c(flag);
        d(flag);
    }
});