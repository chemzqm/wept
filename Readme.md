# WEPT (Wechat app page development tool)

[![NPM version](https://img.shields.io/npm/v/wept.svg?style=flat-square)](https://www.npmjs.com/package/wept)
[![Dependency Status](https://img.shields.io/david/chemzqm/wept.svg?style=flat-square)](https://david-dm.org/chemzqm/wept)
[![Downloads](https://img.shields.io/npm/dm/wept.svg?style=flat-square)](https://img.shields.io/npm/dm/wept.svg)

WEPT 是一个微信小程序实时开发环境，它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。

项目后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service
层和控制层之间的相关通讯逻辑。

目前已支持 [所有小程序 API](https://github.com/chemzqm/wept/wiki/API-%E6%8E%A5%E5%8F%A3%E5%AE%9E%E7%8E%B0%E7%8A%B6%E6%80%81)，
支持 Mac 和 Win7 上正常使用。

详细原理介绍参考：

* [微信小程序架构分析（上）](https://zhuanlan.zhihu.com/p/22754296)
* [微信小程序架构分析（中）](https://zhuanlan.zhihu.com/p/22765476)
* [微信小程序架构分析（下）](https://zhuanlan.zhihu.com/p/22932309)

[更新日志](https://github.com/chemzqm/wept/blob/master/history.md)

[小程序开发小 tips](https://github.com/chemzqm/wept/wiki/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91%E5%B0%8F-tips)

## 主要特性

* 支持 wxml, wxss, javascript 和页面 json 自动热更新（不刷新页面）
* 使用系统 notification 更早的提示构建和请求错误
* 使用后台转发 XMLHttpRequest 请求，无需配置 CORS
* 支持全部公开 API 接口，部分为模拟返回
* 可使用 Chrome 移动页面调试，可在移动端体验
* 无需网络连接

![one](https://cloud.githubusercontent.com/assets/251450/19413094/f46273d6-9356-11e6-9216-06ef2e2e3888.gif)

## 安装 & 使用方法

下载安装 [nodejs](https://nodejs.org), 请确保 node 版本 `> 1.0`， 执行：
    
    # 可能需要 sudo
    npm install wept -g

如安装较慢，可使用 [cnpm](http://npm.taobao.org/)

到小程序项目根目录下执行命令：

    wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

使用 `wept -h` 命令查看更多选项。

## 更新 WEPT

    npm install wept@latest -g

## 感谢

[匠物](https://www.jiangwoo.com/) 对于本工具开发给予的大力支持❤️

* [lizzyliuye](https://github.com/lizzyliuye) 帮忙测试反馈
* [davedavehong](https://github.com/davedavehong) 反馈 windows 上的严重 bug
* [f111fei](https://github.com/f111fei) 贡献 PR

## LICENSE

Copyright 2016 chemzqm@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
