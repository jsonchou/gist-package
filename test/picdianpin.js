$(function () {

    initShare();

    checkArrowStatus();

    dropMoreShare(); //更多分享下拉

    picMark(); //点击滚到回复框

    showMoreShare(); //展示更多分享项

    //picShare(); //分享

    scrollToMark(); //滚动到回复

    dingAdd(); // 点击加1

    textareaLimit(); //包含两处方法

    initPop(); //初始化pop

    activePop(); //触发pop

    activePopCopy(); //点评页面触发pop

    unitThumbClick(); // 点击小图片

    unitLR(); //点击左右

    markAdd(); //添加回复

    IE6Fix();//IE6 fix

    //跳出登录窗
    $('#popDP .r .col2 .p2 .s4 a').click(function () {
        editWidget2("http://u.uzai.com/QuickLogin?actionName=showTalkBack", 250, 640);
        return false;
    });
    $("#markbox").find("span.s2 a").click(function () {
        editWidget2("http://u.uzai.com/QuickLogin?actionName=showTalkBackList", 250, 640);
        return false;
    });
    //点评详细页面中的列表回复
    $("input[id^='btnAdd_']").click(function () {
        var imageId = $(this).attr("id").substr($(this).attr("id").lastIndexOf('_') + 1);
        var content = $("#txtTalkBackContent_" + imageId).val();
        if ($.trim(content) == "") {
            alert("回复内容为必填！");
            return;
        }
        var userId = GetCookie("user", "userid");
        if (userId == null || userId == "") {
            $(this).attr("flag", "1");
            editWidget2("http://u.uzai.com/QuickLogin?actionName=showTalkBackList", 250, 640);
            return;
        }
        var talkBackId = $("#txtHiddenTalkBackId").val();
        addTalkBack(talkBackId, imageId, userId, encodeURIComponent(content), 0);
        $("#txtTalkBackContent_" + imageId).val("");
        //展示
        var o = $(this);
        var odl = o.parents('div.dropMarkInner').find('dl');
        odl.find('dd:last').remove();
        var newcontent = "<dd class='fn-clear' style='display:none;' ><img width='30' height='30' src='" + (GetCookie("user", "headUrl") == "" ? "http://r.uzaicdn.com/content/UserCenter/Images/UserIndex/33.jpg" : "http://r.uzaicdn.com/picPhone.aspx?file=" + GetCookie("user", "headUrl") + "&h=100&w=100&t=1") + "'><span><label class='blue'>" + GetCookie("user", "userName") + "</label>：" + content + "</span><p>刚刚</p></dd>";
        odl.prepend(newcontent);
        odl.find('dd:first').fadeIn('slow');
    });
    //点评详细页面中的回复
    $("#btnTalkBackSubmit").click(function () {
        var talkBackId = $("#txtHiddenTalkBackId").val();
        var content = $("#txtTalkBackArea").val();
        if ($.trim(content) == "") {
            alert("回复内容为必填！");
            return;
        }
        var userId = GetCookie("user", "userid");
        if (userId == null || userId == "") {
            $(this).attr("flag", "1");
            editWidget2("http://u.uzai.com/QuickLogin?actionName=showTalkBackList", 250, 640);
            return;
        }
        addTalkBack(talkBackId, 0, userId, encodeURIComponent(content), 0);
        $("#txtTalkBackArea").val("");
        alert("回复成功!");
		//刷新页面
        var url = window.location.href;
		if (url.indexOf("ucache=") > 0) {
            window.location.href = window.location.href.replace('ucache=', 'ucache=' + Math.random());
        }
        else {
            if (url.indexOf("?") > 0) {
                window.location.href = window.location.href + "&ucache=" + Math.random();
            } else {
                window.location.href = window.location.href + "?ucache=" + Math.random();
            }
        }
    });
});
//回调函数
function showTalkBackList() {
    var userId = GetCookie("user", "userid")
    if (userId != null && userId != "") {
        $("#markbox").find("span.s2").hide();
    } else {
        $("#markbox").find("span.s2").show();
    }
    $("input[id^=btnAdd_][flag=1]").click().attr("flag", "0");
    if ($("#btnTalkBackSubmit").attr("flag") == "1") {
        $("#btnTalkBackSubmit").click();
        $("#btnTalkBackSubmit").attr("flag", "0");
    }
}
/****定位到回访*****/
function showTalkBack() {
    var userId = GetCookie("user", "userid")
    if (userId != null && userId != "") {
        $('#popDP .r .col2 .p2 .s4').hide();
    } else {
        $('#popDP .r .col2 .p2 .s4').show();
    }
    //是否直接添加回复内容
    if ($('#btnMark').attr("flag") == "1") {
        $('#btnMark').click();
        $("#btnMark").attr("flag", "0");
    }
}
/***初始化回复列表***/
function initTalkBack(talkBackId, imageId) {
    $("#popDP .r .col3 #ulMarkList").html("");
    $('#popDP .r .col2 .s3 label').text("0");
    $.ajax({
        type: "POST",
        url: "/ashx/ashx0016.ashx?type=4&talkBackId=" + talkBackId + "&imageId=" + imageId + "&rand=" + Math.random(),
        success: function (msg) {
            var replyHtml = "";
            if ($.trim(msg) != "") {
                var hList = msg.split("^");
                var eimg = "http://r.uzaicdn.com/content/UserCenter/Images/UserIndex/33.jpg";
                for (var i = 0; i < hList.length; i++) {
                    replyHtml += "<li class='fn-clear'><span>"
                    + "<img onerror=this.src='" + eimg + "' src='" + (hList[i].split('#')[1] == eimg ? "" : "http://r.uzaicdn.com/picPhone.aspx?file=" + hList[i].split('#')[1] + "&h=100&w=100&t=1") + "' width='30' height='30'/></span>"
                    + "<p>"
                    + "<a href='javascript:void(0)' class='blue'>" + hList[i].split('#')[0] + "</a>：" + hList[i].split('#')[2] + "<br />"
                    + "" + hList[i].split('#')[3] + ""
                    + "</p>"
                    + "</li>";
                }
                $("#popDP .r .col3 #ulMarkList").html(replyHtml);
                //总回复数
                $('#popDP .r .col2 .s3 label').text(hList.length);
            }
        }
    });         //end ajax
}
function checkArrowStatus() {
    var aon = $('ul.overview').find('a.on');
    var olist = $('ul.overview').find('a');
    var oindex = olist.index(aon);

    if (oindex == 0) {
        $('.dp-focus-btn a').eq(0).removeClass('dp-focus-btn-prev-on').addClass('dp-focus-btn-prev');
    }

    else if (oindex == olist.size() - 1) {
        $('.dp-focus-btn a').eq(1).removeClass('dp-focus-btn-next-on').addClass('dp-focus-btn-next');
    }

    else {
        $('.dp-focus-btn a').eq(0).removeClass('dp-focus-btn-prev').addClass('dp-focus-btn-prev-on');
        $('.dp-focus-btn a').eq(1).removeClass('dp-focus-btn-next').addClass('dp-focus-btn-next-on');
    }

    changeCurrentPic(oindex);

}

