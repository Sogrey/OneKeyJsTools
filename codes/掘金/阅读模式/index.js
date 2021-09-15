/**
 * 掘金 (https://juejin.cn/) 文章页阅读模式
 * 
 * https://juejin.cn/post/{postId}
 * https://juejin.cn/news/{newsId}
 * 
 * 示例页面：
 *   https://juejin.cn/post/6844903689870639111
 *   https://juejin.cn/news/7008021418877124621
 *
 */
/**title:掘金-阅读模式**/ // <--- 此行必须，不得缺失

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

var jueJinPostHost = "https://juejin.cn/post/";
var jueJinNewsHost = "https://juejin.cn/news/";

var regJueJinPostHost = /https:\/\/juejin\.cn\/post\//g;
var regJueJinNewsHost = /https:\/\/juejin\.cn\/news\//g;


if (regJueJinPostHost.test(document.location.href)) { // 掘金post
    // 扩大文章模块宽度
    getElement('.article-area').style.width = "100%";

    // 隐藏相关文章列表
    displayNoneElements(getElementAll('.recommended-area'));

    // 隐藏掘金插件广告
    displayNoneElements(getElementAll('.recommend-box'));

    // 隐藏右侧
    displayNoneElements(getElementAll('.sidebar'));
} else if (regJueJinNewsHost.test(document.location.href)) { // 掘金news
    // 扩大新闻模块宽度
    getElement('.main-box').style.width = "100%";

    // 隐藏相关文章列表
    displayNoneElements(getElementAll('.realtime_related'));

    // 隐藏掘金插件广告
    displayNoneElements(getElementAll('.recommend-box'));

    // 隐藏右侧
    displayNoneElements(getElementAll('.sidebar'));
} else {
    alert(`此插件仅支持 ${jueJinPostHost} 或 ${jueJinNewsHost}`);
}