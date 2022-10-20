
/**title:一键录屏**/ // <--- 此行必需，不得缺失
/**version:1.0.3**/ // <--- 版本号

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

    root = document.createElement("div");
    root.id = SogreyRecordHtmlRootId;

    const style = `
  <style type="text/css">
  #${SogreyRecordHtmlRootId} {width: 4em;height: 4em;margin: 4em auto 0;font-size: 1em;line-height: 4em;color: #fff;font-weight: 700;text-transform: uppercase;top: 0;bottom: 0;right: 0em;position: fixed;align-items: center;z-index: 99999;user-select: none;cursor: pointer;  }
  #${SogreyRecordHtmlRootId} ul {list-style: none;margin: 0;padding: 0;perspective: 1000px;  }
  #${SogreyRecordHtmlRootId} ul li {display: block;background-color: #333;height: 4em;position: relative;-webkit-transition: webkit-transform 0.5s, background-color 0.5s, color 0.5s;transition: transform 0.5s, background-color 0.5s, color 0.5s;background-image: url("${base64Image}");background-size: 260px 36%;background-repeat: no-repeat; }
  #${SogreyRecordHtmlRootId} ul li:nth-child(1) {background-color: #00aced;background-position: 20px 16px;  } 
  #${SogreyRecordHtmlRootId} ul li.stop:nth-child(1) {background-position: -78px 16px;  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(2) {background-color: #3b5998;transform: rotateY(-90deg);transform-origin: center right;background-position: -32px 16px;  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(3) {background-color: #00a300;transform: rotateY(-90deg);transform-origin: center right;background-position: -175px 16px;  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(4) {background-color: #1e7145;transform: rotateY(-90deg);transform-origin: center right;background-position: -128px 16px;  }
  #${SogreyRecordHtmlRootId} ul li:nth-child(5) {background-color: #ffc40d;transform: rotateY(-90deg);transform-origin: center right;background-position: -220px 16px;  }
  #${SogreyRecordHtmlRootId} ul li.show:nth-child(2) {transform: rotateY(0deg);  }
  #${SogreyRecordHtmlRootId} ul li.show:nth-child(3) {transform: rotateY(0deg);  }
  #${SogreyRecordHtmlRootId} ul li.show:nth-child(4) {transform: rotateY(0deg);  }
  #${SogreyRecordHtmlRootId} ul li.show:nth-child(5) {transform: rotateY(0deg);  }
  #${SogreyRecordHtmlRootId} ul li:hover {background-color: #339966;  }
  </style>
`;

    const html = `
  <ul>
<li></li>
<li></li>
<li></li>
<li></li>
<li></li>
  </ul>
`;

    root.innerHTML = style + html;

    document.body.appendChild(root);

    initEvent()
}

let EleRecording, ElePlay, EleSettings, EleDownload, EleGithub;

function initEvent() {
    EleRecording = document.querySelector(`#${SogreyRecordHtmlRootId} ul li:nth-child(1)`);
    ElePlay = document.querySelector(`#${SogreyRecordHtmlRootId} ul li:nth-child(2)`);
    EleSettings = document.querySelector(`#${SogreyRecordHtmlRootId} ul li:nth-child(3)`);
    EleDownload = document.querySelector(`#${SogreyRecordHtmlRootId} ul li:nth-child(4)`);
    EleGithub = document.querySelector(`#${SogreyRecordHtmlRootId} ul li:nth-child(5)`);

    addMethod(EleRecording, 'click', startRecord)
    addMethod(ElePlay, 'click', replay)
    addMethod(EleDownload, 'click', download)
    addMethod(EleSettings, 'click', function () {
        alert('敬请期待');
    })
    addMethod(EleGithub, 'click', function () {
        window.open('https://github.com/Sogrey/OneKeyJsTools', '_blank');
    })
}

let mediaRecorder;
var mediaStream //视频流
var videoBuffer = [] //保存的视频数据

