$(function () {
    //checkUser();
    topicControl();
});

function checkUser() {
    var ck = $.cookie('user');
    var box = $('#j_userPanel');
    if (ck) {
        $('#j_userPost').show();
        box.html("您好<a href='/user/" + ck.split('|')[1] + "'>" + ck.split('|')[1] + "</a>，<a href='/userinfo/'>修改信息</a>，<a href='/signout'>退出</a>");
    } else {
        $('#j_userPost').remove();
        box.html("您可以<a href='/signin'>登录</a>或<a href='/signup'>注册</a>");
    }
}

function topicControl() {
    //click
    $('.j_topicControl').find('a').on('click', function () {
        var o = $(this);
        var op = o.parents('.cell');
        var ohref = o.attr('href');
        var tag = ohref.replace('#', ''); //标识
        var id = op.attr('data-id');
        if (!id) {
            id = o.parents('.j_topicControl').attr('data-id');
        }

        if (ohref.indexOf('#') > -1) {
            var _ajax = function (tag, callback) {
                var url = '/topic/' + id + '/' + tag;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    success: function (msg) {
                        if (msg) {
                            var info = msg.message;
                            alert(msg.message);
                            if (info.indexOf('成功') > -1) {
                                location.reload();//刷新页面
                            }
                        }
                    }
                })
            }
            _ajax(tag);
        }

    });

    //hover
    $('.j_topicControl').mouseenter(function () {
        var o = $(this);
        o.find('.drop').show();
    }).mouseleave(function () {
        var o = $(this);
        o.find('.drop').hide();
    });
}

