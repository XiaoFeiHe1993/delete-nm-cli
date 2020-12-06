#!/usr/bin/env node

const pkg = require('./package.json')
const { Command } = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const tool = require("./lib")

const program = new Command()
const spinner = ora('查找中...')

program.usage('[command] [options]').version(pkg.version, '-V')

program.on('--help', () => {})

program
  .command('delete')
  .description('删除当前目录以及子目录所有node_modules')
  .action(() => {
    console.log(chalk.blue('开始查找node_modules目录'))
    // spinner.start()
    tool.startFindFile(function() {
      // spinner.stop()
      console.log(chalk.green('成功删除所有node_modules目录'))
    })
  })

program.parse(process.argv)