//图片滑动
function popSlide() {
    //左右鼠标
    $('.dp-focus').hover(function () {
        var o = $(this);
        o.find('.dp-focus-btn').show();
    }, function () {
        var o = $(this);
        o.find('.dp-focus-btn').hide();
    });
}

function unitLR() {
    //左右点击
    $('.dp-focus-btn a').live("click", function () {
        var o = $(this);
        var aon = $('ul.overview').find('a.on');
        var lion = aon.parent('li')

        var linum = $('ul.overview').find('li').size();
        var anum = $('ul.overview').find('a').size();

        var liIndex = lion.parent('ul').find('li').index(lion);
        var aIndex = lion.find('a').index(aon);

        if (o.text() == 'left') {
            if ((liIndex > 0) && aIndex == 0) {
                var liIndexTemp = liIndex;
                $('#slider-code').find('a.prev').click();
                lion.prev('li').find('a:last').click();
            }
            else {
                aon.prev('a').click();
            }
        }
        else if (o.text() == 'right') {
            if ((liIndex < linum - 1) && aIndex == 4) {
                var liIndexTemp = liIndex;
                $('#slider-code').find('a.next').click();
                lion.next('li').find('a:first').click();
            }
            else {
                aon.next('a').click();
            }
        }


        checkArrowStatus();

        return false;

    });
}
/****点击小图***/
function unitThumbClick() {
    //点击图片
    $('#slider-code .overview li a').live("click", function () {
        var o = $(this);
        var os = o.parents('.overview').find('a');
        var oimg = o.find('img');
        var oalt = oimg.attr('alt');
        os.removeClass('on');
        o.addClass('on');
        var ot = oimg.attr('data-img');
        $('#dp-focus-img').empty();
        $('#dp-focus-img').append("<img class='initImg' src='http://r.uzaicdn.com/content/product/bg.gif' / >");
        $('#dp-focus-img').find('.initImg').attr('src', ot).hide();
        checkArrowStatus();
        popPicRotate();
        //true cookie 中存在
        if (checkDingStatus(oimg.attr('imageid'))) {
            $('#ding label').removeClass().addClass('on');
        }
        else {
            $('#ding label').removeClass();
        }
        //文字说明
        $('#popDP .r .col2 .p1 label').text(oalt);
        //顶赋值、ID
        $('#popDP .r .col1 .ding label b').attr("id", oimg.attr('imageid')).text(oimg.attr('topnum'));
        //提交回复按钮赋值
        $('#popDP .r .col2 .p2 #btnMark').attr("imageid", oimg.attr('imageid')).attr("talkbackid", oimg.attr('talkbackid'));
        //回复模块
        initTalkBack(oimg.attr('talkbackid'), oimg.attr('imageid'));
        unitLoadPicTxt(oalt);
        return false;
    });
}

//图片滑动
function tinycarouselSlide(i) {
    if ($('#slider-code').get(0) != null) {
        $('#slider-code').tinycarousel({
            axis: 'x',
            callback: function (element, index) {
                //$('#slider-code .overview li').eq(index).find('a').eq(0).click();
            }
        });
    }
}



function dropMoreShare() {
    $('.sharelist .li3').mouseenter(function () {
        var o = $(this);
        o.find('div').show();
        o.find('div').find('img').css({ "margin-top": "0" });
    }).mouseleave(function () {
        var o = $(this);
        o.find('div').hide();
    });
}

