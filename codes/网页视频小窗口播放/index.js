/**
 * 网页视频小窗口播放
 */
/**title:网页视频小窗口播放**/ // <--- 此行必需，不得缺失

/**
 * 不支持：
 * https://www.9do9.com/
 * https://www.leyingke.com/
 * https://www.yongxiaoran.com/
 * http://baecc.org/
 * https://www.douyin.com/
 * https://www.kuaishou.com/
 * https://www.bilibili.com/
 * https://v.qq.com/ (自带画中画)
 * https://youku.com/ (自带画中画)
 * https://tv.sohu.com/ (自带画中画)
 * https://tudou.com/ (自带画中画)
 * http://bf.fun.tv (不带画中画)
 * http://video.sina.com.cn/  (不带画中画)
 * http://www.le.com/ (Blocked a frame with origin "xxx" from accessing a cross-origin frame.)
 * http://www.funshion.com/ (Blocked a frame with origin "xxx" from accessing a cross-origin frame.) 
 * 直播： 
 * https://www.yy.com/
 * http://star.longzhu.com/
 * https://www.huya.com/ (Blocked a frame with origin "xxx" from accessing a cross-origin frame.)
 * https://www.douyu.com/
 * http://www.kumi.cn/ (Blocked a frame with origin "xxx" from accessing a cross-origin frame.)
 * 
 * 支持：
 * http://www.sczhsj.com/
 * https://www.918sjw.com/
 * http://www.sxctdlkj.com/
 * https://www.nmgk.com/
 * http://www.hblonghe.com/
 * https://krcom.cn/
 * https://www.ixigua.com/
 * https://ent.sina.com.cn/
 * http://mtime.com/
 * https://www.xinpianchang.com/
 * https://weibo.com/
 * http://v.iqilu.com/
 * http://www.zjstv.com/
 * https://www.gdtv.cn/
 * https://www.btime.com/
 * http://v.jstv.com/
 * http://www.ahtv.cn/
 * http://www.sctv.com/
 * https://www.1905.com/
 * https://v.163.com/
 * https://www.wasu.cn/
 * https://www.yinyuetai.com/
 * https://www.mgtv.com/
 * https://v.cctv.com/
 * https://www.ku6.com/
 * https://v.ifeng.com/
 * https://www.iqiyi.com/
 * http://v.pptv.com/
 * https://haokan.baidu.com/
 * https://www.56.com/
 * https://qf.56.com/
 * https://www.boosj.com/
 * https://videoshub.com/
 * https://www.mtv.com/
 * 直播：
 * https://v.6.cn/
 * https://live.qq.com/
 * https://fanxing.kugou.com/
 * https://qf.56.com/
 * https://www.yizhibo.com/
 */

// TODO 
// iframe 内视频
// video或其父布局本身就有鼠标移入事件

/** tools */
var getElement = function (eleId) {
    return document.querySelector(eleId);
}
var getElementAll = function (eleId) {
    return document.querySelectorAll(eleId);
}
var displayNoneElements = function (eles) {
    if (eles && eles.length > 0) {
        eles.forEach(item => item.style.display = 'none');
    }
}

String.prototype.startWith = function (endStr) {
    var d = this.length - endStr.length;
    return (endStr.length > 0 && d >= 0 && this.indexOf(endStr) == 0)
}

String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}

//[绑定监听事件]
function addMethod(node, type, method) {
    if (node.addEventListener) { // IE9以下不兼容
        node.addEventListener(type, method, false)
    } else if (node.attachEvent) { // IE独有
        node.attachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method; // 一个元素只能绑定一个处理程序
    }
}

//[移除监听事件]
function removeMethod(node, type, method) {
    if (node.removeEventListener) { // IE9以下不兼容
        node.removeEventListener(type, method, false)
    } else if (node.detachEvent) { // IE独有
        node.detachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method;
    }
}

/** main */

function openSmallWindow(video) {
    if (
        document.pictureInPictureEnabled &&
        !video.disablePictureInPicture
    ) {
        // Yay, we can use the feature!
        if (!document.pictureInPictureElement) {
            video.requestPictureInPicture();
        }
    } else {
        alert('抱歉，当前不支持画中画！');
    }
}

// 添加小窗口按钮
var styleId = 'NewVideoWindow_a_style';
var aId = 'NewVideoWindow_a';

function createStyle(doc, video) {
    // 创建 style    
    if (!getElement(`#${styleId}`)) {
        var styleEle = document.createElement('style');
        styleEle.id = styleId;
        styleEle.innerText =
            ".NewVideoWindow_a { position:absolute;top:7px;left:7px;width:100px;height:30px;line-height:30px;text-align:center;background-color:#24aee6;cursor: pointer;font-size:14px;border-radius:5px;text-decoration:none !important;z-index:999999;color:#fff;}";
        doc.head.appendChild(styleEle);
    }

    var aLink = getElement(`#${aId}`);
    if (aLink) {
        aLink.parentNode.removeChild(aLink);
    }
    // 创建 a 标签
    var NewVideoWindow_a = doc.createElement('a');
    NewVideoWindow_a.id = aId;
    NewVideoWindow_a.setAttribute('class', 'NewVideoWindow_a');

    NewVideoWindow_a.innerText = '小窗口播放';
    NewVideoWindow_a.href = 'javascript:void(0);';
    NewVideoWindow_a.onclick = function (event) {
        openSmallWindow(video);
    };

    return NewVideoWindow_a;
}

function removeALink(doc) {
    var aLink = doc.querySelector(`#${aId}`);
    if (aLink) {
        aLink.parentNode.removeChild(aLink);
    }
}

var addBtn = function (doc, event) {
    // console.log('mouseover', event.path[0])
    var video = event.path[0];
    video.parentNode.appendChild(createStyle(doc, video));
    event.stopPropagation();
}
var removeBtn = function (doc, event) {
    // 延迟消失
    // console.log('mouseout', event.path[0])

    setTimeout(function () {
        return removeALink(doc);
    }, 3000);
    event.stopPropagation();
}

function keyUp(e, doc) {
    var currKey = 0,
        e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    var keyName = String.fromCharCode(currKey);

    // console.log('按键码: ', currKey, '字符: ', keyName);

    if (currKey == 86 && keyName == "V") {
        addBtn(doc, e);
    }
}

var videos = getElementAll('video');
if (videos && videos.length > 0) {
    videos.forEach(video => {
        addMethod(video, 'mouseover', function (event) {
            // console.log('mouseover');
            addBtn(document, event);
        });
        addMethod(video, 'mouseout', function (event) {
            removeBtn(document, event);
        });

        document.onkeyup = function (e) {
            keyUp(e, document);
        };
    });
}

// ??? Fix
var iframes = getElementAll('iframe');
if (iframes && iframes.length > 0) {
    iframes.forEach(iframe => {
        var videos = iframe.contentWindow.document.querySelectorAll('video');
        // console.log(videos);
        videos.forEach(video => {
            addMethod(video, 'mouseover', function (event) {
                addBtn(iframe.contentWindow.document, event);
            });
            addMethod(video, 'mouseout', function (event) {
                removeBtn(iframe.contentWindow.document, event);
            });
        });

        iframe.contentWindow.document.onkeyup = function (e) {
            keyUp(e, iframe.contentWindow.document);
        };
    });
}