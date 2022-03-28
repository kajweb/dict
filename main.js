// 该脚本功能：
// 读取 /book/*.json 的内容生成 /book-txt/*.txt 文件
// 2022-03-28


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