function picMark() {

    $('#piclist li').mouseenter(function () {
        var o = $(this);
        o.find('div.picext').show();
    }).mouseleave(function () {
        var o = $(this);
        o.find('div.picext').hide();
    });

    $('.piclist .mark label').bind("click", function () {
        var o = $(this);
        if (o.next('div.dropMark').css("display") == 'block') {
            o.next('div.dropMark').hide();
        }
        else {
            o.next('div.dropMark').show();

        }
        return false;
    });
    $(document).click(function (e) {
        var t = $(e.target);
        var v1 = "ul.piclist .mark,ul.piclist .mark *";
        if (!t.is(v1)) {
            $("div.dropMark").hide();
        }
    });
}

function showMoreShare() {
    $('div.share').mouseenter(function () {
        var o = $(this);
        o.find('.imgMore').hide();
        o.next('div.ding').hide();
        o.find('.c .shareWrap').find('span').show();
    }).mouseleave(function () {
        var o = $(this);
        o.find('.imgMore').show();
        o.next('div.ding').show();
        o.find('.c .shareWrap').find('span').hide();
    });
}

function picShare(key, title, content, url, pic) {
    if (key == 'wb') {
        //新浪微博
        var u = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(content.wb) + "&pic=" + encodeURIComponent(pic) + "&url=" + encodeURIComponent(url);
        return "window.open('" + u + "', '_blank', 'scrollbars=no,width=600,height=480,left=75,top=20,status=no,resizable=yes');";
    } else if (key == 'qz') {
        //QQ空间
        var u = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(content.qz) + "&desc=" + encodeURIComponent(content.qz) + "&site=悠哉旅行网&url=" + encodeURIComponent(url);
        return "window.open('" + u + "', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');";
    } else if (key == 'qt') {
        //腾讯微博
        var u = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + encodeURIComponent(url) + "&pic=" + encodeURIComponent(pic) + "&title=" + encodeURIComponent(content.qt);
        return "window.open('" + u + "', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";
    } else if (key == 'rr') {
        //人人网
        var u = "http://widget.renren.com/dialog/share?url=" + encodeURIComponent(url) + "&resourceUrl=" + encodeURIComponent(url) + "&images=" + encodeURIComponent(pic) + "&title=" + encodeURIComponent(title) + "&description=" + encodeURIComponent(content.rr) + "&charset=UTF-8";
        return "window.open('" + u + "', '_blank', 'scrollbars=no,width=700,height=650,left=75,top=20,status=no,resizable=yes');";
    }
}

