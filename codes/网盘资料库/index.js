/**title:网盘资料库**/  // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

// https://pan.ruiwen.com/#{%22key%22:%221byh%22,%22page%22:1}

// 图片格式过滤
// 是否懒加载? 懒加载链接属性字段
String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}

var getElement = function (selector) {
    return document.querySelector(selector);
}
var getAllElement = function (selector) {
    return document.querySelectorAll(selector);
}
//[绑定监听事件]
function addMethod (node, type, method) {
    if (node.addEventListener) { // IE9以下不兼容
        node.addEventListener(type, method, false)
    } else if (node.attachEvent) { // IE独有
        node.attachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method; // 一个元素只能绑定一个处理程序
    }
}

//[移除监听事件]
function removeMethod (node, type, method) {
    if (node.removeEventListener) { // IE9以下不兼容
        node.removeEventListener(type, method, false)
    } else if (node.detachEvent) { // IE独有
        node.detachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method;
    }
}
// addMethod(playBtn, 'click', playEvent)

function ulLiToJson (ul) {
    var json = [];
    var liElements = ul.getElementsByTagName('li');
    for (var i = 0; i < liElements.length; i++) {
        json.push(liElements[i].textContent.trim());
    }
    return json;
}

let json = {};
let rootEle = getElement("#tree");
let childNodes = rootEle.querySelectorAll(':scope > ul');

var listJson = ulLiToJson(childNodes[0]);
console.log(listJson);