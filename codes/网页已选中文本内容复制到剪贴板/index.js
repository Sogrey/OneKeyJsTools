/**
 * 网页已选中文本内容复制到剪贴板
 */
/**title:网页已选中文本内容复制到剪贴板**/ // <--- 此行必需，不得缺失


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

var getSelectionText = function () {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function copyToClipBoard(text) {
    window.clipboardData.setData("Text", text);
    alert("复制成功");
}

var run = function () {
    var text = getSelectionText();
    if (text) {
        console.log(text)
        copyToClipBoard(text);
    }
}

run();