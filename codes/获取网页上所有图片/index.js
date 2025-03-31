/**title:获取页面图片**/  // <--- 此行必需，不得缺失
/**version:1.0.1**/ // <--- 版本号

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

var styleId = 'sogrey-floatLayer';
var eleId = `#${styleId}`;

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
function appendStyle () {
    if (getElement(eleId)) return;

    var style = document.createElement('style');
    style.innerHTML = [
        "/*人为制造一个占据整个屏幕的Div,其透明度为0.7且z-index为9999使之前的页面被压在底层无法点击*/",
        "#fullScreen{",
        "    position: fixed;",
        "    width: 100%;",
        "    height: 100%;",
        "    left: 0;",
        "    top: 0;",
        "    opacity: 0.7;",
        "    background-color: black;",
        "    z-imgIndex: 99999;",
        "}",
        "/*浮层,可随意设置大小宽高,但是z-index必须比上面fullScreen大才能显示出来*/",
        "#floatLayer{",
        "    position: fixed;",
        "    width: 80%;",
        "    height: 80%;",
        "    left: 10%;",
        "    top: 10%;",
        "    z-imgIndex: 100000;",
        "    overflow-y: scroll;",
        "}",

        "#floatLayer>.container{",
        "  display: flex;",
        "  flex-flow: column wrap;",
        "  align-content: space-between;",
        "  /* 容器必须有固定高度且高度大于最高的列高 */",
        "  height: 0px;",
        "  /* 非必须 */",
        "  background-color: #f7f7f7;",
        "  border-radius: 3px;",
        "  width: 100%;",
        "  margin: 0px auto;",
        "  counter-reset: items;",
        "}",
        "#floatLayer .item {",
        "  width: 25%;",
        "  /* 非必须 */",
        "  position: relative;",
        "  border-radius: 3px;",
        "  background-color: #a1cbfa;",
        "  border: 1px solid #4290e2;",
        "  box-shadow: 0 2px 2px rgba(0,90,250,0.05),",
        "    0 4px 4px rgba(0,90,250,0.05),",
        "    0 8px 8px rgba(0,90,250,0.05),",
        "    0 16px 16px rgba(0,90,250,0.05);",
        "  color: #fff;",
        "  padding: 15px;",
        "  margin-bottom: 2px;",
        "  box-sizing: border-box;",
        "}",

        "/* 仅用于打印数字 */",
        "#floatLayer div.item::before {",
        "  counter-increment: items;",
        "  content: counter(items);",
        "}",

        "/* 将内容块重排为4列 */",
        "#floatLayer .item:nth-of-type(4n+1) { order: 1; }",
        "#floatLayer .item:nth-of-type(4n+2) { order: 2; }",
        "#floatLayer .item:nth-of-type(4n+3) { order: 3; }",
        "#floatLayer .item:nth-of-type(4n)   { order: 4; }",

        "/* 强制换列 */",
        "#floatLayer .break {",
        "  flex-basis: 100%;",
        "  width: 0;",
        "  border: 1px solid #ddd;",
        "  margin: 0;",
        "  content: '';",
        "  padding: 0;",
        "}",
        "#fullScreen .close {",
        "    position: absolute;",
        "    display: inline-block;",
        "    width: 50px;",
        "    height: 50px;",
        "    overflow: hidden;",
        "    top: 5%;",
        "    right: 6%;",
        "    cursor: pointer;",
        "}",
        "#fullScreen .close::before,#fullScreen .close::after {",
        "    content: '';",
        "    position: absolute;",
        "    height: 2px;",
        "    width: 100%;",
        "    top: 50%;",
        "    left: 0;",
        "    margin-top: -1px;",
        "    background: #fff;",
        "    border-radius: 5px;",
        "}",
        "#fullScreen .close::before,#fullScreen .close::after {",
        "    background: #fff;",
        "}",
        "#fullScreen .close::before {",
        "    -webkit-transform: rotate(45deg);",
        "    -moz-transform: rotate(45deg);",
        "    -ms-transform: rotate(45deg);",
        "    -o-transform: rotate(45deg);",
        "    transform: rotate(45deg);",
        "    height: 12px;",
        "    margin-top: -6px;",
        "}",
        "#fullScreen .close::after {",
        "    -webkit-transform: rotate(-45deg);",
        "    -moz-transform: rotate(-45deg);",
        "    -ms-transform: rotate(-45deg);",
        "    -o-transform: rotate(-45deg);",
        "    transform: rotate(-45deg);",
        "    height: 12px;",
        "    margin-top: -6px;",
        "}",
        "#fullScreen .playBtn{",
        "    display: inline-block;",
        "    width:50px; height:50px;",
        "    position: absolute;",
        "    top: 12%;",
        "    right: 6%;",
        "    cursor: pointer;",
        "    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAmVJREFUaEPtmruPTVEYxX+r8Ah/ASqFEM8gJDqCURGtoTCJ0BiVR2mUHpXREIkpPFqhMojpJATxGCEKlfEXEI9iyR7n3tw5987N2XsiUXynucm9a6291z7f2efb9/vELJftI8A2YAOwGXgDvAU+STo3G28u39s+C6wA1gHrgRfAa+CppOu9tNXrS9uPgJ19JvMR2C/pw1wm3OLaXgXcBVb20XssaVf99y4Dtt8BaxpObL6k3w2xPWG25wG/GmpMSlrbiZ1hwPYgcKuhWIJdkHQmA98FtX0eOJ2hcVDS7Ra+bcD24irGl2eIJegeSeOZnGm47QHgQSb3c3pGJH1LvE4DW4BnmWIJfkrSpQJeMnASuFjA3Srped3AYeBGgdiYpKECXjKQxkvj5l5DksbqBtIWNpKrBExI2lHASwaeANsLuCOtrbwzhMJA7krGHajtQhFCEULNVyB2oc61ivdA88hpIyOEIoSqdDpyoUjmIp2O80C1IVZ/KsWJLOetGgeaOND8jZfIRnOemwob2Whko5GNVlWiyEZjG41sNLLR/yeVOAC0q38Zr/drko5l4NtQ21eBowXcQUl36iWmjcDLArFhSVcKeKnEdBwYLeBukvSqbmBRaiMAlmYKDkh6mMmZhtveDeSWaKdSO4Kk7zMMVIK5RY77kvaVTL7FsX0P2Juh0c5EuwxUJr5k3IWFkn5mDN4Ftb0A+NFQY0rSsk7sbM0el4HhPqITQHqQvjYcuC/M9pJqA+lXch2VdKIu1NNAdScOAakVILXbpNaXSeB9+vzH7Tap0WR11XCSWnxSu824pJu9VuEPtTLsQCo8ZMMAAAAASUVORK5CYII=);",
        "}",
        "#fullScreen .play {",
        "    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZpJREFUaEPtmT1KBEEQhd87gZfQSxgZ7Q08hIFnMHIRWUyMFg3EUAMx1MAVE01ETDRQNBDMTASNhJaCathk2d6e/iuYiaenv69rph9dQxi/aJwfvUDtCvYVMFEB59w6gC2FPSI5qg3u5w96hZxzLwCWp6CvAeyQvKgtEirgZoDuq8hnLZGuAsL9phIHNSRSCHjucxW5KymSUkC4/0RCRX5KiKQW8MwPKnGSWyKXgOc+VpHnXCK5BYT7SyWyZEcJAb/4WbKjpIAXSZodNQSSZkctgWTZUVugc3a0INApO1oSiMqOFgV8dmyQPJ0XgK0KCPcryRXLArckV60KXAHYJPlkTeAbwDbJ3Xngi56JZx0pQ+cJuU8+WIF/DLm5JYF3AEOSh4uAtyIw1lX/iIGXMbW20XsFP4sFr1mBocL/doUvXYFLBb9JAV6yAnKklI90LyV4KQGzh3qzbRXTjS2zrUXTzd2kLZKYXSo0iScA1qYmyNKkyikwkL0cwBKAsblfTDErU2pM0CtUCiZmnl4gZtVSjukrkHI1Y571D0CV1zGRSK2CAAAAAElFTkSuQmCC);",
        "}",
        "#floatLayer .imgPreview{",
        "    top: 0;",
        "    left: 0;",
        "    width: 100%;",
        "    height: 100%;",
        "    position: absolute;",
        "    background: #000;",
        "    display: none;",
        "}",
        "#floatLayer .imgPreview>img.preview{",
        "    margin: 0 auto;",
        "    width: 100%;",
        "    height: 100%;",
        "    object-fit: contain;",
        "}",
        "#floatLayer .imgPreview>img.pre_img,",
        "#floatLayer .imgPreview>img.next_img{",
        "   position: absolute;",
        "   height: 100%;",
        "   width: 50px;",
        "   object-fit: contain;",
        "}",
        "#floatLayer .imgPreview>img.pre_img{",
        "   left: 10px;",
        "}",
        "#floatLayer .imgPreview>img.next_img{",
        "   right: 10px;",
        "}",
        "#floatLayer .imgPreview>span.img_index_show{",
        "    position: absolute;",
        "    bottom: 10px;",
        "    display: inline-block;",
        "    width: 100%;",
        "    left: 0;",
        "    font-size: 30px;",
        "    text-align: center;",
        "}",
    ].join('\n');

    style.setAttribute('id', styleId);
    document.head.appendChild(style);
}
appendStyle()