function writeShareFav(flag) {
    var sharefav = readCookie("uzaisharefav");
    createCookie2("uzaisharefav", flag, 7);
}
/*****初始化分享****/
function initShare() {


    var o = $('#fix-nav-hf');
    if (o.get(0) != null) {
        floatHF(o);
    }

    var sharefav = readCookie("uzaisharefav");
    var olist = $('.shareWrap');
    var sharelist = $('.sharelist');
    if (sharefav == "qz") {
        var s1 = "<a title='分享到QQ空间' rel='nofollow' href=\"javascript:eval(picShare('qz',share_title,share_content,share_url,share_pic));writeShareFav('qz');void(0);\" class='btn-s qz'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp28.png'  alt='QQ空间'/><i>QQ空间</i></a>";
        var s2 = "<a title='分享到新浪微博' rel='nofollow' href=\"javascript:eval(picShare('wb',share_title,share_content,share_url,share_pic));writeShareFav('wb');void(0);\" class='btn-s wb'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp23.png' alt='新浪微博' /><i>新浪微博</i></a>";
        var s3 = "<a title='分享到腾讯微博' rel='nofollow' href=\"javascript:eval(picShare('qt',share_title,share_content,share_url,share_pic));writeShareFav('qt');void(0);\" class='btn-s tq'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp29.png' alt='腾讯微博'/><i>腾讯微博</i></a>";
        var s4 = "<a title='分享到人人网' rel='nofollow' href=\"javascript:eval(picShare('rr',share_title,share_content,share_url,share_pic));writeShareFav('rr');void(0);\" class='btn-s rr'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp30.png' alt='人人网' /><i>人人网</i></a>";
        olist.each(function (k, v) {
            var oo = $(this);
            oo.html(s1 + "<span>" + s2 + s3 + s4 + "</span>");
        });
        sharelist.html("<ul><li class='li1'>" + s1.replace('dp28.png', 'dp20.png') + "</li><li class='li2'>" + s2.replace('dp23.png', 'dp18.png') + "</li><li class='li3'><img class='img1 png' src='http://r.uzaicdn.com/Content/picdianpin/dp21.png'><div style='display: none;'><span class='png s1'></span><p>" + s3.replace('dp29.png', 'dp4.png') + s4.replace('dp30.png', 'dp5.png') + "</p><span class='png s2'></span></div></li></ul>");
    }
    else if (sharefav == "qt") {
        var s1 = "<a title='分享到腾讯微博' rel='nofollow' href=\"javascript:eval(picShare('qt',share_title,share_content,share_url,share_pic));writeShareFav('qt');void(0);\" class='btn-s tq'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp29.png' alt='腾讯微博'/><i>腾讯微博</i></a>";
        var s2 = "<a title='分享到新浪微博' rel='nofollow' href=\"javascript:eval(picShare('wb',share_title,share_content,share_url,share_pic));writeShareFav('wb');void(0);\" class='btn-s wb'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp23.png' alt='新浪微博' /><i>新浪微博</i></a>";
        var s3 = "<a title='分享到QQ空间' rel='nofollow' href=\"javascript:eval(picShare('qz',share_title,share_content,share_url,share_pic));writeShareFav('qz');void(0);\" class='btn-s qz'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp28.png'  alt='QQ空间'/><i>QQ空间</i></a>";
        var s4 = "<a title='分享到人人网' rel='nofollow' href=\"javascript:eval(picShare('rr',share_title,share_content,share_url,share_pic));writeShareFav('rr');void(0);\" class='btn-s rr'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp30.png' alt='人人网' /><i>人人网</i></a>";
        olist.each(function (k, v) {
            var oo = $(this);
            oo.html(s1 + "<span>" + s2 + s3 + s4 + "</span>");
        });
        sharelist.html("<ul><li class='li1'>" + s1.replace('dp29.png', 'dp4.png') + "</li><li class='li2'>" + s2.replace('dp23.png', 'dp18.png') + "</li><li class='li3'><img class='img1 png' src='http://r.uzaicdn.com/Content/picdianpin/dp21.png'><div style='display: none;'><span class='png s1'></span><p>" + s3.replace('dp28.png', 'dp20.png') + s4.replace('dp30.png', 'dp5.png') + "</p><span class='png s2'></span></div></li></ul>");
    }
    else if (sharefav == "rr") {
        var s1 = "<a title='分享到人人网' rel='nofollow' href=\"javascript:eval(picShare('rr',share_title,share_content,share_url,share_pic));writeShareFav('rr');void(0);\" class='btn-s rr'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp30.png' alt='人人网' /><i>人人网</i></a>";
        var s2 = "<a title='分享到新浪微博' rel='nofollow' href=\"javascript:eval(picShare('wb',share_title,share_content,share_url,share_pic));writeShareFav('wb');void(0);\" class='btn-s wb'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp23.png' alt='新浪微博' /><i>新浪微博</i></a>";
        var s3 = "<a title='分享到QQ空间' rel='nofollow' href=\"javascript:eval(picShare('qz',share_title,share_content,share_url,share_pic));writeShareFav('qz');void(0);\" class='btn-s qz'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp28.png'  alt='QQ空间'/><i>QQ空间</i></a>";
        var s4 = "<a title='分享到腾讯微博' rel='nofollow' href=\"javascript:eval(picShare('qt',share_title,share_content,share_url,share_pic));writeShareFav('qt');void(0);\" class='btn-s tq'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp29.png' alt='腾讯微博'/><i>腾讯微博</i></a>";
        olist.each(function (k, v) {
            var oo = $(this);
            oo.html(s1 + "<span>" + s2 + s3 + s4 + "</span>");
        });
        sharelist.html("<ul><li class='li1'>" + s1.replace('dp30.png', 'dp5.png') + "</li><li class='li2'>" + s2.replace('dp23.png', 'dp18.png') + "</li><li class='li3'><img class='img1 png' src='http://r.uzaicdn.com/Content/picdianpin/dp21.png'><div style='display: none;'><span class='png s1'></span><p>" + s3.replace('dp28.png', 'dp20.png') + s4.replace('dp29.png', 'dp4.png') + "</p><span class='png s2'></span></div></li></ul>");
    }
    else {
        var s1 = "<a title='分享到新浪微博' rel='nofollow' href=\"javascript:eval(picShare('wb',share_title,share_content,share_url,share_pic));writeShareFav('wb');void(0);\" class='btn-s wb'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp23.png' alt='新浪微博' /><i>新浪微博</i></a>";
        var s2 = "<a title='分享到QQ空间' rel='nofollow' href=\"javascript:eval(picShare('qz',share_title,share_content,share_url,share_pic));writeShareFav('qz');void(0);\" class='btn-s qz'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp28.png'  alt='QQ空间'/><i>QQ空间</i></a>";
        var s3 = "<a title='分享到腾讯微博' rel='nofollow' href=\"javascript:eval(picShare('qt',share_title,share_content,share_url,share_pic));writeShareFav('qt');void(0);\" class='btn-s tq'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp29.png' alt='腾讯微博'/><i>腾讯微博</i></a>";
        var s4 = "<a title='分享到人人网' rel='nofollow' href=\"javascript:eval(picShare('rr',share_title,share_content,share_url,share_pic));writeShareFav('rr');void(0);\" class='btn-s rr'><img class='png img1' src='http://r.uzaicdn.com/Content/picdianpin/dp30.png' alt='人人网' /><i>人人网</i></a>";
        olist.each(function (k, v) {
            var oo = $(this);
            oo.html(s1 + "<span>" + s2 + s3 + s4 + "</span>");
        });
        sharelist.html("<ul><li class='li1'>" + s1.replace('dp23.png', 'dp18.png') + "</li><li class='li2'>" + s2.replace('dp28.png', 'dp20.png') + "</li><li class='li3'><img class='img1 png' src='http://r.uzaicdn.com/Content/picdianpin/dp21.png'><div style='display: none;'><span class='png s1'></span><p>" + s3.replace('dp29.png', 'dp4.png') + s4.replace('dp30.png', 'dp5.png') + "</p><span class='png s2'></span></div></li></ul>");
    }
}

