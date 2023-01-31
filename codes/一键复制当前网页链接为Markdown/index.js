/**title:一键复制当前网页链接为Markdown**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

/**
 * @auth
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
function copyToClipboard(text) {
    var textareaEl = document.createElement('textarea');
    textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
    textareaEl.value = text;
    document.body.appendChild(textareaEl);
    textareaEl.select();
    var res = document.execCommand('copy');
    document.body.removeChild(textareaEl);
    console.log("复制成功");
    return res;
}
/**
 * @auth
 * @param {Element} inputElement 需要复制input textarea等元素的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
function copyToClipboardFromInputElement(inputElement) {
    inputElement.select();
    var res = document.execCommand('copy');
    console.log("复制成功");
    return res;
}


var text = `[${document.title}](${document.URL})`

copyToClipboard(text)

alert('复制成功')