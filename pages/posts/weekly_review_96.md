---
title: "周报 #96 - 基于 Roo Code/Cursor 的 iOS 开发工作流"
date: 2025-05-20T09:35:00.000+0800
lang: zh
duration: 6min
---

## 前言

![weekly_review_96_new](https://image.pseudoyu.com/images/weekly_review_96_new.png)

本篇是对 `2025-05-13` 到 `2025-05-18` 这周生活的记录与思考。

记录一下学习 iOS/SwiftUI 开发的一些资源和基于 Roo Code 与 Cursor 的 iOS 开发环境搭建和工作流。

## iOS/SwiftUI 开发

### 学习资源

最近工作中有涉及一些 iOS 相关的开发，虽然之前做「[TheWan App](https://apps.apple.com/cn/app/thewan/id6670795669)」的时候也是用的 SwiftUI，但因为是很个人的项目，基本上就是完成了功能，并没有追求什么最佳实践。所以这次就趁着五一重新补充了一下基础知识。

- [Apple - SwiftUI](https://developer.apple.com/cn/documentation/swiftui/)，官方文档。
- [Apple - SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui/)，Apple 官方也有一个交互式的 SwiftUI 教程，关于布局、动画相关的相关概念会更加形象。
- [SwiftUI 新手入門課程](https://www.youtube.com/playlist?list=PLXM8k1EWy5khONZ9M9ytK8mMrcEOXvGsE)，ChaoCode 的入门教程应该算是最简洁易懂的教程了，难度不高但是讲解得很清晰，看完后基本上就能做一些小项目了。
- [CS193p - Developing Apps for iOS](https://cs193p.stanford.edu/2023)，Standford 的一门很经典的 iOS 开发课程，2023 年的课程也转向了 SwiftUI，质量很高，看完后能更多理解 MVVM 设计模式和一些更底层的概念。
- [肘子的 Swift 记事本](https://fatbobman.com/zh/)，有很多精品的文章，关于 Swift Data 的最佳实践我都是参考的他的博文。
- [13 的 iOS Developer+](https://iosdeveloper.plus/)，平时有看他的 Newsletter，他也正在连载 SwiftUI 的教程，在考虑学习深入一点之后订阅学习。

搜索一些具体的概念、实践时可以直接 Google 搜索，能查到一些 medium 或其他平台上的文章，参差不齐，不过目前还是比 LLMs 生成的答案靠谱多了，唯一需要注意的就是甄别一下时效性，很多老版本的实践可能并不适用。

### 开发环境搭建

![xcode_completion](https://image.pseudoyu.com/images/xcode_completion.png)

支持 Apple Intelligence 的 macOS 会有一个内置的 Predictive code completion，会下载一个 2.5G 左右的本地模型，在没网的时候可以使用。

![xcode_copilot](https://image.pseudoyu.com/images/xcode_copilot.png)

但比起这个本地模型，GitHub Copilot 为 Xcode 提供的官方插件更强大，使用起来除了补全，也有一个 Chat 栏，可以很方便地指定 Xcode 中正在打开的一些文件进行提问，也支持 Claude 3.7 Sonnet Thinking 等最新模型，不过目前还没提供和 VS Code 中类似的 Agents 功能。

但习惯了 Cursor 的 Agents 模式后，仅仅通过 Xcode 中的 Chat 辅助开发已经有些不够用了，好在 Cursor/VS Code 也通过一些插件对 SwiftUI 提供了一些支持 ——

- [iOS & macOS (Swift)](https://docs.cursor.com/guides/languages/swift)

首先是安装一些命令行工具:

- [xcode-build-server](https://github.com/SolaWing/xcode-build-server)
- [xcbeautify](https://github.com/cpisciotta/xcbeautify)
- [swiftformat](https://github.com/nicklockwood/SwiftFormat)

可以通过 brew 一键安装或在上述 GitHub Repo 中分别安装

```bash
brew install xcode-build-server xcbeautify swiftformat
```

Cursor/VS Code 中需要安装两个插件：

- [Swift](https://marketplace.cursorapi.com/items?itemName=swiftlang.swift-vscode)
- [SweetPad](https://marketplace.cursorapi.com/items?itemName=sweetpad.sweetpad)

上述依赖都安装完成后

1. 使用 Cursor 打开项目，需要与 `xx.xcodeproj` 同级目录
2. 按 `Cmd + Shift + P` 调出命令面板，输入/检索 `Sweetpad: Generate Build Server Config`，选择当前项目
3. 稍等片刻，会在当前项目根目录下生成一个 `buildServer.json` 文件

![cursor_sweetpad](https://image.pseudoyu.com/images/cursor_sweetpad.png)

点开 🍬 图标的侧边栏插件，在项目对应的 schema 上点击 build，选中模拟型或是已连接的实机，会自动编译并运行，就可以实现完全不打开 Xcode 也能进行开发了。

现在再点开所有的代码文件，也不会再出现 imports 错误等一片红的报错，所以再使用 Cursor/Roo Code Agent 进行开发时，也会更准确。

### 基于 Roo Code + Cursor 的开发工作流

![swift_cursor_roocode](https://image.pseudoyu.com/images/swift_cursor_roocode.png)

在 iOS 开发过程中，或许是因为上下文长度和模型语料的原因，我发现通过 Roo Code 插件配合 `gemini-2.5-pro-preview-05-06` 模型在一些更大的功能模块拆分、重构等场景下效果显著好于前者（当然，按量计费 token 消耗也夸张很多）。

所以我目前的工作流是通过采用 [roocode-workspace](https://github.com/enescingoz/roocode-workspace) 这个项目先让模型理解项目结构并生成 Memory Bank 文件供后续使用；在一些大功能的开发上尽可能多地提供官方文档、博客和自己的 prompts 让 Roo Code 进行开发，同时自己修复一些逻辑性的 bug。

![cursor_agents_ios](https://image.pseudoyu.com/images/cursor_agents_ios.png)

最后如果有一些比较复杂的报错或 lint error，可以拆分成小的任务单元使用 Cursor + Claude 3.7 Sonnet Thinking 进行修复，虽然是两倍速率消耗，但生成代码的可用性还是更强一些。

目前有几个大的需求都是通过这个工作流辅助开发的，效果还比较满意。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。

我把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [Cursor – iOS & macOS (Swift)](https://docs.cursor.com/guides/languages/swift)
- [LuanRT/YouTube.js](https://github.com/LuanRT/YouTube.js)

#### 文章

- [iOS Silent Notification Problem - How they mess up your app's lifecycle and Amplitude session events](https://medium.com/@cam.ilker/ios-appdelegate-lifecycle-done-right-fb5f50acf350)，iOS 静默通知的实践。

#### 视频

- [史上最强无人机？！但第一天就炸了｜大疆御 4 Pro 首发评测](https://www.bilibili.com/video/BV1K4EFz6EX3)
- [我把婚礼办成了任天堂广告](https://www.bilibili.com/video/BV1QjzYYUEGn)

#### 电影

- [**我仍在此**](https://movie.douban.com/subject/35512487/)，久违的在影院看的电影，不得不说因为和巴西友好交流的政治原因使得这部政治性指向明显的（左翼、暴力）的片子能在国内院线上映也是一件很微妙的事...

#### 剧集

- [**最后生还者 第二季**](https://movie.douban.com/subject/36221305/)，非游戏党，看完第一季印象比较深，追一下。
- [**爱，死亡和机器人 第四季**](https://movie.douban.com/subject/36056894/)，感觉质量退化/想象力枯竭的程度超过黑镜了...感觉太多刻意的隐喻会有些故弄玄虚。

#### 音乐

- [**Jump up Super Star (From "Super Mario Odyssey")** _by The 8-Bit Big Band_](https://open.spotify.com/track/0BtlkzG35KuvLqXkzxqtZy)
