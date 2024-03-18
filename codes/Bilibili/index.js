/**
 * B站 (https://www.bilibili.com) 
 * 
 * https://www.bilibili.com/video/{BV号}
 * 
 * 示例页面：
 *   https://www.bilibili.com/video/BV14K411J7v2
 *   https://www.bilibili.com/video/BV14K411J7v2/?p=5&spm_id_from=pageDriver&vd_source=96276a0eadd5914be7e81924f0535ab3
 */
/**title:B站-获取视频信息**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

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

/** main */

var BilibiliVideoHostWWW = "https://www.bilibili.com/video/";
var BilibiliVideoHost = "https://bilibili.com/video/";

var regBilibiliVideoHostWWW = /https:\/\/www\.bilibili\.com\/video\//g;
var regBilibiliVideoHost = /https:\/\/bilibili\.com\/video\//g;

if (regBilibiliVideoHostWWW.test(document.location.href) || regBilibiliVideoHost.test(document.location.href)) {
    console.log('ok');


    // window.open(__INITIAL_STATE__.epInfo? __INITIAL_STATE__.epInfo.cover : __INITIAL_STATE__.videoData.pic);
    // 视频信息
    // __INITIAL_STATE__.videoData 

    // player 播放器对象，控制播放器

    console.log(__INITIAL_STATE__.epInfo ? __INITIAL_STATE__.epInfo : __INITIAL_STATE__.videoData)


    var result;
    if (__INITIAL_STATE__.epInfo) {
        // TODO
        console.log("\/\/ TODO epInfo 待实现");
    }
    if (__INITIAL_STATE__.videoData) {
        var videoData = __INITIAL_STATE__.videoData;
        console.log("视频标题", videoData.title);
        console.log("视频描述", videoData.desc);
        console.log("视频封面", videoData.pic);

        console.log("视频标签", videoData.dynamic);

        console.log("作者昵称", videoData.owner.name);
        console.log("作者id", videoData.owner.mid);
        console.log("作者头像", videoData.owner.face);

        console.log("视频数目", videoData.videos);
        console.log("当前视频bvid", videoData.embedPlayer.bvid);
        console.log("当前视频aid", videoData.embedPlayer.aid);
        console.log("当前视频cid", videoData.embedPlayer.cid);
        console.log("当前视频为第几集", videoData.embedPlayer.p);

        result = {
            title: videoData.title,
            desc: videoData.desc,
            pic: videoData.pic,

            dynamic: videoData.dynamic,

            owner: {
                name: videoData.owner.name,
                mid: videoData.owner.mid,
                face: videoData.owner.face,
            },

            videos: videoData.videos,
            bvid: videoData.embedPlayer.bvid,
            aid: videoData.embedPlayer.aid,
            cid: videoData.embedPlayer.cid,
            p: videoData.embedPlayer.p,
        }

        var pages = videoData.pages;
        var pagesInfo = [];

        if (pages.length > 0) {
            pages.forEach(function (page) {
                pagesInfo.push({
                    page: page.page,
                    cid: page.cid,
                    title: page.part,
                    duration: page.duration,
                    size: `${page.dimension.width}x${page.dimension.height}`,

                    // https://www.bilibili.com/video/BV14K411J7v2/?p=6
                    weblink: `${BilibiliVideoHostWWW}${videoData.embedPlayer.bvid}/?p=${page.page}`
                })
            });

            console.table(pagesInfo);

            result.pages = pagesInfo;
        }

        console.log(result);
    }
} else {
    alert(`此插件仅支持 ${BilibiliVideoHostWWW} 和 ${BilibiliVideoHost}`);
}