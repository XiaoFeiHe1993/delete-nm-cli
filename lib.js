const fs = require('fs')
const chalk = require('chalk')

/**
 * 开始查找当前目录下面node_modules
 * @param {function} callback 
 */
function startFindFile(path, callback) {
  const files = fs.readdirSync(path)
  if (files && files.length > 0) {
    // 当前目录
    startDeleteFile(path)
    // 子目录
    files.forEach((item) => {
      startDeleteFile(path + '\\' + item)
    })
    callback && callback()
  } else {
    callback && callback()
  }
}

/**
 * 开始删除文件夹
 * @param {string} path 
 */
function startDeleteFile(path) {
  const subPath = `${path}\\node_modules`
  if (!fs.existsSync(path)) {
    return
  }
  const stat = fs.statSync(path) // 要检查是否为文件夹，需获取stat对象
  if (stat && stat.isDirectory() && fs.existsSync(subPath)) {
    const dir = fs.statSync(subPath)
    if (dir && dir.isDirectory()) {
      console.log(chalk.red('开始删除：' + subPath))
      deleteFolder(subPath)
      console.log(chalk.red('成功删除：' + subPath))
    }
  }
  if (fs.existsSync(`${path}\\packages`)) { // 如果存在packages目录
    startFindFile(`${path}\\packages`)
  }
}

/**
 * @description 删除文件夹
 * @param {string} path 
 */
function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      const curPath = path + '/' + file
      if (fs.existsSync(curPath)) {
        try {
          if (fs.statSync(curPath).isDirectory()) {
            deleteFolder(curPath)
          } else {
            fs.unlinkSync(curPath)
          }
        } catch (error) {
          fs.unlinkSync(curPath)
        }
      }
    })
    fs.rmdirSync(path)
  }
}

module.exports = {
  startFindFile,
}
