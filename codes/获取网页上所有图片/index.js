// 图片格式过滤
// 是否懒加载? 懒加载链接属性字段
String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}

var isImage = function (img) {
    return img && img.src && 
        (
            img.src.endsWith('.jpg') ||
            img.src.endsWith('.jpeg') ||
            // img.src.endsWith('.bmp') ||
            // img.src.endsWith('.gif') ||
            img.src.endsWith('.png')
        ) // && img.title && img.title.length > 0
}

var result = Object.values(document.getElementsByTagName('img')).filter(isImage).map(img => {
    var src = img.getAttribute('data-original'); // 懒加载
    return {
        src: src,
        title: img.title,
    }
})

console.log(result);