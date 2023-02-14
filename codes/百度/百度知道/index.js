/**
 * CSDN博客 (https://zhidao.baidu.com/question/) 文章页阅读模式
 * 
 * https://blog.csdn.net/*
 * 
 * 示例页面：
 *   https://zhidao.baidu.com/question/185833959956097524.html
 */
/**title:百度知道-阅读模式**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

var CsdnBlogHost = 'https://zhidao.baidu.com/question/';
var regCsdnBlogHost = 
/https:\/\/(.*?.|)zhidao\.baidu\.com\/question\//g;
/https:\/\/zhidao\.baidu\.com\/question\//g;

// var location = document.location;
// var origin = document.location.origin;

var csdn_mainContent_styleIdName = "sogrey-baidu-main";
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
        "#qb-side,.newbest-content-meta,#qbleftdown-container{display:none;}",
        "#qb-content{width:100%;}",
    ].join('\n');

    style.setAttribute('id', csdn_mainContent_styleIdName);
    document.head.appendChild(style);
}

if (!regCsdnBlogHost.test(document.location.href)) { // 非CSDN Blog
    alert(`此插件仅支持 ${CsdnBlogHost}`);
} else {
    // 文章内容铺满页面
    // getElement('main').style.width = '100%';
    setMainDivStyle();
    
}