//清除之前的样式
var fullScreen = getElement("body>#fullScreen");
if (fullScreen) fullScreen.parentElement.removeChild(fullScreen);
fullScreen = document.createElement("div");
fullScreen.id = "fullScreen";
getElement("body").appendChild(fullScreen);
var closeBtn = document.createElement("span");
closeBtn.classList.add("close");
fullScreen.appendChild(closeBtn);
var playBtn = document.createElement("span");
playBtn.classList.add("play");
playBtn.classList.add("playBtn");
fullScreen.appendChild(playBtn);

var floatLayer = getElement("body>#floatLayer");
if (floatLayer) floatLayer.parentElement.removeChild(floatLayer);
floatLayer = document.createElement("div");
floatLayer.id = "floatLayer";
getElement("body").appendChild(floatLayer);
var container = document.createElement("div");
container.classList.add("container");
floatLayer.appendChild(container);
var imgPreview = document.createElement("div");
imgPreview.classList.add("imgPreview");
imgPreview.innerHTML = '<img class="preview" src=""><span class="img_index_show"></span><img class="pre_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA31JREFUaEPFmVuITlEcxdfyJMQTIU9E8UJKeXApD5JREibXaBj3Qm4Jk0tpMm7JJTOEaNxvMSgpKZISSUmkpEhKSkpKS3v6mz6fmTn7f75zvtmvZ6291+/ss/fZF6KDiqQ+AO4AOEOyLm0MpjWW4pPUDcBtAKOsniUkj6aps6MAmgBMLAo8m2SjF6LsAJLOApjRRtApJK95IMoKIKkeQHU7AX8ACBB3YyHKBiBpN4A1EcE+AZhG8lGEFmUBkFQDYFtMINO8AVBJ8nmSJ3cASasA7EsKUvT8rQE8S/LlCiCpCsDxpBBFzz9b+AcxvtwAJFUCOB8TokATBnH4dG7F+nIBkBTm+DDXe8sMki7ozAEkjQFwA0B3Z/pqksecnmxnIUnDAVwH0M8ZZDXJ/U5PszyzHpA0CMBVAEOcQWpI7nB6WuSZAEjqC+AygJHOIHUk1zs9/8hLBpAUvvWLAMY7gxwhuczp+U9eEoCkTgAuAJjqDBL2AHOdnlblpQKcBDDPGSQM8jDX/3L6sgWQdBDAcmeIexb+q9PXpjxVD0iqBbDBGeKJhX/v9LUrdwNI2gzAO+29svAvswzv/g+kXFl+sPCPsw7vApC0EECDM8Q3Cx+9w3LWH/cnlhT2sGEv6ym/LfwVj8mrjRoDkrrYfF/hbOAUyflOj0seBRBqlNTLIMa6WgAOkVzh9ETLowEMYoBBhFWnp9SS3OgxxGpdAAYxzCAGxjZiuk0kdzo9iXI3gEGMNojeiS38K1hJ8oDT0648FYBBhG1jWMh1dQaqInnC6WlTnhrAINJs3GXT66UsIEoCMIgFALx72e8GEY7XSyolAxhEmsOrjwbxsBSCTAAMYguA7c4wrw3ihdPXIs8MwCB2AVjnDPPUIN45fc3yTAEM4jCApc4w9w3ii9OXPYBBnAYwxxkmHIaFreZPjy/zHvjbuKRw0zLZEyaseEnO8njyBOhs56PjPIEA1JNcHOvJDcA+pZ4GMSI2kOn2kFwb48kVwCD6A7gJYHBMoALNVpKJtzq5AxjEUIOIPfTdSzLmPi2fWai1Ny0pXGqHnuiR0BMNJBfF9lZZeqBgZppgYyIcSbZWzpGcGRs+lx9ZUuOSptsyvFjaRHJSkr/4eVl7oKAnii//woXeRJLhjsxVOgTABvZKAOFWJqyFKkiG20l36TAAgwjHlI0kUy3kQh1/ANYnBkBHjxXiAAAAAElFTkSuQmCC"><img class="next_img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAz9JREFUaEPNmkuIj2EYxc+xIRYWlCSxUKQsKBaKYqHcZtIwxq1EY1JyHQo1DDUWwwibCbEhMYRJZCUkC+WyUAorCUtiffSaR0YzZt7n+b6v8a7PeZ7z+3+39/InCgxJSwBsILmmQJlCVkbdkuYBuAdgFICzJJuitYr4QgCSZgG4A2B8r+bHSe4tEibidQNImgbgFoCp/TRsIXk0EiTqcQFImgjgBoDZAzTcSfJUNJDXlw0gaQyAawAWZjTZRPJihq6wJAtA0ggLv9zRcSXJdLUqHbkADQCuOJMIwGKS950+lzwLIFWU1Jhel67qwFcAS0k+cfqy5dkABrELQEd29R7hBwDLSb5y+rLkLgCDaAHQmlX9j+g1gFqS752+QeVuAINoB9A8aPW/BU8BrCD5xekbUB4CMIhOAN7pQ3qg60j+KAsiDGAQlwCsc4bpIlnv9PxTXhRguH0fapyBLpDc7PT0Ky8EYFdhrEEscAY6TXKH09NHXhjAICYbxEBzpP6ytpE8WASiFACDmGEQabbqGQdIHvMYemtLAzCIuQYxwRloO8kzTs8veakABrHIIEY7A4VmsKUDGESdQQxzQtST7PJ4KgEwiI0AvGuC9IFbRTKttbNGZQAGsQ2A997+BGA1ycc5BJUCGMR+AG05YXpp3gJIt9PLwXz/K8A7A3gxpACSIrdQmq2mX//RYOEreY3+biop+hCn8HdzwlcGICn6Gm0geTU3fCUAkqIfskaS5z3hSweQFJ1K7CZ50hu+VABJ0cncIZJHIuFLA5AUnU63k9wXDV8KgKTogqaT5NYi4QsDSIouKS+TXF80fBkAkUV9N8naMsIXApAU2VZ5AKCG5PchBZAU2dh6ZuE/lxU+dAUkRbYW31j4NMssdbhmo5Iim7sfLfzzUpNbsWyA4Pb6Nwv/sIrw2beQpOgBR3pg02lmZSPrCtgR0/V0WOFIspak91THUb5HmgWQhPbFTWde8zO6NJH0nuZklO0ryQYwiEkAbgKYOUC3ZpInQmkCJheAQUwHcBvAlH76tZI8HMgRtrgBDGIOgG4A43p17iC5J5wkaAwBGETaTk9vmJEAzpHcEsxQyBYGMIhl6YRmKP9u8xPu7QBAtNG/4gAAAABJRU5ErkJggg==">';
floatLayer.appendChild(imgPreview);