function createCookie2(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + ";path=/";
}

function scrollToMark() {
    $('#scrolltomark').click(function () {
        var o = $(this);
        var ot = $('#scrolltomarkMeta');
        var top = ot.offset().top;
        $('body,html').animate({ scrollTop: top }, 0);
        return false;
    });
}
/***点击顶***/
function dingAdd() {
    $('.comment-imglist a label,#ding label,.ding-ext label').live("click", function () {
        var flag = false;
        var o = $(this);
        var os=o.find('s');
        //var otxt = o.text();
		var otxt = o.text() == "" ? "0" : o.text();
        var oppL = o.offset().left;
        var oppT = o.offset().top;
        var imageId = 0;
        var flag_i = 0;
        //列表顶
        var currentPic = o.parent('a.aitem').find('img').eq(0).attr('src');
        imageId = o.parent('a.aitem').attr("aImageid");
        flag_i = 1;
        if (currentPic == "" || currentPic == null || currentPic == undefined) {
            //回访详细页面顶
            currentPic = o.parents('.r').prev('div.l').find('.initImg').attr("src");
            imageId = o.find("b").attr("id");
            flag_i = 2;
            oppL = oppL + 10;
            if (currentPic == "" || currentPic == null || currentPic == undefined) {
                //回访详细列表页面顶
                currentPic = o.parents('li').find('p.p1').find('img').attr("src");
                imageId = o.find("b").attr("id");
                flag_i = 3;
                oppL = oppL - 10;
            }
        }
        //读取cookie
        flag = checkDingStatus(imageId);
        if (!flag) {
            /**修改数据顶数**/
            $.ajax({
                type: "POST",
                url: "/ashx/ashx0016.ashx?type=6&imageId=" + imageId + "&rand=" + Math.random(),
                success: function (msg) {
                    if ($.trim(msg) != "") {
                        /**设置样式等等**/
                        $('#dingtip').remove();
                        $('body').append("<a id='dingtip' class='dingtip' >+1</a>");
                        $('#dingtip').css({ "left": oppL, "top": oppT - 24 }).fadeIn(300).animate({
                            top: oppT - 50,
                            opacity: '0'
                        }, { duration: 500 });
                        /***设置所有的顶都+1*******/
                        //本身变动
                        o.find('b').text(parseInt(otxt) + 1);
                        if (flag_i == 1) {
                            //总顶数
                            var dingsum = o.parents(".comment-imglist").prev("p.comment-tip").find("span.s1").find("i").eq(1);
                            if (dingsum.length > 0) {
                                dingsum.text(parseInt(dingsum.text()) + 1);
                            }
                        }
                        if (flag_i == 2) {
                            //小图列表顶数增加
                            $("#slider-code ul.overview li a img[imageid='" + imageId + "']").attr("topnum", (parseInt(otxt) + 1));
                            //回访列表的图片列表顶数增加
                            var dingsuma = $(".comment-imglistInner a[aimageid='" + imageId + "'] label b");
                            if (dingsuma.length > 0) {
                                dingsuma.text((parseInt(otxt) + 1))
                            }
                            //总顶数
                            var dingsum = $("a[aimageid='" + imageId + "']").parents(".comment-imglist").prev("p.comment-tip").find("span.s1").find("i").eq(1);
                            if (dingsum.length > 0) {
                                dingsum.text(parseInt(dingsum.text()) + 1);
                            }
                            /**如果回访详细页面中的图片详细点击**/
                            //总顶数
                            if ($("#J_count").length > 0) {
                                $("#J_count").text(parseInt($("#J_count").text()) + 1);
                            }
                            //列表页相应顶数增加1
                            var dingsumli = $("li[liimageid='" + imageId + "']").find("div.ding").find("b");
                            if (dingsumli.length > 0) {
                                dingsumli.text(parseInt(otxt) + 1);
                            }
                            /**如果回访详细页面中的图片详细点击End**/
                        }
                        if (flag_i == 3) {
                            //总顶数
                            $("#J_count").text(parseInt($("#J_count").text()) + 1);
                        }
                        /***设置所有的顶都+1 End*******/
                        o.addClass('on');
                        //写入cookie
                        writeDingPic(imageId);
                    }
                    else {
                        alert('顶失败！');
                    }
                }
            });
        }
        else {
            $('#dingtip').remove();
            $('body').append("<a id='dingtip' class='dingtip dingtip-ext'  >已赞</a>");
            $('#dingtip').css({ "left": oppL - 3, "top": oppT - 24 }).fadeIn(300).animate({
                top: oppT - 40,
                opacity: '0'
            }, { duration: 500 });
            o.addClass('on');
        }
        os.css({"margin-top":"0"});
        return false;
    });
}

function writeDingPic(picurl) {
    var dingpic = readCookie("uzaidingpic");
    if (dingpic == null || dingpic == "") {
        createCookie2("uzaidingpic", picurl, 1);
    }
    else {
        var ck = readCookie("uzaidingpic");
        createCookie2("uzaidingpic", ck + "|" + picurl, 1);
    }
}

