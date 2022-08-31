/**
 * 简书 (https://www.jianshu.com/) 文章页阅读模式
 * 
 * https://www.jianshu.com/p/{pID}
 * 
 * 示例页面：
 *   https://www.jianshu.com/p/cac06311888c
 */
/**title:简书-阅读模式**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

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

/** main */

var jianshuHost = "https://www.jianshu.com/p/{pID}";

var regJianshuHost = /https:\/\/www\.jianshu\.com\/p\//g;

if (regJianshuHost.test(document.location.href)) { // 简书
    // 隐藏section 保留第一个
    displayNoneElements(getElementAll('section'));
    var firstSection = getElement('section');
    firstSection.style.display = "block";
    firstSection.style.width = "100%";

    // 隐藏右侧
    displayNoneElements(getElementAll('aside'));
} else {
    alert(`此插件仅支持 ${jianshuHost}`);
}