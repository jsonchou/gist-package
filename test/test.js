//迟美欢 2012-04-25
//scrolling=  auto / no
function editWidget_contract(targeturl, scrolling) {
    window.scrollTo(0, 0);
    var width = document.documentElement.clientWidth + document.documentElement.scrollLeft;
    var height = document.documentElement.clientHeight + document.documentElement.scrollTop;
    var layer = document.createElement('div');
    layer.style.zIndex = 2;
    layer.id = 'layer_contract';
    layer.style.position = 'absolute';
    layer.style.top = '0px';
    layer.style.left = '0px';
    layer.style.height = document.documentElement.scrollHeight + 'px';
    layer.style.width = width + 'px';
    layer.style.backgroundColor = 'black';
    layer.style.opacity = '.3';
    layer.style.filter += ("progid:DXImageTransform.Microsoft.Alpha(opacity=30)");
    document.body.style.position = 'static';
    document.body.appendChild(layer);

    var size = { 'height': 540, 'width': 890 };
    var iframe = document.createElement('iframe');
    iframe.name = 'Widget Editor';
    iframe.id = 'WidgetEditor_contract';
    iframe.scrolling = scrolling != undefined ? scrolling : "no";
    iframe.src = targeturl;
    iframe.style.height = size.height + 'px';
    iframe.style.width = size.width + 'px';
    iframe.style.position = 'absolute';
    iframe.style.zIndex = 4;
    iframe.style.border = "2px";
    iframe.frameBorder = "0px";
    iframe.marginwidth = "0";
    iframe.marginheight = "0";
    iframe.style.top = ((height + document.documentElement.scrollTop) / 2) - (size.height / 2) + 10 + 'px';
    iframe.style.left = (width / 2) - (size.width / 2) + 'px';
    document.body.appendChild(iframe);
}
