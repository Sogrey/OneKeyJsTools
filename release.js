#!/usr/bin/env node

var path = require("path");
var fs = require('fs');
var exec = require('child_process').exec;

var JavaScriptObfuscator = require('javascript-obfuscator');
var UglifyJS = require("uglify-js");


String.prototype.endWith = function (endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}

function formatDuring(mss) {
    var seconds = (mss % (1000 * 60)) / 1000;
    return seconds;
}

// 读取一个文件，压缩之
function buildOne(flieIn, fileOut) {
    var origCode = fs.readFileSync(flieIn, 'utf8');

    var regTitle = /(?<=\/\*\*title:).*(?=\*\*\/)/;
    var regVersion = /(?<=\/\*\*version:).*(?=\*\*\/)/; /**version:1.0.1**/
    // var result = reg.exec("/**title:简书-阅读模式**/");
    var resultTitle = regTitle.exec(origCode);
    var title = resultTitle[0];
    var resultVersion = regVersion.exec(origCode);
    var version = resultVersion ? resultVersion[0] : "";
    var name = `/**title:${title}**/`;
    if (version && version.length > 0) {
        name = `/**title:${title}@${version}**/`;
    }

    console.log('正在压缩', title, flieIn);

    var options = {
        warnings: true,
        mangle: true,
        compress: {},
        mangle: true,
    };

    var time = new Date().getTime();

    var result = UglifyJS.minify(origCode, options);
    if (result.error)
        console.log('error', flieIn, result.error); // runtime error, or `undefined` if no error
    if (result.warnings)
        console.log('result.warnings', flieIn, result.warnings); // [ 'Dropping unused variable u [0:1,18]' ]
    // console.log(result.code);  

    var CONSOLE_BADGE = 'console.log("\\n %c ' + title + ' %c '+version+' %c @Sogrey \\n\\n","color: #fadfa3; background: #030307; padding:5px 0;","color: #fa00fa; background: #030307; padding:5px 0;","background: #c58c0f; padding:5px 0;");';

    const data = CONSOLE_BADGE + result.code;
    var obfuscationOptions = {
        compact: true,
        // controlFlowFlattening: true,
        // controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        shuffleStringArray: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArrayThreshold: 1,
        // debugProtection: true,
        // debugProtectionInterval: true
    };

    var obfuscationResult = JavaScriptObfuscator.obfuscate(data, obfuscationOptions);

    // console.log(obfuscationResult.getObfuscatedCode());

    var content = obfuscationResult.getObfuscatedCode();

    fs.writeFileSync(fileOut, name + content, 'utf8');
    console.log('压缩完成，用时 ', formatDuring(new Date().getTime() - time), '=>', fileOut);
}

function readFileList(dir, sourceFilesList = [], minFilesList = []) {
    const files = fs.readdirSync(dir);
    // console.log("files", files);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), sourceFilesList, minFilesList); //递归读取文件
        } else {
            if (fullPath.endsWith('.min.js')) {
                minFilesList.push(fullPath);
            } else if (fullPath.endsWith('.js')) {
                sourceFilesList.push(fullPath);
            }
        }
    });
}

var sourceFilesList = [];
var minFilesList = [];
readFileList(__dirname + "/codes/", sourceFilesList, minFilesList);
// console.log("source", sourceFilesList);
// console.log("min", minFilesList);
console.log("找到源文件", sourceFilesList.length, '个', sourceFilesList, '\n');

if (sourceFilesList.length > 0)
    for (let i = 0; i < sourceFilesList.length; i++) {
        const path = sourceFilesList[i];
        var minPath = path.substr(0, path.length - 2) + "min.js";
        buildOne(path, minPath);
    }