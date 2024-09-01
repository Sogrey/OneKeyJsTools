/**
 * Github & Gitee 一键js脚本拖拽安装
 * 
 * 灵感来自于：https://gitee.com/imba97/js，此脚本有所修改
 */
/**title:拖拽安装**/ // <--- 此行必需，不得缺失
/**version:1.0.3**/ // <--- 版本号

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

/** main */

var githubMinJsHostPath = "https://github.com/Sogrey/OneKeyJsTools/blob/main/codes/**/*.min.js";
var giteeMinJsHostPath = "https://gitee.com/Sogrey/OneKeyJsTools/blob/main/codes/**/*.min.js";
var githubMinJsHost = "https://github.com/Sogrey/OneKeyJsTools/blob/main/codes/";
var giteeMinJsHost = "https://gitee.com/Sogrey/OneKeyJsTools/blob/main/codes/";
var jsEndWith = ".min.js"; // 以 .min.js 结束的压缩js

var href = document.location.href;

function createStyle (jsMinText) {
    // 创建 style
    var styleEle = document.createElement('style');
    styleEle.innerText =
        ".OneKeyInstall_a {display: inline-block;margin-right: 30px;width:100px;height:30px;line-height:30px;text-align:center;background-color:#24aee6;cursor:move;font-size:0;border-radius:5px;text-decoration:none !important;z-index:999999;margin-left: 30px;} .OneKeyInstall_a::before { content:'拖到收藏夹';font-size:16px;color:#FFF; }";
    document.head.appendChild(styleEle);

    // 创建 a 标签
    var OneKeyInstall_a = document.createElement('a');
    OneKeyInstall_a.setAttribute('class', 'OneKeyInstall_a');
    // 获取代码标题 格式为： /**title:简书-阅读模式**/

    var reg = /(?<=\/\*\*title:).*(?=\*\*\/)/;
    // var result = reg.exec("/**title:简书-阅读模式**/");
    var result = reg.exec(jsMinText);
    var title = result[0];

    OneKeyInstall_a.innerText = title;
    OneKeyInstall_a.href = 'javascript:' + jsMinText;

    return OneKeyInstall_a;
}

if (href.startsWith(githubMinJsHost) && href.endsWith(jsEndWith)) { // Github
    var divHere = document.querySelector('div.react-code-view-header-element--wide');
    // var jsMinText = document.querySelector('.blob-code').innerText;
    var jsMinText = document.querySelector('#read-only-cursor-text-area').value;

    var aEle = createStyle(jsMinText);
    // divHere.appendChild(aEle);
    divHere.insertBefore(aEle, divHere.firstChild);

} else if (href.startsWith(giteeMinJsHost) && href.endsWith(jsEndWith)) { // Gitee
    var divHere = document.querySelector('.repo-action-list-right');
    var jsMinText = document.querySelector('.highlight .line').innerText;

    var aEle = createStyle(jsMinText);
    // divHere.appendChild(aEle);
    divHere.insertBefore(aEle, divHere.firstChild);

} else {
    alert(`此插件仅支持 ${githubMinJsHostPath} 和 ${giteeMinJsHostPath}`);
}