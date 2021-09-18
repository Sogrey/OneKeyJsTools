/**
 * 知乎 (https://www.zhihu.com/) 文章页阅读模式
 * 
 * https://www.zhihu.com/question/{questionID}
 * https://zhuanlan.zhihu.com/p/{pID}
 * 
 * 示例页面：
 *   https://www.zhihu.com/question/49090321
 *   https://zhuanlan.zhihu.com/p/261355918
 */
/**title:知乎-阅读模式**/ // <--- 此行必须，不得缺失

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

var zhiHuQuestionHost = "https://www.zhihu.com/question/";
var zhiHuZhuanLanHost = "https://zhuanlan.zhihu.com/";

var regZhiHuQuestionHost = /https:\/\/www\.zhihu\.com\/question\//g;
var regZhiHuZhuanLanHost = /https:\/\/zhuanlan\.zhihu\.com\//g;

if (regZhiHuQuestionHost.test(document.location.href)) { // 知乎question
    // 扩大文章模块宽度
    
    getElement('.ListShortcut').style.width = "100%";
    getElement('.Question-mainColumn').style.width = "100%";

    getElement('.Question-sideColumn').style.width = "0%";

    // 隐藏右侧
    displayNoneElements(getElementAll('.Sticky'));
} else if (regZhiHuZhuanLanHost.test(document.location.href)) { // 知乎专栏
    // 扩大文章模块宽度
    getElement('.Post-RichTextContainer').style.width = "70%";

    displayNoneElements(getElementAll('.Recommendations-Main'));

    // 隐藏右侧
    displayNoneElements(getElementAll('.Sticky'));
} else {
    alert(`此插件仅支持 ${zhiHuQuestionHost} 和 ${zhiHuZhuanLanHost}`);
}