var imageSelector = ".tupian-detail-content img" // "#gallery-2 img"
var isImgPrevired = false;
var currentImgIndex = 0;

var result = Object.values(getAllElement(imageSelector)).filter(isImage).map(img => {
    var src = img.getAttribute('data-pic-base64'); // 懒加载
    // 'data-pic-base64' == src && (src = src.replace("data-pic-base64,", ""));
    src = src.replace("-285x285", "-scaled");
    return {
        src: "//" + document.location.hostname + "/" + src,
        title: img.title,
    }
})

console.log(result);

if (result.length > 0) {
    var imgIndex = 0;
    result.forEach(img => {
        var item = document.createElement("div");
        item.classList.add("item");
        var imgEle = document.createElement("img");
        imgEle.src = img.src;
        item.appendChild(imgEle);
        container.appendChild(item);

        addMethod(imgEle, 'click', function () {
            isImgPrevired = true;
            currentImgIndex = imgIndex;
            getElement("#floatLayer .imgPreview>img.preview").src = img.src;
            getElement("#floatLayer .imgPreview").style.display = "block";
            getElement("#floatLayer .imgPreview>span.img_index_show").innerHTML = (currentImgIndex + 1) + "/" + result.length;
        })

        if (imgIndex % 4 == 0) {
            container.style.height = 1.2 * (imgIndex * 0.25 + 1) * window.innerWidth * 0.8 * 0.25 / 0.9 + "px";
        }

        imgIndex++;
    })
}

