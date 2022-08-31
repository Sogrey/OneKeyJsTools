/**
 * 163邮箱 (https://mail.163.com/) 清空邮箱
 * 
 * 注意：临时用的脚本,逻辑也并不严谨。
 * 163邮箱满了，新邮件无法接收，邮箱里基本都是订阅邮件无关紧要，特写此脚本清空邮箱，慎用！！！
 */
/**title:163邮箱-清空邮箱**/ // <--- 此行必需，不得缺失
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

var emailNumStrong = getElement('.nui-title-tips.nui-txt-tips>.nui-txt-link.js-component-link>strong');

function deleteAPage() {
    if(emailNumStrong){
        var emailNum = Number(emailNumStrong.innerText);
        if(emailNum>0){
            var checkbox =  getElement('.js-component-toolbar.nui-toolbar>.nui-toolbar-item:nth-child(1) b.nui-ico-checkbox');
            var deleteBtn =  getElement('.js-component-toolbar.nui-toolbar>.nui-toolbar-item:nth-child(2)>.js-component-button.nui-btn ');
            if(checkbox){
                checkbox.click();
            }
            if(deleteBtn){
                deleteBtn.click();
            }
            
            setTimeout(function (){
                deleteAPage()
            }, 3000);   
            
        }else{
            console.log("已清空.");
        }
    }
     
}

deleteAPage();
