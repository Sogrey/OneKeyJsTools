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

function copyToClipBoard(_sTxt) {
    try {
        if (window.clipboardData) {
            window.clipboardData.setData("Text", _sTxt);
        } else if (window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip) return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans) return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = _sTxt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
        }else{
            var inputEle = document.createElement('textarea');
            inputEle.value = _sTxt;
            inputEle.focus();
            inputEle.select();
            document.execCommand('copy');
        }
    } catch (e) { console.error(e); }
}

var run = function () {
    var text = getSelectionText();
    if (text) {
        console.log(text)
        copyToClipBoard(text);
    }
}

run();