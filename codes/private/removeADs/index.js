/**
 * 暴力移除广告
 */
/**title:暴力移除广告**/ // <--- 此行必需，不得缺失

var adsClasses = [
    '.ad',
    '.global_video_bottom_dbtc',
    '.photo-content-title-foot',
    '.top-title-container',
    '.close_discor',
    '.section-banner'
];

var mainContent_styleIdName = "sogrey-removeAd-main";
var mainContent_styleId = `#${mainContent_styleIdName}`;

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

adsClasses.forEach(clazz => {
    displayNoneElements(getElementAll(clazz));
})