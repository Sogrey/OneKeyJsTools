/**
 * QQ邮箱 (https://mail.qq.com/) 清空邮箱
 * 
 * 注意：临时用的脚本,逻辑也并不严谨。
 * QQ邮箱开始扩容收费了，邮箱里有很多订阅邮件无关紧要，特写此脚本清空邮箱，慎用！！！
 */
/**title:QQ邮箱-清空邮箱**/ // <--- 此行必需，不得缺失
/**version:1.0.0**/ // <--- 版本号

/** tools */
var getElement = function (eleId, iframe) {
    if (!iframe)
        return document.querySelector(eleId);
    else
        return iframe.querySelector(eleId);
}
var getElementAll = function (eleId, iframe) {
    if (!iframe)
        return document.querySelectorAll(eleId);
    else
        return iframe.querySelectorAll(eleId);
}
var displayNoneElements = function (eles) {
    if (eles && eles.length > 0) {
        eles.forEach(item => item.style.display = 'none');
    }
}

var mainFrameContainer = getElement("#mainFrameContainer");


function deleteAPage() {
    if (!mainFrameContainer) return;
    var iframe = mainFrameContainer.querySelector("iframe");
    var iframeDocument = iframe.contentWindow.document;
    var emailNumStrong = getElement("#_ut_c",iframeDocument);
    if (emailNumStrong) {
        var emailNum = Number(emailNumStrong.innerText);
        if (emailNum > 0) {

            console.log(emailNum)

            clickBtn("#ckb_selectAll",iframeDocument)
                .then(clickBtn("#quick_completelydel",iframeDocument))
                .then(clickBtn("#QMconfirm_QMDialog_confirm",undefined,1000))
                .then(() => {
                    setTimeout(function () {
                        deleteAPage()
                    }, 3000);
                })

        } else {
            console.log("已清空.");
        }
    }

}

function clickBtn(eleId, iframe, timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var btn = getElement(eleId, iframe);
            if (btn) {
                btn.click();
            }
            resolve();
        }, timeout||500);
    })
}

deleteAPage();