var spanELe = document.createElement("span");
spanELe.classList.add("item");
spanELe.classList.add("break");
container.appendChild(spanELe);
var spanELe = document.createElement("span");
spanELe.classList.add("item");
spanELe.classList.add("break");
container.appendChild(spanELe); var spanELe = document.createElement("span");
spanELe.classList.add("item");
spanELe.classList.add("break");
container.appendChild(spanELe);

addMethod(getElement("#fullScreen .close"), 'click', function () {
    if (isImgPrevired) {
        isImgPrevired = false;
        if (timer) {
            try {
                getElement("#fullScreen .playBtn").classList.add("play");
                clearInterval(timer);
                timer = undefined;
            } catch (error) { }
        }
        getElement("#floatLayer .imgPreview").style.display = "none";
    } else {
        if (fullScreen) fullScreen.parentElement.removeChild(fullScreen);
        if (floatLayer) floatLayer.parentElement.removeChild(floatLayer);
    }
})
addMethod(getElement("#floatLayer .imgPreview>img.pre_img"), 'click', function () {
    if (isImgPrevired) {
        --currentImgIndex;
        if (currentImgIndex <= -1) {
            currentImgIndex = result.length - 1;
        }
        getElement("#floatLayer .imgPreview>img.preview").src = result[currentImgIndex].src;
        getElement("#floatLayer .imgPreview>span.img_index_show").innerHTML = (currentImgIndex + 1) + "/" + result.length;
    }
})
addMethod(getElement("#floatLayer .imgPreview>img.next_img"), 'click', function () {
    if (isImgPrevired) {
        ++currentImgIndex;
        if (currentImgIndex > result.length - 1) {
            currentImgIndex = 0;
        }
        getElement("#floatLayer .imgPreview>img.preview").src = result[currentImgIndex].src;
        getElement("#floatLayer .imgPreview>span.img_index_show").innerHTML = (currentImgIndex + 1) + "/" + result.length;
    }
})
var playBtn = getElement("#fullScreen .play");
var timer;
var playEvent = function () {
    if (timer) {
        try {
            getElement("#fullScreen .playBtn").classList.add("play");
            clearInterval(timer);
            timer = undefined;
        } catch (error) { }
    } else {
        getElement("#fullScreen .playBtn").classList.remove("play");
        isImgPrevired = true;
        getElement("#floatLayer .imgPreview>img.preview").src = result[currentImgIndex].src;
        getElement("#floatLayer .imgPreview>span.img_index_show").innerHTML = (currentImgIndex + 1) + "/" + result.length;
        getElement("#floatLayer .imgPreview").style.display = "block";
        timer = setInterval(function () {
            ++currentImgIndex;
            if (currentImgIndex > result.length - 1) {
                currentImgIndex = 0;
            }
            getElement("#floatLayer .imgPreview>img.preview").src = result[currentImgIndex].src;
            getElement("#floatLayer .imgPreview>span.img_index_show").innerHTML = (currentImgIndex + 1) + "/" + result.length;
        }, 1000);
    }
}
addMethod(playBtn, 'click', playEvent)