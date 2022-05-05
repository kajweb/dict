/**
 * 网友提供
 * 读取 /book/*.json 的内容生成 /book-txt/*.txt 文件
 * @author KyleBing
 * @Date 2022-03-28
 * @Link https://github.com/KyleBing/dict/blob/dd5176be515631be901ed3d1e943a316dd5489af/main.js
 */

/**
    单词释义 TXT 文件
    为了方便一些需要使用 txt 的用户，新建这样一个 txt 目录。

    该文件夹中的 .txt 内容是根据 /book/ 文件夹中 .json 生成的。
    是由项目根目录中的 nodejs 脚本 main.js 生成的。

    一、文本生成规则
    取每个单词的 .headWord 和 .content.word.content.trans 内容，生成规则是：

    单词 \t 词性 + 释义

    如，CET4luan_1.txt 的内容是这样的：

    access   v. 获取 n. 接近，入口
    project  n. 工程；课题、作业
    intention    n. 打算，意图
    equivalence  n. 等值，相等
    negotiate    v. 谈判，协商，交涉
    disappointing    adj. 令人失望的
    alternative  n. 代替品
    generous     adj. 慷慨的
    biological   adj. 生物的
    strategy     n. 策略，战略
    paradox  n. 悖论；自相矛盾
    primary  adj. 主要的，基本的
    二、自动生成 txt
    需要已安装 nodejs

    解压所有的 /book/*.zip 文件到原目录，变成 /book/*.json
    根目录中新建 /book-txt/ 文件夹
    在根目录中执行 node main.js 即可自动生成对应的 txt 文件到 /book/txt 文件夹，再执行一遍会覆盖原有的 txt 文件
 */

const fs = require('fs')
const path = require("path")

const sourceFolderName = 'book' // 源目录名
const destFolderName = 'book-txt' // 目标目录名


// 读取配置目录中的所有码表文件
function getJsonFileList(){
    let fileList = []
    let folderPath = path.resolve(sourceFolderName)
    fs.readdir(folderPath, (err, filePaths) => {
        if (err) {
            console.log(err)
            return []
        } else {
            // 匹配获取上面提前定义的文件名
            fileList = filePaths.filter(item => {
                return item.indexOf('.json') > 0
            })
            processFileAndSaveIt(fileList)
        }
    })
}

// 读取文件 从硬盘
function readFileFromDisk(filename){
    let filePath = path.resolve(sourceFolderName, filename)
    console.log(filePath)
    try {
        return fs.readFileSync(filePath, {encoding: 'utf-8'})
    } catch (e) {
        return false
    }
}

// 对数组内的文件进行处理并保存成文件
function processFileAndSaveIt(fileList){
    fileList.forEach(fileName => {
        writeFile(fileName)
    })
}



// 写入文件
function writeFile(fileName){
    let fileContent = readFileFromDisk(fileName)
    fileContent = '[' +  fileContent + ']'
    fileContent = fileContent.replaceAll(/}\r\n/g, '},\n')
    fileContent = fileContent.replaceAll(/},\n\]/g, '}]\n')

    let fileJsonObj = JSON.parse(fileContent)
    let fileNameWithoutExt = path.basename(fileName, '.json')


    let fileString = ''
    fileJsonObj.forEach(item => {
        fileString = fileString + `${item.headWord}\t${getTrans(item.content.word.content.trans)}` + '\n'
    })

    fs.writeFile(
        path.resolve(destFolderName, `${fileNameWithoutExt}.txt`),
        fileString,
        {encoding: 'utf-8'},
        err => {
            if (err) {
                log(err)
            } else {
                console.log('save file success')
            }
        })
}

// 从 json 中获取单词和释义
function getTrans(trans){
    let str = ''
    trans.forEach(item => {
        str = str + ` ${item.pos? item.pos + '. ':''}${item.tranCn}`
    })
    return str
}


// 执行
getJsonFileList()

// TEST
// writeFile('test.json')
// writeFile('WaiYanSheChuZhong_6.json')
// console.log(readFileFromDisk('WaiYanSheChuZhong_6.json'))
