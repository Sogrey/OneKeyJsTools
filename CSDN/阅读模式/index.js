var CsdnBlogHost = 'https://blog.csdn.net/';
var regCsdnBlogHost = /https:\/\/blog\.csdn\.net\//g;

// var location = document.location;
// var origin = document.location.origin;

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

// regCsdnBlogHost.test('https://blog.csdn.net/weixin_39709134/article/details/120230960');

if (!regCsdnBlogHost.test(document.location.href)) { // 非CSDN Blog
    alert(`此插件仅支持 ${CsdnBlogHost}`);
} else {
    // 文章内容铺满页面
    getElement('main').style.width = '100%';

    if (getElement('.btn-readmore')) { // 文章很长需要点击阅读更多
        // 打开阅读更多
        if (getElement('.btn-readmore.no-login')) { //未登录
            alert('检测到您未登录CSDN,需要登录后点击“阅读更多”才能看到完整文章。');
        } else { // 已登录
            getElement('.btn-readmore').click();
        }
    }

    // 隐藏aside边栏
    // getElement('aside').style.display = 'none';
    getElement('aside').innerHTML = '';

    // 右侧文章分类
    displayNoneElements(getElementAll('.recommend-right'));

    // 文章下方，评论上方
    displayNoneElements(getElementAll('.recommend-box'));

    // footer
    displayNoneElements(getElementAll('.blog-footer-bottom'));
}