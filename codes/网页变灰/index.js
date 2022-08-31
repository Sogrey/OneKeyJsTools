/**title:页面变灰**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

// https://j11y.io/demos/grayscale/grayscale.js
var styleId = 'sogrey-htmlGray';
var eleId = `#${styleId}`;

var getElement = function (eleId) {
    return document.querySelector(eleId);
}

// 网页变灰
function appendGrayStyle() {
    if (getElement(eleId)) return;

    var style = document.createElement('style');
    style.innerHTML = [
        "html {",
        "    filter: grayscale(100%);/*火狐*/",
        "    -webkit-filter:grayscale(100%);/*chrome*/",
        "}",
        "body{",
        "    filter:gray; /*IE7-9*/",
        "}",
    ].join('\n');

    style.setAttribute('id', styleId);
    document.head.appendChild(style);
}

// 恢复
function deleteGrayStyle() {
    var style = getElement(eleId);
    if (!style) return;

    style.parentNode.removeChild(style);
}