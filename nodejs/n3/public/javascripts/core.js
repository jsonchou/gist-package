var _env = 'real'; //real,dev

var _host = document.location.host;
if (_host.indexOf('localhost:') > -1 || _host.indexOf('127.0.0.1') > -1 || _host.indexOf('10.1.') > -1) {
    _env = 'dev';
}

var _domain = 'uzai.com';
var _ua = navigator.userAgent.toLowerCase();
var _uzw = window._uzw || {}; 

_uzw.regex = {
    qq: "^[1-9]*[1-9][0-9]*$",
    mobile: "^(13|15|17|18)[0-9]{9}$",
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"
};

_uzw.cookie = {
    set: function (k, v, day) {
        day = day === undefined ? 7 : day;
        $.cookie(k, v, { expires: day, path: '/', domain: _uzw.env === 'real' ? _domain : '' });
    },
    get: function (k) {
        var ck = $.cookie(k);
        if (ck) {
            return v;
        }
        return null;
    },
    del: function (k) {
        var ck = _uzw.cookie.get(k);
        if (ck) {
            $.cookie(k, '', { expires: -1, path: '/', domain: _uzw.env === 'real' ? _domain : '' });
        }
    }
}