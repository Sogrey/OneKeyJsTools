/**
 * 163邮箱 (https://mail.163.com/) 清空邮箱
 * 
 * 注意：临时用的脚本,逻辑也并不严谨。
 * 163邮箱满了，新邮件无法接收，邮箱里基本都是订阅邮件无关紧要，特写此脚本清空邮箱，慎用！！！
 */
/**title:163邮箱-清空邮箱**/ // <--- 此行必需，不得缺失
/**version:1.1.0**/ // <--- 版本号

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

// 监听所有点击事件，并在控制台打印被点击的元素
// document.addEventListener('click', (e) => {
//     console.log(e.target);
// });

// 定义坐标
//   const x = 10;
//   const y = 10;

// 创建一个点击事件
const click = (x, y) => {
    const ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'screenX': x,
        'screenY': y
    });

    // 获取指定坐标上的元素
    const el = document.elementFromPoint(x, y);

    // 分发点击事件
    el.dispatchEvent(ev);
};

// 调用点击函数
//   click(x, y);

var emailNumStrong = getElement('.nui-title-tips.nui-txt-tips>.nui-txt-link.js-component-link>strong');

var rect;

function deleteAPage () {
    if (emailNumStrong) {
        var emailNum = Number(emailNumStrong.innerText);
        if (emailNum > 0) {
            var checkbox = getElement('.js-component-toolbar.nui-toolbar>.nui-toolbar-item:nth-child(1) b.nui-ico-checkbox');
            var deleteBtn = getElement('.js-component-toolbar.nui-toolbar>.nui-toolbar-item:nth-child(2)>.js-component-button.nui-btn');
            var rect1 = checkbox.getBoundingClientRect();
            var rect2 = deleteBtn.getBoundingClientRect();
            var msgbox = getElement('.js-component-msgbox.nui-msgbox.nui-msgbox-confirm')

            if (checkbox) {
                click(rect1.x + 2, rect1.y + 2);
                // checkbox.click();
            }

            setTimeout(function () {
                if (deleteBtn) {
                    click(rect2.x + 5, rect2.y + 5);
                    // deleteBtn.click();
                }

                if (msgbox) {
                    var okButton = getElement('.js-component-msgbox.nui-msgbox.nui-msgbox-confirm .js-component-button.nui-mainBtn.nui-btn>span')
                    if (okButton) {
                        rect = okButton.getBoundingClientRect();
                        click(rect.x + 5, rect.y + 5);
                        // okButton.click();
                    }
                    setTimeout(function () {
                        deleteAPage()
                    }, 1000);

                } else {
                    setTimeout(function () {
                        deleteAPage()
                    }, 1000);
                }
            }, 1000);

        } else {
            console.log("已清空.");
        }
    }

}

deleteAPage();
