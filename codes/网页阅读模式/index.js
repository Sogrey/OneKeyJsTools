/**title:网页阅读模式[CSDN|掘金|简书|百度知道|知乎|知乎专栏]**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

var mainContent_styleIdName = "sogrey-style-main";
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

function setMainDivStyle(css) {
    if (getElement(mainContent_styleId)) return;

    var style = document.createElement('style');
    style.innerHTML = css;

    style.setAttribute('id', mainContent_styleIdName);
    document.head.appendChild(style);
}

var BasicDictionary = {
    // csdn
    "https://blog.csdn.net": {
        regBlogHost: /https:\/\/(.*?.|)blog\.csdn\.net\//g,
        css: [
            ".nodata .container {",
            "    position: relative;",
            "    margin:0 auto;",
            "    width: 100%;",
            "}",
            ".nodata .container main {",
            "    width: 90%;",
            "    float: none;",
            "    margin:0 auto;",
            "}",
            "@media screen and (max-width: 1320px){",
            "   .nodata .container {",
            "       width: 1024px;",
            "   }",
            "}",
            "@media screen and (max-width: 1280px){",
            "   .nodata .container {",
            "       width: 920px;",
            "   }",
            "}",
            "@media screen and (max-width: 760px){",
            "   .nodata .container main {",
            "       width: 600px;",
            "   }",
            "}",
        ].join('\n'),
        events: function () {
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

            // 自动展开被折叠部分
            let hidePreCodeBts = getElementAll('.hide-preCode-bt');
            if (hidePreCodeBts && hidePreCodeBts.length > 0) {
                hidePreCodeBts.forEach(item => item.click());
            }
        }
    },
    // 掘金
    "https://juejin.cn": {
        regBlogHost: /https:\/\/juejin\.cn\//g,
        css: "",
        events: function () {
            // 扩大文章模块宽度
            if (getElement('.article-area')) getElement('.article-area').style.width = "100%";

            // 扩大新闻模块宽度
            if (getElement('.main-box')) getElement('.main-box').style.width = "100%";

            // 隐藏相关文章列表
            displayNoneElements(getElementAll('.realtime_related'));

            // 隐藏相关文章列表
            displayNoneElements(getElementAll('.recommended-area'));

            // 隐藏掘金插件广告
            displayNoneElements(getElementAll('.recommend-box'));

            // 隐藏右侧
            displayNoneElements(getElementAll('.sidebar'));
        }
    },
    // 简书
    "https://www.jianshu.com": {
        regBlogHost: /https:\/\/www\.jianshu\.com\/p\//g,
        css: "",
        events: function () {
            // 隐藏section 保留第一个
            displayNoneElements(getElementAll('section'));
            var firstSection = getElement('section');
            if (firstSection) {
                firstSection.style.display = "block";
                firstSection.style.width = "100%";
                firstSection.style.backgroundColor = "#ffe8ce";
                firstSection.parentElement.style.width = "80%";
                firstSection.parentElement.style.margin = "0 auto";
                firstSection.parentElement.parentElement.style.width = "100%";
            }

            // 隐藏点赞收藏按钮
            displayNoneElements(getElementAll('._3Pnjry'));

            // 隐藏右侧
            displayNoneElements(getElementAll('aside'));
        }
    },
    // 百度知道
    "https://zhidao.baidu.com": {
        regBlogHost: /https:\/\/(.*?.|)zhidao\.baidu\.com\/question\//g,
        css: [
            "#qb-side,.newbest-content-meta,#qbleftdown-container{display:none;}",
            "#qb-content{width:100%;}",
        ].join('\n'),
        events: function () {
            // 隐藏section 保留第一个
            displayNoneElements(getElementAll('section'));
            var firstSection = getElement('section');
            if (firstSection) {
                firstSection.style.display = "block";
                firstSection.style.width = "100%";
                firstSection.style.backgroundColor = "#ffe8ce";
                firstSection.parentElement.style.width = "80%";
                firstSection.parentElement.style.margin = "0 auto";
                firstSection.parentElement.parentElement.style.width = "100%";
            }

            // 隐藏点赞收藏按钮
            displayNoneElements(getElementAll('._3Pnjry'));

            // 隐藏右侧
            displayNoneElements(getElementAll('aside'));
        }
    },
    // 知乎
    "https://www.zhihu.com": {
        regBlogHost: /https:\/\/www\.zhihu\.com\/question\//g,
        css: "",
        events: function () {
            // 扩大文章模块宽度

            getElement('.ListShortcut').style.width = "100%";
            getElement('.Question-mainColumn').style.width = "100%";

            getElement('.Question-sideColumn').style.width = "0%";

            // 隐藏右侧
            displayNoneElements(getElementAll('.Sticky'));
        }
    },
    // 知乎专栏
    "https://zhuanlan.zhihu.com": {
        regBlogHost: /https:\/\/zhuanlan\.zhihu\.com\//g,
        css: "",
        events: function () {
            // 扩大文章模块宽度
            getElement('.Post-RichTextContainer').style.width = "70%";

            displayNoneElements(getElementAll('.Recommendations-Main'));

            // 隐藏右侧
            displayNoneElements(getElementAll('.Sticky'));
        }
    },
}

function main() {
    var origin = document.location.origin;
    if (!BasicDictionary[origin]) {
        alert(`暂不支持此站。`);
        return;
    }
    var regBlogHost = BasicDictionary[origin].regBlogHost;
    var css = BasicDictionary[origin].css;
    var events = BasicDictionary[origin].events;

    if (!regBlogHost.test(document.location.href)) {
        alert(`暂不支持此站。`);
        return;
    }

    setMainDivStyle(css);
    events();
}
main()