function checkDingStatus(pic) {
    var flag = false;
    var ck = readCookie("uzaidingpic");
    if (ck == null || ck == "" || ck == undefined) {
    }
    else {
        var ckList = ck.split('|');
        for (var i = 0; i < ckList.length; i++) {
            if (pic == ckList[i]) {
                flag = true;
                break;
            }
        }
    }
    return flag;
}

var _lm = {
    divName: "leaveMsgWrap", //外层容器的class
    textareaName: "chackTextarea", //textarea的class
    numName: "limitNum", //数字的class
    num: 500, //数字的最大数目
    checkChinese: true //检查中文
}

var textareaLimit = function () {
    //定义变量

    if ($('#popDP').get(0) != null) {
        _lm.num = 150;
    }

    var $onthis; //指向当前
    var $divname = _lm.divName; //外层容器的class
    var $textareaName = _lm.textareaName; //textarea的class
    var $numName = _lm.numName; //数字的class
    var $num = _lm.num; //数字的最大数目
    var $ckChinese = _lm.checkChinese;

    function isChinese(str) {  //判断是不是中文
        var reCh = /[u00-uff]/;
        return !reCh.test(str);
    }
    function numChange() {
        var strlen = 0; //初始定义长度为0
        var txtval = $.trim($onthis.val());
        if (txtval != '') {
            for (var i = 0; i < txtval.length; i++) {
                if (isChinese(txtval.charAt(i)) == true) {
                    if ($ckChinese)
                        strlen = strlen + 2; //中文为2个字符
                    else
                        strlen = strlen + 1;
                } else {
                    strlen = strlen + 1; //英文一个字符
                }
            }
            strlen = Math.ceil(strlen / 2); //中英文相加除2取整数
            if ($num - strlen < 0) {
                $par.html("<b style='color:red;' class=" + $numName + ">" + Math.abs($num - strlen) + "</b>" + "/" + $num); //超出的样式
            }
            else {
                $par.html("<b class=" + $numName + ">" + (strlen) + "</b>" + "/" + $num); //正常时候
            }
            $b.html($num - strlen);
        }
    }
    $("." + $textareaName).live("focus", function () {
        $b = $(this).parents("." + $divname).find("." + $numName); //获取当前的数字
        $par = $b.parent();
        $onthis = $(this); //获取当前的textarea
        var setNum = setInterval(numChange, 500);
    });
}
///加载小图列表
function loadPopImg(o, i, talkBackId) {
    var ot = $('#slider-code ul.overview')
    var sb = "";
    var imgSize = ot.find('img').size();
    var sbtemp = "";
    var olist = o.find('img.imgTarget');
    var flag_i = 0;
    if (olist.get(0) == null) {
        olist = o.find('img');
        flag_i = 1;
    }
    olist.each(function (k, v) {
        var oo = $(this);
        //图片Id
        var imageid = 0;
        //顶数
        var topnum = 0;
        if (flag_i == 1) {
            imageid = oo.parent("a").attr("aImageid");
            topnum = oo.parent("a").find("label").find("b").text();
        }
        else {
            imageid = oo.parents("li").attr("liimageid");
            topnum = $.trim(oo.parents("p.p1").prev("div.ding").find("b").text());
        }
        sbtemp += "<a href='#'><img data-img='" + oo.attr('data-img') + "' alt='" + oo.attr('alt') + "' src='" + oo.attr('src') + "'  imageid='" + imageid + "' talkbackid='" + talkBackId + "' topnum='" + topnum + "' /></a>";
        if (k == 4) {
            sb += ("<li>" + sbtemp + "</li>");
            sbtemp = "";
        }
        else if (k == 9) {
            sb += ("<li>" + sbtemp + "</li>");
            sbtemp = "";
        }
    });

    if (sbtemp != "") {
        sb += "<li>" + sbtemp + "</li>";
    }

    ot.html(sb.replace("<li></li>", ""));
    //初始化tinycarouselSlide
    tinycarouselSlide(i);
    //两个事件
    popSlide();
    //初始化图片旋转
    popPicRotate();
}

//转入图片的相关文字信息
function loadAjaxPicInfo(txt, picsize, i, imagesId, talkBackId, topNum) {
    //顶赋值、ID
    $('#popDP .r .col1 .ding label b').attr("id", imagesId).text(topNum);
    //提交回复按钮赋值
    $('#popDP .r .col2 .p2 #btnMark').attr("imageid", imagesId).attr("talkbackid", talkBackId);
    //图片文字及图片索引
    var ot = $('#popDP .r .col2 .p1');
    ot.find('label').html(txt);
    ot.find('b').text(i + 1);
    ot.find('s').text(picsize);
    //回复模块
    initTalkBack(talkBackId, imagesId);
    //是否登录
    var userId = GetCookie("user", "userid")
    if (userId != null && userId != "") {
        $('#popDP .r .col2 .p2 .s4').hide();
    } else {
        $('#popDP .r .col2 .p2 .s4').show();
    }
}