// 初始化请求用户授权监控
function startRecord() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        alert("当前浏览器不支持屏幕捕捉。\n\n当您看到这个提示，极大可能是由于浏览器的安全策略限制，在以下几种情况中可以正常使用：\n 1. 地址为 localhost://\n 2. 地址为 https://\n 3. 本地文件访问 file:///");
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

    EleRecording.classList.add('stop')
    ElePlay.classList.remove('show');
    EleSettings.classList.remove('show');
    EleDownload.classList.remove('show');
    EleGithub.classList.remove('show');

    removeMethod(EleRecording, 'click', startRecord)
    addMethod(EleRecording, 'click', stop)
};

function reset() {
    stopRecord()
    const video = document.querySelector(`video#${SogreyRecordHtmlRootId}_preview`);
    if (video) {
        video.parentNode.removeChild(video);
    }
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

function stop() {
    stopRecord()
    ElePlay.classList.add('show');
    EleSettings.classList.add('show');
    EleDownload.classList.add('show');
    EleGithub.classList.add('show');

    EleRecording.classList.remove('stop')

    addMethod(EleRecording, 'click', startRecord)
    removeMethod(EleRecording, 'click', stop)
}

// 回放录制内容
function replay() {
    const video = document.createElement("video");
    document.body.append(video)
    const blob = new Blob(videoBuffer, { type: "video/webm" });
    video.id = SogreyRecordHtmlRootId + "_preview",
    video.onerror = function() {
        alert("播放出错了，可能因为安全策略，该域名拒绝从“blob”加载媒体！可正常下载后观看！");
        if (video) {
            video.parentNode.removeChild(video);
        }
    };
    video.src = window.URL.createObjectURL(blob);
    video.srcObject = null;
    video.controls = true;
    video.style.zIndex = 999999;
    video.style.position = 'fixed';
    video.style.bottom = '10px';
    video.style.left = '10px';
    video.style.width = '500px';
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

const base64Image = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ1IiBoZWlnaHQ9IjQxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KIDxnPgogIDx0aXRsZT5iYWNrZ3JvdW5kPC90aXRsZT4KICA8cmVjdCBmaWxsPSJub25lIiBpZD0iY2FudmFzX2JhY2tncm91bmQiIGhlaWdodD0iNDMiIHdpZHRoPSI1NDciIHk9Ii0xIiB4PSItMSIvPgogPC9nPgoKIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBpZD0ic3ZnXzEiIGZpbGw9IiNmZmZmZmYiIGQ9Im0yMS40Mjg1NywyMC4zNTcxNDFtLTIxLjQyODU3LDBhMjEuNDI4NTcsMjAuMzU3MTQgMCAxIDAgNDIuODU3MTM5LDBhMjEuNDI4NTcsMjAuMzU3MTQgMCAxIDAgLTQyLjg1NzEzOSwweiIgc3Ryb2tlPSJudWxsIi8+CiAgPHBhdGggaWQ9InN2Z18yIiBmaWxsPSIjZmZmZmZmIiBkPSJtNDUwLjcyMjEwNSwxNy40MzIwOTlsLTEuNTIwNjQxLC00LjM3NTE0NmE0LjM1MDE4NCwzLjkyMzczOSAwIDAgMCAtNS41NDM1OTgsLTIuNjIxNjEzbC0wLjY1NDQ1MywwLjE5MDk4YTMuMzQ5MjYsMy4wMjA5MzQgMCAwIDEgLTMuMDYwNTI3LC0wLjQ1MTQwM2wtMC4yMTE3MzUsLTAuMTM4ODk0YTMuMzg3NzUzLDMuMDU1NjU1IDAgMCAxIC0xLjMyODE1NiwtMi40ODI3MTlsMCwtMC40ODYxMjhhNC41NjE5MTgsNC4xMTQ3MTkgMCAwIDAgLTEuMzA4OTA3LC0yLjkxNjc2MWE0LjM1MDE4NCwzLjkyMzczOSAwIDAgMCAtMy4wNzk3NzYsLTEuMTYzMjMybC00LjkwODM5NCwwYTQuNDY1Njc2LDQuMDI3OTEyIDAgMCAwIC00LjQwNzkzMiw0LjA0NTI3MmwwLDAuNDE2NjgxYTMuNzM0MjI5LDMuMzY4MTY4IDAgMCAxIC0xLjQwNTE0OSwyLjYyMTYxM2wtMC4yNTAyMzQsMC4xNzM2MTVhMy43MTQ5OCwzLjM1MDgwMyAwIDAgMSAtMy40MjYyNTIsMC41MDM0ODlhNC4xMTkxOTksMy43MTUzOTggMCAwIDAgLTMuMjMzNzY3LDAuMjA4MzQxYTQuMTk2MTk4LDMuNzg0ODQ1IDAgMCAwIC0yLjE1NTg0NSwyLjMwOTEwNGwtMS41NzgzODUsNC41MTQwMzVhNC41MDQxNzUsNC4wNjI2MzMgMCAwIDAgMi44NDg3OTIsNS4xMDQzMzdsMC4zMDc5NzcsMGEzLjUyMjQ5NSwzLjE3NzE4OCAwIDAgMSAyLjE1NTg0NSwyLjExODEyNGwwLjExNTQ5MiwwLjI3Nzc4OGEzLjk2NTIxNCwzLjU3NjUwNCAwIDAgMSAtMC40NDI3MTksMy4yMjkyNzVhNC41NjE5MTgsNC4xMTQ3MTkgMCAwIDAgMC45NDMxODEsNS43MjkzNTRsMy45ODQ0NjMsMi43MjU3ODZhNC4zMzA5MzQsMy45MDYzNzggMCAwIDAgMi41OTg1NjQsMC43NDY1NTFhMy44NDk3MjIsMy40NzIzMzYgMCAwIDAgMC43NTA2OTYsMGE0LjMzMDkzNCwzLjkwNjM3OCAwIDAgMCAyLjgyOTU0MiwtMS43MzYxNjhsMC40NDI3MTksLTAuNTcyOTM2YTMuNDY0NzQ2LDMuMTI1MTAyIDAgMCAxIDIuNzUyNTUsLTEuMzM2ODQ3YTMuMzY4NTA0LDMuMDM4Mjk0IDAgMCAxIDIuODg3MjkxLDEuMzU0MjEzbDAuMjMwOTg0LDAuMjk1MTQ4YTQuMzExNjksMy44ODkwMTggMCAwIDAgNi4xOTgwNTIsMC45MjAxN2wzLjkwNzQ2NSwtMi42Mzg5NzhhNC41ODExNjgsNC4xMzIwOCAwIDAgMCAwLjk2MjQzLC01LjYwNzgyNmwtMC41MDA0NjIsLTAuNjU5NzQzYTMuODQ5NzIyLDMuNDcyMzM2IDAgMCAxIC0wLjQ2MTk2OCwtMi44NjQ2NzlhMy42Mzc5ODcsMy4yODEzNTYgMCAwIDEgMi4zMjkwOCwtMi4yMjIyOTdsMC4zODQ5NywtMC4xMjE1MzNhNC41NDI2NjksNC4wOTczNTkgMCAwIDAgMi44NDg3OTIsLTUuMDg2OTcxbDAuMDAwMDE2LDBsLTAuMDAwMDAxLC0wLjAwMDAwMnptLTE5LjAzNjg2OCw4Ljk5MzM1NGE2LjczNzAxMyw2LjA3NjU4OSAwIDEgMSA2LjczNzAxMywtNi4wNzY1ODlhNi43MzcwMTMsNi4wNzY1ODkgMCAwIDEgLTYuNzM3MDEzLDYuMDc2NTg5eiIgc3Ryb2tlPSJudWxsIi8+CiAgPGcgaWQ9InN2Z183IiBzdHJva2U9Im51bGwiPgogICA8cGF0aCBpZD0ic3ZnXzYiIGZpbGw9IiNmZmZmZmYiIGQ9Im01MjUuNTcwMTA5LDMyLjUzMzE1OGMwLjczNDMyOCwwIDEuNDY3NDIyLC0wLjM3NzU3MSAyLjIyNzQ5MiwtMS4xMzI3MTNjMC4yOTkxMjIsLTAuMjk3MTg0IDAuMjk5MTIyLC0wLjc3OTQ5OCAwLC0xLjA3NjY4MnMtMC43ODQ1ODksLTAuMjk3MTg0IC0xLjA4MzcxMSwwYy0wLjQ2NzA3OCwwLjQ2NTI2MyAtMC44NDIyMDgsMC42OTA1ODkgLTEuMTQzNzgxLDAuNjkwNTg5cy0wLjY3NjcwOSwtMC4yMjUzMjYgLTEuMTQzNzgxLC0wLjY5MDU4OWMtMC4yOTkxMjIsLTAuMjk3MTg0IC0wLjc4NDU4OSwtMC4yOTcxODQgLTEuMDgzNzExLDBzLTAuMjk5MTIyLDAuNzc5NDk4IDAsMS4wNzY2ODJjMC43NjAwNywwLjc1NTE0MiAxLjQ5MzE2OSwxLjEzMjcxMyAyLjIyNzQ5MiwxLjEzMjcxM3ptMTkuNjE0Njk5LC0xMS42NjIwNjJjMCwxLjg5ODgxNiAtMC4xNjMwNDksMy42MjEwMjUgLTAuNDkwMzY5LDUuMTY0MTkzcy0wLjc4NzA0LDIuODgyOTM0IC0xLjM3OTE1OSw0LjAxNjg2M3MtMS4zNDExNTgsMi4xMjc3OTIgLTIuMjQ3MTA5LDIuOTgxNTg3cy0xLjg5MDM2OCwxLjU1Nzc4NiAtMi45NTIwMTEsMi4xMTA3NDFjLTEuMDYyODcxLDAuNTUyOTU1IC0yLjI3Nzc1OSwxLjAwMTE2OCAtMy42NDcxMDksMS4zNDIyMDVzLTIuNzYxOTk4LDAuNTgwOTc0IC00LjE3NzkzLDAuNzE3Mzg1cy0yLjk3NjUzLDAuMjA0NjE5IC00LjY3OTMzMSwwLjIwNDYxOWMtMS43MDI4LDAgLTMuMjY1ODQ5LC0wLjA2ODIwOSAtNC42ODkxMzksLTAuMjA0NjE5cy0yLjgxOTYxMSwtMC4zNzUxMzIgLTQuMTg4OTYyLC0wLjcxNzM4NWMtMS4zNjkzNSwtMC4zNDEwMyAtMi41ODc5MTIsLTAuNzg5MjQzIC0zLjY1NjkxOCwtMS4zNDIyMDVzLTIuMDYwNzcsLTEuMjU2OTQ2IC0yLjk3Mjg1MSwtMi4xMTA3NDFjLTAuOTEyMDgyLC0wLjg1Mzc5NiAtMS42NjQ3OTksLTEuODQ3NjU4IC0yLjI1ODE0MSwtMi45ODE1ODdzLTEuMDU1NTE4LC0yLjQ3MjQ3OCAtMS4zODg5NjgsLTQuMDE2ODYzYy0wLjMzMzQ1LC0xLjU0NDM4NSAtMC41MDAxNzIsLTMuMjY1Mzc3IC0wLjUwMDE3MiwtNS4xNjQxOTNjMCwtMy40MDE3ODggMS4wNjI4NzEsLTYuMzMyMjIzIDMuMTg3Mzg5LC04Ljc5MTMwN2MtMC4xMjI1OTEsLTAuMzI3NjM2IC0wLjIyODAyLC0wLjcwMzk4NCAtMC4zMTYyODksLTEuMTI2NjI0cy0wLjE3NDA4LC0xLjAyMDY1OCAtMC4yNTQ5OSwtMS43OTI4NWMtMC4wODIxMzgsLTAuNzcyMTkyIC0wLjA1MTQ4OSwtMS42NjM3NDUgMC4wOTE5NDIsLTIuNjc0NjY0czAuNDExOTA5LC0yLjA0MjUzMyAwLjgwNjY1MiwtMy4wOTQ4NTlsMC4zMDY0OCwtMC4wNjIxMmMwLjIwNDcyOSwtMC4wNDE0MTMgMC41MzgxNzksLTAuMDI2Nzk2IDEuMDAxNTc4LDAuMDQxNDEzczEuMDA0MDI5LDAuMTkxMjE5IDEuNjI0MzQxLDAuMzY5MDQyczEuNDE5NjEyLDAuNTI5ODE2IDIuNDAwMzQ5LDEuMDU1OTgyczIuMDE1NDEsMS4xOTIzOTMgMy4xMDUyNTEsMS45OTg2ODZjMS44NTIzNjEsLTAuNTYwMjY3IDQuNDA1OTUxLC0xLjE0NjEwNyA3LjY2MTk5MSwtMS4xNDYxMDdzNS44MTU3NTksMC41ODU4NDYgNy42ODI4MzEsMS4xNDYxMDdjMS4wODk4NDEsLTAuODA2Mjk0IDIuMTI4MTk4LC0xLjQ2ODg3MSAzLjExNjI4OCwtMS45ODc3MjVzMS43Nzc1ODEsLTAuODc0NTAyIDIuMzY5NywtMS4wNjU3MjFjMC41OTIxMTksLTAuMTkxMjE5IDEuMTQxMzMsLTAuMzE0MjM1IDEuNjQ1MTgxLC0wLjM2OTA0MnMwLjgyNzQ5OCwtMC4wNzE4NTggMC45NzA5MjksLTAuMDUxMTUyYzAuMTQzNDMxLDAuMDIwNzA3IDAuMjQ4ODYxLDAuMDQzODQ2IDAuMzE2Mjg5LDAuMDcxODU4YzAuMzk0NzQ4LDEuMDUyMzI2IDAuNjY2OSwyLjA4Mzk0NiAwLjgxNzY4OSwzLjA5NDg1OXMwLjE4Mzg4OSwxLjg5ODgxNiAwLjEwMTc1MSwyLjY2MzY5N2MtMC4wODIxMzgsMC43NjQ4ODcgLTAuMTcwNDAxLDEuMzY2NTYxIC0wLjI2NjAyMiwxLjgwMzgxMnMtMC4yMDQ3MjksMC44MTIzODkgLTAuMzI3MzIsMS4xMjY2MjRjMi4xMjQ1MTksMi40NDU2ODIgMy4xODczODksNS4zNzYxMTggMy4xODczODksOC43OTEzMDdsLTAuMDAxMjI4LC0wLjAwMTIxN2wtMC4wMDAwMDIsMC4wMDAwMDF6bS01LjIzMDk5OCw0LjMzNDc1NGMwLC0yLjIwODE3OCAtMC44MTc2ODksLTQuMjEwNTIxIC0yLjQ1MTgzOSwtNi4wMDgyNDRjLTAuNDkwMzY5LC0wLjU0ODA4OSAtMS4wNTkxOTIsLTAuOTYzNDExIC0xLjcwNjQ3OSwtMS4yNDQ3NjdzLTEuMzgyODM4LC0wLjQ0MjEyNCAtMi4yMDY2NTIsLTAuNDc5ODgxcy0xLjYxMDg1OSwtMC4wMzA0NTIgLTIuMzU5ODkxLDAuMDIzMTRzLTEuNjc1ODMsMC4xMjU0NDkgLTIuNzc5MTU5LDAuMjE2Nzk4cy0yLjA1NzA5MSwwLjEzNzYyNyAtMi44NjAwNjksMC4xMzc2MjdjLTAuODAyOTc5LDAgLTEuNzU2NzQxLC0wLjA0NTA2MyAtMi44NjAwNjksLTAuMTM3NjI3cy0yLjAzMDEyMSwtMC4xNjMyMDYgLTIuNzc5MTU5LC0wLjIxNjc5OGMtMC43NDkwMzgsLTAuMDUzNTkxIC0xLjUzNjA3OCwtMC4wNjA4OTcgLTIuMzU5ODkxLC0wLjAyMzE0cy0xLjU2MzA0OCwwLjE5ODUzIC0yLjIxNjQ2LDAuNDc5ODgxYy0wLjY1MzQxMiwwLjI4MTM1IC0xLjIyNTkxOSwwLjY5NjY3OCAtMS43MTYyODgsMS4yNDQ3NjdjLTEuNjM0MTUsMS43OTc3MjMgLTIuNDUxODM5LDMuODAwMDY1IC0yLjQ1MTgzOSw2LjAwODI0NGMwLDEuMjk0NzAzIDAuMTM2MDc5LDIuNDQ4MTIyIDAuNDA4MjMsMy40NjE0NjhzMC42MTY2MzksMS44NjIyNzYgMS4wMzIyMjIsMi41NDY3NzZjMC40MTU1ODgsMC42ODU3MTcgMC45OTc4OTksMS4yNjQyNTEgMS43NDY5MzIsMS43MzY4MjZzMS40NzQ3OCwwLjgzNzk2MiAyLjE3NjAwOCwxLjA5NjE3MmMwLjcwMTIyOCwwLjI1ODIxMSAxLjYwNzE4LDAuNDYwMzkxIDIuNzE3ODYxLDAuNjA1MzNzMi4xMDQ5MDEsMC4yMzI2MzIgMi45ODI2NiwwLjI2MzA4M2MwLjg3ODk4MiwwLjAzMDQ1MiAxLjk4NDc2MSwwLjA0NjI4NiAzLjMxOTc4OSwwLjA0NjI4NnMyLjQzODM1MSwtMC4wMTU4MzQgMy4zMDk5OCwtMC4wNDYyODZjMC44NzE2MjksLTAuMDMwNDUyIDEuODYyMTcsLTAuMTE4MTQ0IDIuOTcyODUxLC0wLjI2MzA4M3MyLjAxNTQxLC0wLjM0NzExOSAyLjcxNzg2MSwtMC42MDUzM2MwLjcwMTIyOCwtMC4yNTk0MjcgMS40MjY5NywtMC42MjQ4MiAyLjE3NjAwOCwtMS4wOTYxNzJzMS4zMzEzNDksLTEuMDUxMTEgMS43NDY5MzIsLTEuNzM2ODI2YzAuNDE1NTg4LC0wLjY4NTcxNyAwLjc2MDA3LC0xLjUzNDY0IDEuMDMyMjIyLC0yLjU0Njc3NnMwLjQwODIzLC0yLjE2Njc2NSAwLjQwODIzLC0zLjQ2MTQ2OGwwLjAwMDAxMSwwbC0wLjAwMDAwMiwwem0tNC41NzYzNTIsLTEuMTk0ODI2YzAsLTIuMDE4MTc2IC0xLjA5NzE5OSwtMy42NTM5MDkgLTIuNDUxODM5LC0zLjY1MzkwOXMtMi40NTE4MzksMS42MzU3MzMgLTIuNDUxODM5LDMuNjUzOTA5czEuMDk3MTk5LDMuNjUzOTA5IDIuNDUxODM5LDMuNjUzOTA5czIuNDUxODM5LC0xLjYzNTczMyAyLjQ1MTgzOSwtMy42NTM5MDl6bS0xMC4xMzQ2NywxLjE5NDgyNmMwLC0yLjAxODE3NiAtMS4wOTcxOTksLTMuNjUzOTA5IC0yLjQ1MTgzOSwtMy42NTM5MDlzLTIuNDUxODM5LDEuNjM1NzMzIC0yLjQ1MTgzOSwzLjY1MzkwOXMxLjA5NzE5OSwzLjY1MzkwOSAyLjQ1MTgzOSwzLjY1MzkwOXMyLjQ1MTgzOSwtMS42MzU3MzMgMi40NTE4MzksLTMuNjUzOTA5eiIgc3Ryb2tlPSJudWxsIi8+CiAgPC9nPgogIDxnIGlkPSJzdmdfMTIiIHN0cm9rZT0ibnVsbCI+CiAgIDxwYXRoIGlkPSJzdmdfMTEiIGZpbGw9IiNmZmZmZmYiIGQ9Im0zMjEuOTQzMzgyLDMzLjY2MzU0M3EwLC0wLjYwMDI1IDAuNDU2NDY5LC0xLjA0MDA4N3QxLjA4MjU5NywtMC40Mzg1NDN0MS4wODI1OTcsMC40Mzg1NDN0MC40NTY0NjksMS4wNDAwODd0LTAuNDU2NDY5LDEuMDQwMDg3dC0xLjA4MjU5NywwLjQzODU0M3QtMS4wODI1OTcsLTAuNDM4NTQzdC0wLjQ1NjQ2OSwtMS4wNDAwODd6bS02LjE1NjI1MiwwcTAsLTAuNjAwMjUgMC40NTY0NjksLTEuMDQwMDg3dDEuMDgyNTk3LC0wLjQzODU0M3QxLjA4MjU5NywwLjQzODU0M3QwLjQ1NjQ2OSwxLjA0MDA4N3QtMC40NTY0NjksMS4wNDAwODd0LTEuMDgyNTk3LDAuNDM4NTQzdC0xLjA4MjU5NywtMC40Mzg1NDN0LTAuNDU2NDY5LC0xLjA0MDA4N3ptLTMuMDc2Nzc5LC01LjE3NDU2OGwwLDcuMzkxODcxcTAsMC45MjM2NTggMC42NzMyNTksMS41NzA0ODF0MS42MzQ2NjMsMC42NDY4MjJsMzUuMzk0NDIzLDBxMC45NjE0MTEsMCAxLjYzNDY2MywtMC42NDY4MjJ0MC42NzMyNTksLTEuNTcwNDgxbDAsLTcuMzkxODcxcTAsLTAuOTIzNjU4IC0wLjY3MzI1OSwtMS41NzA0ODF0LTEuNjM0NjYzLC0wLjY0NjgyMmwtMTEuMTgxNDQxLDBsLTMuMjQ2NDQ0LDMuMTQyMjU2cS0xLjM5NDk4NCwxLjI5MzY0NSAtMy4yNzA2OCwxLjI5MzY0NXQtMy4yNzA2OCwtMS4yOTM2NDVsLTMuMjcwNjgsLTMuMTQyMjU2bC0xMS4xNTcxOTksMHEtMC45NjE0MTEsMCAtMS42MzQ2NjMsMC42NDY4MjJ0LTAuNjczMjU5LDEuNTcwNDgxbDAuMDAyNjk0LDBsMC4wMDAwMDcsMHptNy44MTM4MTEsLTEzLjE0NDY5NXEtMC40MDkzMzgsMC45NDY5NDcgMC4zMzY2MywxLjYxNzA1M2wxMC43NzIwOTcsMTAuMzQ5MTM3cTAuNDMyMjMzLDAuNDM4NTQzIDEuMDgyNTk3LDAuNDM4NTQzdDEuMDgyNTk3LC0wLjQzODU0M2wxMC43NzIwOTcsLTEwLjM0OTEzN3EwLjc0NTk2NywtMC42NzAxMDYgMC4zMzY2MywtMS42MTcwNTNxLTAuNDA5MzM4LC0wLjkwMDM3NCAtMS40MTkyMjcsLTAuOTAwMzc0bC02LjE1NDkwNSwwbDAsLTEwLjM0OTEzN3EwLC0wLjYwMDI1IC0wLjQ1NjQ2OSwtMS4wNDAwODd0LTEuMDgyNTk3LC0wLjQzODU0M2wtNi4xNTQ5MDUsMHEtMC42MjQ3ODEsMCAtMS4wODI1OTcsMC40Mzg1NDN0LTAuNDU2NDY5LDEuMDQwMDg3bDAsMTAuMzQ5MTM3bC02LjE1NDkwNSwwcS0xLjAwOTg4MiwwIC0xLjQxOTIyNywwLjkwMDM3NGwtMC4wMDEzNDcsMHoiIHN0cm9rZT0ibnVsbCIvPgogIDwvZz4KICA8ZyBpZD0ic3ZnXzE3IiBzdHJva2U9Im51bGwiPgogICA8cGF0aCBpZD0ic3ZnXzE2IiBmaWxsPSIjZmZmZmZmIiBkPSJtMjExLjAwNjE1OSwzNi4zMzg5NjRjMCwwLjc5NDU2OSAwLjY0NDM5OSwxLjQ1MjkxNCAxLjQyMjEzNiwxLjQ1MjkxNGwzMS4yODY1MDksMGMwLjc3NzczNywwIDEuNDIyMTM2LC0wLjY1ODM0NiAxLjQyMjEzNiwtMS40NTI5MTRsMCwtMzEuOTYzNjQ0YzAsLTAuNzk0NTY5IC0wLjY0NDM5OSwtMS40NTI5MTQgLTEuNDIyMTM2LC0xLjQ1MjkxNGwtMzEuMjg2NTA5LDBjLTAuNzc3NzM3LDAgLTEuNDIyMTM2LDAuNjU4MzQ2IC0xLjQyMjEzNiwxLjQ1MjkxNGwwLDMxLjk2MzY0NHoiIHN0cm9rZT0ibnVsbCIvPgogIDwvZz4KICA8ZyBpZD0ic3ZnXzIyIiBzdHJva2U9Im51bGwiPgogICA8cGF0aCBpZD0ic3ZnXzIxIiBmaWxsPSIjZmZmZmZmIiBkPSJtMTQ4LjU5MDkxOSwxOC4xNDUwMmwtMjkuMzU4NDI2LC0xNS44NjkxOGMtMC4zNTczMTEsLTAuMTkzMDggLTAuNzI3NTM3LC0wLjMwNzA4OSAtMS4xNDkzNjcsLTAuMzA3MDg5Yy0xLjE1MDM2LDAgLTIuMDg4MzA2LDAuODYyNDE5IC0yLjA4ODMwNiwxLjkxNTE1bC0wLjAxMDkxOSwwbDAsMzIuOTQ2NDc5bDAuMDA5OTI1LDBjMCwxLjA1MjczOSAwLjkzOTk0MiwxLjkxNTE1IDIuMDg5MywxLjkxNTE1YzAuNDMyNzQ5LDAgMC43OTEwNTMsLTAuMTM0MjM5IDEuMTgxMTI5LC0wLjMyNTQ3MWwyOS4zMjc2NTYsLTE1Ljg1MDc5YTMuMDc1ODg4LDIuODQ5MjggMCAwIDAgMS4xMzg0NDgsLTIuMjEyMTIxYzAsLTAuODkwOTE5IC0wLjQ0MjY3NCwtMS42NzYxIC0xLjEzOTQ0MSwtMi4yMTIxMjFsMCwtMC4wMDAwMDhsMC4wMDAwMDEsMC4wMDAwMDF6IiBzdHJva2U9Im51bGwiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg==";

initHtmlElements();