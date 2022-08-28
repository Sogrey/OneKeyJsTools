
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

//[绑定监听事件]
function addMethod(node, type, method) {
    if (node.addEventListener) { // IE9以下不兼容
        node.addEventListener(type, method, false)
    } else if (node.attachEvent) { // IE独有
        node.attachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method; // 一个元素只能绑定一个处理程序
    }
}

//[移除监听事件]
function removeMethod(node, type, method) {
    if (node.removeEventListener) { // IE9以下不兼容
        node.removeEventListener(type, method, false)
    } else if (node.detachEvent) { // IE独有
        node.detachEvent(`on${type}`, method)
    } else {
        node[`on${type}`] = method;
    }
}

function addLinkIntoHead(cssURL) {
    var head = document.getElementsByTagName('head')[0],
        linkTag = document.createElement('link');

    linkTag.id = 'dynamic-style';
    linkTag.href = cssURL;
    linkTag.setAttribute('rel', 'stylesheet');
    linkTag.setAttribute('media', 'all');
    linkTag.setAttribute('type', 'text/css');

    head.appendChild(linkTag);
}

/***********************main************************/
const SogreyRecordHtmlRootId = 'SogreyRecordHtmlRootId';
function initHtmlElements() {
    // 判断HTML element 是否已存在
    // 已存在返回
    let root = document.getElementById(SogreyRecordHtmlRootId);
    if (root) return;
    // 不存在创建

    // <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    // <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    addLinkIntoHead('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css')
    addLinkIntoHead('https://fonts.googleapis.com/css?family=Roboto')

    root = document.createElement("div");
    root.id = SogreyRecordHtmlRootId;

    const style = `
  <style type="text/css">
  #${SogreyRecordHtmlRootId} {
    width: 4em;
    height: 4em;
    margin: 4em auto 0;
    font-size: 1em;
    line-height: 4em;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    top: 0;
    bottom: 0;
    right: 0em;
    position: fixed;
    align-items: center;
    z-index: 99999;
  }
  #${SogreyRecordHtmlRootId} ul {
    list-style: none;
    margin: 0;
    padding: 0;
    perspective: 1000px;
  }
  #${SogreyRecordHtmlRootId} ul li {
    display: block;
    background-color: #333;
    height: 4em;
    padding: 1em 1.5em;
    position: relative;
    -webkit-transition: -webkit-transform 0.5s, background-color 0.5s, color 0.5s;
    transition: transform 0.5s, background-color 0.5s, color 0.5s;
  }
  /*the colors of the different columns*/
  #${SogreyRecordHtmlRootId} ul li:nth-child(1) {
    background-color: #00aced;
  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(2) {
    background-color: #3b5998;
    transform: rotateY(-90deg);
    transform-origin: center right;
    /*transform-origin: 50% 100%;    alternative using percentages */
  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(3) {
    background-color: #00a300;
    transform: rotateY(-90deg);
    transform-origin: center right;
  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(4) {
    background-color: #1e7145;
    transform: rotateY(-90deg);
    transform-origin: center right;
  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(5) {
    background-color: #ffc40d;
    transform: rotateY(-90deg);
    transform-origin: center right;
  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(6) {
    background-color: #cb2027;
    transform: rotateY(-90deg);
    transform-origin: center right;
  }
  #${SogreyRecordHtmlRootId} ul li:hover {
    background-color: #339966;
    /*   -webkit-transform: translateX(10em); */
    /*   transform: translateX(10em);  */
    /*   transform: rotateX(0deg); */
    /*   var(--bg-color) = true; */
  }
  #${SogreyRecordHtmlRootId} ul li span {
    display: block;
    color: #fff;
    position: absolute;
    font-size: 1em;
    line-height: 2em;
    height: 2em;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    padding: 1em 1.5em;
    right: 0.16666666666667em;
    color: #f8f6ff;
  }  
  </style>
    `;

    const html = `
  <ul>
    <li><span><i class="fa fa-circle"></i></span></li>
    <!--<li><span><i class="fa fa-stop"></i></span></li>-->
    <li><span><i class="fa fa-play"></i></span></li>
    <li><span><i class="fa fa-cog"></i></span></li>
    <li><span><i class="fa fa-download"></i></span></li>
    <li><span><i class="fa fa-github-alt"></i></span></li>
  </ul>
    `;

    root.innerHTML = style + html;

    document.body.appendChild(root);

    initEvent()
}
function initEvent() {

}
initHtmlElements();

let mediaRecorder;
var mediaStream //视频流
var videoBuffer = [] //保存的视频数据

// 初始化请求用户授权监控
function startRecord() {
    if (!navigator.mediaDevices && !navigator.mediaDevices.getDisplayMedia) {
        alert("当前浏览器不支持屏幕捕捉")
        return
    }
    reset()

    //获取视频流，这时候会弹出用户选择框，前提用户设备支持
    navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: true
        //{
        // width:750,height:450,frameRate:15,
        //}
    }).then((stream) => {
        // 对音视流进行操作
        // console.log('->', stream)
        initMediaRecorder(stream)
    });
}

// 开始录制方法
function initMediaRecorder(stream) {
    const options = {
        mimeType: "video/webm; codecs = vp8", // 媒体格式
    };
    // 创建 MediaRecorder 的实例对象，对指定的媒体流进行录制
    mediaRecorder = new MediaRecorder(stream, options);
    // 当生成媒体流数据时触发该事件，回调传参 event 指本次生成处理的媒体数据
    mediaRecorder.ondataavailable = event => {
        if (event?.data?.size > 0) {
            videoBuffer.push(event.data); // 存储媒体数据
        }
    };
    mediaRecorder.start();
    mediaStream = stream;
};

function reset() {
    stopRecord()
    mediaRecorder = null
    mediaStream = null
    videoBuffer = []
}

/**
 * 停止录制
 */
function stopRecord() {
    if (mediaStream) {
        for (let track of mediaStream.getTracks()) {
            track.stop()
        }
    }
    mediaRecorder && mediaRecorder.state !== 'inactive' && mediaRecorder.stop()
}

// 回放录制内容
function replay() {
    const video = document.createElement("video");
    document.body.append(video)
    const blob = new Blob(videoBuffer, { type: "video/webm" });
    video.src = window.URL.createObjectURL(blob);
    video.srcObject = null;
    video.controls = true;
    video.play();
}

function download() {
    console.log(videoBuffer)
    if (videoBuffer == null || videoBuffer.length == 0) {
        alert("没有视频数据")
        return
    }
    let blob = new Blob(videoBuffer, {
        type: "video/webm"
    });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "download.webm";
    a.click();
    window.URL.revokeObjectURL(url);
}