function initPop() {
    $('#popDP').jqm({ onShow: function (hash) {
        var o = hash.o;
        var st1 = document.documentElement.scrollTop;
        var st2 = document.body.scrollTop;

        var temp = "";
        if (st1 != 0)
        {
            temp = document.documentElement.scrollTop;
        }

        var top = (document.documentElement.clientHeight + (document.documentElement.scrollTop * 2) ) / 2 - hash.w.height() / 2;
        hash.w.css({ "top": top }).show();
        o.show();
    }
    });
}

function activePop() {
    $('.comment-imglistInner a img,.comment-imglistInner a span,.comment-tip .s1 a').live("click", function () {

        $('#dp-focus-img').empty();

        var o = $(this);
        var i = 0;
        if (o.attr('src')) {
            i = o.parents('.comment-imglistInner').find('img').index(o);
        }
        var op = o.parents('div.comment-imglistInner');
        if (op.get(0) == null) {
            op = o.parents('p.comment-tip').next('div.comment-imglist').find('div.comment-imglistInner');
        }
        var otarget = o.parent('a.aitem');
        if (otarget.get(0) == null) {
            otarget = op.find('a.aitem').eq(0);
        }
        //图片总数量
        var picsize = o.parents('.comment-imglistInner').find('img').size();
        if (picsize == 0) {
            picsize = o.parents('p.comment-tip').next('div.comment-imglist').find('div.comment-imglistInner').find('img').size();
        }
        //图片ID
        var imagesId = otarget.attr("aImageid");
        //回访ID
        var talkBackId = op.parents("div.comment-imglist").attr("talkbackid");
        //总顶数
        var topNum = otarget.find("label b").text();
        loadPopImg(op, i, talkBackId);
        loadAjaxPicInfo(otarget.find('img').attr('alt'), picsize, i, imagesId, talkBackId, topNum);
        //调整分享的内容
        var sharecc = $("div[talkbackid='" + talkBackId + "']").prev().prev("p.fn-zhe").find("a");
        share_content.wb = share_content.wb.replace('{picdianpin}', (sharecc.text().length > 30 ? sharecc.text().substr(0, 30) : sharecc.text()));
        share_content.qz = share_content.qz.replace('{picdianpin}', (sharecc.text().length > 30 ? sharecc.text().substr(0, 30) : sharecc.text()));
        share_content.qt = share_content.qt.replace('{picdianpin}', (sharecc.text().length > 30 ? sharecc.text().substr(0, 30) : sharecc.text()));
        share_content.rr = share_content.rr.replace('{picdianpin}', (sharecc.text().length > 30 ? sharecc.text().substr(0, 30) : sharecc.text()));
        share_url = sharecc.attr("href");
        var sharepic = "";
        $("div[talkbackid='" + talkBackId + "']").find(".comment-imglistInner").find(".aitem").each(function () {
            sharepic += $(this).find("img").attr("src") + "|";
        });
        if (sharepic != "") {
            share_pic = sharepic.substr(0, sharepic.length - 1);
        }
        //弹出窗体
        $('#popDP').jqmShow();
        var ot = $('#slider-code ul.overview').find('a').eq(i);
        var oli = ot.parent('li');
        var oliIndex = oli.parent('ul.overview').find('li').index(oli);
        $('#slider-code').tinycarousel_move(oliIndex + 1);
        ot.click(); //选中弹窗当前项图片
        return false;
    });
}

