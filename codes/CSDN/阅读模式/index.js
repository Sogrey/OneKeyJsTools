/**
 * CSDN博客 (https://blog.csdn.net/) 文章页阅读模式
 * 
 * https://blog.csdn.net/*
 * 
 * 示例页面：
 *   https://blog.csdn.net/weixin_39709134/article/details/120230960
 */
/**title:CSDN-阅读模式**/ // <--- 此行必须，不得缺失

var CsdnBlogHost = 'https://blog.csdn.net/';
var regCsdnBlogHost = /https:\/\/blog\.csdn\.net\//g;

// var location = document.location;
// var origin = document.location.origin;

var csdn_mainContent_styleIdName = "sogrey-csdn-main";
var csdn_mainContent_styleId = `#${csdn_mainContent_styleIdName}`;

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

function setMainDivStyle() {
    if (getElement(csdn_mainContent_styleId)) return;

    var style = document.createElement('style');
    style.innerHTML = [
        ".nodata .container {",
        "    position: relative;",
        "    margin:0 auto;",
        "}",
        ".nodata .container main {",
        "    width: 90%;",
        "    float: none;",
        "    margin:0 auto;",
        "}",
        "@media screen and (max-width: 1320px){",
        "   .nodata .container {",
        "       width: 1024px;",
        "   }",
        "}",
        "@media screen and (max-width: 1280px){",
        "   .nodata .container {",
        "       width: 920px;",
        "   }",
        "}",
        "@media screen and (max-width: 760px){",
        "   .nodata .container main {",
        "       width: 600px;",
        "   }",
        "}",
    ].join('\n');

    style.setAttribute('id', csdn_mainContent_styleIdName);
    document.head.appendChild(style);
}

//'https://blog.csdn.net/';'https://blog.csdn.net/weixin_39709134/article/details/120230960'.startWith(CsdnBlogHost)

// regCsdnBlogHost.test('https://blog.csdn.net/weixin_39709134/article/details/120230960');

if (!regCsdnBlogHost.test(document.location.href)) { // 非CSDN Blog
    alert(`此插件仅支持 ${CsdnBlogHost}`);
} else {
    // 文章内容铺满页面
    // getElement('main').style.width = '100%';
    setMainDivStyle();

    if (getElement('.btn-readmore')) { // 文章很长需要点击阅读更多
        // 打开阅读更多
        if (getElement('.btn-readmore.no-login')) { //未登录
            alert('检测到您未登录CSDN,需要登录后点击“阅读更多”才能看到完整文章。');
        } else { // 已登录
            getElement('.btn-readmore').click();
        }
    }

    // 隐藏aside边栏
    // getElement('aside').style.display = 'none';
    getElement('aside').innerHTML = '';

    // 右侧文章分类
    displayNoneElements(getElementAll('.recommend-right'));

    // 文章下方，评论上方
    displayNoneElements(getElementAll('.recommend-box'));

    // footer
    displayNoneElements(getElementAll('.blog-footer-bottom'));
}