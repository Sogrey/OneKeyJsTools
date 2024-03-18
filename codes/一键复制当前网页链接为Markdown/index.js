/**title:一键复制当前网页链接为Markdown**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

/**
 * @auth
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
function copyToClipboard (text) {
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
function copyToClipboardFromInputElement (inputElement) {
    inputElement.select();
    var res = document.execCommand('copy');
    console.log("复制成功");
    return res;
}
var toast = function (params) {
    /*设置信息框停留的默认时间*/
    var time = params.time;
    if (time == undefined || time == '') {
        time = 1500;
    }
    var el = document.createElement("div");
    el.setAttribute("class", "web-toast");
    el.innerHTML = params.message;
    document.body.appendChild(el);
    el.classList.add("fadeIn");
    setTimeout(function () {
        el.classList.remove("fadeIn");
        el.classList.add("fadeOut");
        /*监听动画结束，移除提示信息元素*/
        el.addEventListener("animationend", function () {
            document.body.removeChild(el);
        });
        el.addEventListener("webkitAnimationEnd", function () {
            document.body.removeChild(el);
        });

    }, time);
}

var insertStyle = function (css) {
    // 创建一个新的 style 元素
    var styleElement = document.createElement('style');

    // 添加需要添加的样式规则
    styleElement.innerHTML = css;

    // 将 style 元素添加到文档的头部
    document.head.appendChild(styleElement);
}

insertStyle(`@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-moz-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-o-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@-ms-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.web-toast{position:fixed;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;line-height:1;padding:10px;border-radius:3px;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);z-index:9999;white-space:nowrap;}.fadeOut{animation:fadeOut .5s;}.fadeIn{animation:fadeIn .5s;}`);

var text = `[${document.title}](${document.URL})`

copyToClipboard(text)

// alert('复制成功')
toast({
    message: "复制成功",
    time: 2000
})