//改变当前项
function changeCurrentPic(i) {
    var ot = $('#popDP .r .col2 .p1');
    ot.find('b').text(i + 1);
}
/****点击发布回复****/
function markAdd() {
    $('#btnMark').click(function () {
        var content = $('#txtTalkBackText').val();
        if ($.trim(content) == "") {
            alert("回复内容为必填！");
            return;
        }
        var userId = GetCookie("user", "userid");
        if (userId == null || userId == "") {
            $(this).attr("flag", "1");
            editWidget2("http://u.uzai.com/QuickLogin?actionName=showTalkBack", 250, 640);
            return;
        }
        var talkBackId = $(this).attr("talkbackid");
        var imageId = $(this).attr("imageid");
        addTalkBack(talkBackId, imageId, userId, encodeURIComponent(content), 1);
        //重新加载
        //initTalkBack(talkBackId, imageId);
        $('#txtTalkBackText').val("");
    });
}
/***添加回复记录***/
function addTalkBack(talkBackId, imageId, userId, content, flag) {
    $.ajax({
        type: "POST",
        url: "/ashx/ashx0016.ashx?type=5&talkBackId=" + talkBackId + "&imageId=" + imageId + "&userId=" + userId + "&content=" + content + "&rand=" + Math.random(),
        success: function (msg) {
            if ($.trim(msg) != "") {
                if (flag == 1) {
                    //展示
                    var eimg = "http://r.uzaicdn.com/content/UserCenter/Images/UserIndex/33.jpg";
                    var replyHtml = "<li class='fn-clear' style='display:none;'><span>"
                    + "<img onerror=this.src='" + eimg + "' src='" + (GetCookie("user", "headUrl") == eimg ? "" : "http://r.uzaicdn.com/picPhone.aspx?file=" + GetCookie("user", "headUrl") + "&h=100&w=100&t=1") + "' width='30' height='30'/></span>"
                    + "<p><a href='javascript:void(0)' class='blue'>" + GetCookie("user", "userName") + "</a>：" + decodeURI(content) + "<br />刚刚</p>"
                    + "</li>";
                    var sourceLis = $("#popDP .r .col3 #ulMarkList");
                    sourceLis.prepend(replyHtml);
                    sourceLis.find("li:first").fadeIn('slow');
                    //总回复数
                    $('#popDP .r .col2 .s3 label').text(parseInt($('#popDP .r .col2 .s3 label').text()) + 1);
                }
				 else  if (flag == 0) {
                    //展示
                    var eimg = "http://r.uzaicdn.com/content/UserCenter/Images/UserIndex/33.jpg";
                    var replyHtml = "<div class='hfContent subhfContent fn-clear'>"
                        + "<div class='userInfo fl'>"
                        + "<p class='p1'>"
                        + "<img width='40px' height='40px' onerror='" + eimg + "' src='" + (GetCookie("user", "headUrl") == eimg ? "" : "http://r.uzaicdn.com/picPhone.aspx?file=" + GetCookie("user", "headUrl") + "&h=100&w=100&t=1") + "' ></p>"
                        + "<p class='p2 f12'>" + GetCookie("user", "userName") + "</p>"
                        + "<p class='p3'><img src='http://r.uzaicdn.com/Content/1/images/icon_vip31.gif'></p></div>"
                        + "<div class='userContent fl subuserContent'>"
                        + "<div class='arrow'></div>"
                        + "<div class='t'></div>"
                        + "<div class='c'><p class='plou'>底楼</p>"
                        + "<p class='pcontent'>" + decodeURI(content) + "</p>"
                        + "<p class='ptime'>回复时间：刚刚</p></div>"
                        + "<div class='b'></div></div></div>";
                   $(replyHtml).insertBefore(".shownum-page")
                }
                return true;
            }
            else {
                alert('回复失败！');
                return false;
            }
        }
    });
}
/*****回访详细中的上传图片列表点击事件****/
function activePopCopy() {
    $('#piclist li .p1 img').live("click", function () {
        var o = $(this);
        var i = 0;
        i = o.parents('#piclist').find('p.p1').find('img').index(o);
        var op = o.parents('#piclist');
        //回访Id
        var talkBackId = $("#txtHiddenTalkBackId").val();
        loadPopImg(op, i, talkBackId);
        var picsize = op.find('img.imgTarget').size();
        //图片ID
        var imagesId = o.parents("li").attr("liimageid");
        //总顶数
        var topNum = o.parents("p.p1").prev("div.ding").find("b").text();
        loadAjaxPicInfo(o.attr('alt'), picsize, i, imagesId, talkBackId, $.trim(topNum));
        $('#popDP').jqmShow();
        var ot = $('#slider-code ul.overview').find('a').eq(i);
        var oli = ot.parent('li');
        var oliIndex = oli.parent('ul.overview').find('li').index(oli);
        $('#slider-code').tinycarousel_move(oliIndex + 1);
        ot.click(); //选中弹窗当前项图片
        return false;
    });
}

// 图片旋转
function popPicRotate() {
    if ($('#arotate').get(0) != null) {
        var o = $('#dp-focus-img');
        var op = $('#arotate');
        var container = o.get(0);
        var src = o.find('img').attr('src');
        var left = op.find("a.aL")[0];
        var right = op.find("a.aR")[0];

        var uzRotate = function (con, sr, l, r) {
            options = {
                onPreLoad: function () { },
                onLoad: function () { con.style.backgroundImage = ""; },
                onError: function (err) { con.style.backgroundImage = ""; alert(err); }
            };

            var iE6 = window.ActiveXObject && !window.XMLHttpRequest;
            if (iE6) {
                o.find('.initImg').hide().show();
            }
            else {
                var it = new ImageTrans(con, options);
                it.load(sr);
                l.onclick = function () { o.find('.initImg').hide(); it.left(); return false; }
                r.onclick = function () { o.find('.initImg').hide(); it.right(); return false; }
            }
        };

        uzRotate(container, src, left, right);

    }
}


function unitLoadPicTxt(txt) {
    if (txt == null || txt == "") {
        $('#dp-focus-txt').hide();
    }
    else {
        $('#dp-focus-txt').show();
    }

    $('#dp-focus-txt').html(txt);
}


function floatHF(element) {
    var top = element.position().top, pos = element.css("position");
    $(window).scroll(function () {
        var scrolls = $(this).scrollTop();
        if (scrolls > top) {
            if (window.XMLHttpRequest) {
                element.css({
                    position: "fixed",
                    top: 0,
                    "border-bottom": "1px solid #ccc"
                });

            } else {
                element.css({
                    top: scrolls,
                    "border-bottom":"1px solid #ccc"
                });
            }
            element.find('h1').hide();
            element.find('div.fix-new-login').show();
        } else {
            element.css({
                position: pos,
                top: top,
                border: "0"
            });
            element.find('h1').show();
            element.find('div.fix-new-login').hide();
        }
    });
}


function IE6Fix() {
    var iE6 = window.ActiveXObject && !window.XMLHttpRequest;
    if (iE6) {
        $('div.fix-new-fav').mouseenter(function () {
            var o = $(this);
            o.find('div.droplist').show();
        }).mouseleave(function () {
            var o = $(this);
            o.find('div.droplist').hide();
        });
    }
}