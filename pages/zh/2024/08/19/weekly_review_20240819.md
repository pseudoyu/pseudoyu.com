---
title: "周报 #69 - AI Coding 体验与学习的源动力"
date: 2024-08-19T05:30:00.000+0800
lang: zh
duration: 8min
---

## 前言

![weekly_review_20240819](https://image.pseudoyu.com/images/weekly_review_20240819.png)

本篇是对 `2024-08-12` 到 `2024-08-18` 这周生活的记录与思考。

从 VS Code 转向 Cursor 写代码，聊聊 AI 加持下的编程体验；和学姐在一起 400 天；某天和学姐有了关于过去经历和兴趣爱好的一次深夜长谈，引发了我对自己的学习源动力思考；还有很多有意思的事。

## AI 加持下的编程体验

![cursor_screenshot](https://image.pseudoyu.com/images/cursor_screenshot.jpg)

这两周高强度使用了 Cursor，一个基于 VS Code 的 AI IDE，效果很惊叹。

我其实算是 GitHub Copilot 的非常非常早期的内测用户，直到现在也还在用；而在 ChatGPT、Perplexity、Devv.ai 和 Claude 出现后也都是高强度的付费用户，思维上已经很习惯使用 AI 来帮我写代码了，但是更多还是补全部分逻辑和调试 Bug，没办法做到项目级的辅助。

而在 Cursor 把整个项目作为上下文、提问时可以 @ 其他文件或代码、并且使用 Claude 3.5 Sonnet 模型之后，体验感和可用性已经和我想象的形态越来越近了。

![web3insights_demo](https://image.pseudoyu.com/images/web3insights_demo.png)

实践上，在试用 Pro 的 15 天中，解决了我工作中的 Go 的一些 Bug 修复和新增 Tests；改进了 Electron 应用的一个更新提示界面和功能；从零开始帮助我写了一个 rust 的后端 CRUD api 包括完整的 Dockerfile 和 GitHub Action 部分；帮助我完成了一个 Remix 项目的数据可视化部分以及很多个界面的调整，精确到各个页面之间的交互和布局；以及顺便还帮我学了一些 SwiftUI。

我大概已经有 50% 以上的代码是在 AI 辅助下甚至直接 AI 生成的了，而我更多的时间都是「CMD + K」（Cursor 的代码生成快捷键）的对话框中跟 AI 沟通需求，在梳理 prompts（大部分就是按照对话自然语言来表述），对话或是等待代码生成的时候反而有了更多时间去思考代码架构、逻辑、更合适的第三方库等。

其实让 AI 了解我的需求的时候，自己也在反复思考其合理性，反而能产出功能和代码质量都更优的代码，至于语法和代码风格方面，我常常直接去研读和学习 AI 的实现，比起从零开始去读一个开源项目要好上手得多。

而我需要做的，就是设计和创造。

正如 Randy 在 [「代码艺术家」不会被 AI 取代](https://lutaonan.com/blog/code-artists/) 一文中所引用的：

> I realize the reason I like building is not just because I’m a builder.
>
> 我意识到我一直喜欢创造点东西的原因不只是因为我就是个创造者.
>
> It’s because software products are how I express my creativity.
>
> 而是因为写软件产品是我表达我的创意的一种方式
>
> It’s like a poem to a poet, a song to a songwriter, a painting to a painter…
>
> 就像诗人的诗，歌手的歌，画家的画
>
> Software is my art form, my medium of expression.
>
> 软件是属于我的一种艺术形式，是我表达（创造力）的媒介。

## ETHShenzhen Hackathon

![web3insights_ethshenzhen_demo](https://image.pseudoyu.com/images/web3insights_ethshenzhen_demo.jpg)

上文提到的项目是我周末在深圳参加的活动，其实算是自己正经作为选手参加的第一个 Hackathon 活动，通宵两晚写完了 Demo，在现场写了基础的演讲大纲和几张简略的 PPT，最后完成了 Demo 演讲，比想象的还是要累不少，周日才睡上一个好觉。

## 学习的源动力

有一天晚上从给我妹妹选滑板开启了话题，和学姐夜谈到了过去的一些经历，以及自己的各种兴趣爱好。

我的奇奇怪怪的技能树和兴趣爱好其实不算少。学生时期大大小小的运动至少都接触过，大部分也还算上手；小时候也用那种扭扭的滑板四处刷街；轮滑自小学开始到大学参加轮滑社坚持了接近十年；跟着我表哥一起去游泳馆玩，自然地学会了游泳；大学后玩了摄影、学了剪辑，在全校飞无人机，也成立了工作室从各种灯光布景都研究了下；做过审计的实习、甚至因为创业开公司而自己把注册公司、财务报税、开发票、企业清缴汇算申报以及注销流程在没有中介和财务的帮助下自己操作了近两年；工作中也是对各种编程语言框架都很好奇，算是经常尝鲜。

我似乎一直有这样野路子学习的倾向，以及在学到了恰好足够满足我当时的需要时就戛然而止，并没有更多的欲望去深耕其中。例如，我算是喜欢摄影，甚至在做摄影和视频相关工作室创业的时候也有过把它作为自己事业的念头，但那么多年其实我似乎并没有真正地从构图、光影、色彩、修图这些去系统学过，视频拍摄剪辑也没有从戏剧理论、导演思维这一块打基础，只是在需要用的某个技巧或是功能的时候再去快速学习，够用但也仅仅是够用。

我认真剖析了自己的内心，发现了很有意思的现象，还会追溯到童年甚至更小的时候。

我很小的时候转学来到杭州，其实花了很多时间来让自己讲话不带乡音、以及花了好几年成绩才慢慢达到中上，也经历过一些带着歧视或是不公，内心积累了不少自卑的部分。而随着初中遇到了很好的老师，生活和学业才慢慢走上正轨。

这时候其实多了另一种评价，**“你做到 xxx 一定很努力吧”**。

我并不是否认“努力”的重要性，只是常常被那么说，总觉得有些挫败，似乎连我自己都觉得，我就是不如别人，只是很努力，所以比别人取得了更多的收获，陷入 Impostor syndrome (冒名顶替综合征) 的自我恶性循环。

于是我慢慢开始不那么“努力”，似乎在向他人和自己证明，我能“轻易”做到这些事，渐渐地，也享受其中。

带给我快乐的常常并不是学到的知识或运用它实现什么，而是“学习一个新东西”和“我能够很快学会它”这样的心理正反馈。这带给了我一些好处，如长期这样乱点技能树积攒的信心让我面对新事物或许多看似遥远的目标时不会那么畏惧 ——

> “过去的我做到那么多了，现在的我一定也能”。

但也让我有时候并没办法沉下心做好一件事，或者把某项真正喜欢的事做到最好，有广度而缺深度，感觉也是一种 trade off，慢慢也开始有一些改变。

## 个人生活剪影

### 400 天纪念日

![love_record_400](https://image.pseudoyu.com/images/love_record_400.jpg)

和学姐 400 天了。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/s/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。并且把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [GitHub - lokalise/i18n-ally: 🌍 All in one i18n extension for VS Code](https://github.com/lokalise/i18n-ally)
- [electric-capital/crypto-ecosystems](https://github.com/electric-capital/crypto-ecosystems)
- [omarespejel/starknet-star-tracker](https://github.com/omarespejel/starknet-star-tracker)

#### 播客

- [第 11 集 | Owen 聊沉浸式翻译的起源、裸辞三年的经历、做穷人也能用的产品、大亚湾的生活](https://www.listennotes.com/e/e1a391614f16491fb6999b162524f5dd)

#### 文章

- [原积薪项目将于近日下线](https://darmau.co/zh/article/firewood-will-be-offline)

#### 视频

- [【IGN】10 分，《黑神话：悟空》评测：踏平坎坷成大道](https://www.bilibili.com/video/BV1Ti421a7dv)
- [去了一趟瑞士，我的精神状态崩溃了](https://www.bilibili.com/video/BV1XW42197H8)
- [vlog #69 | 程序员下班的学习记录｜注意力流向哪里，哪里就有能量｜在读《诊疗椅上的谎言》与《巴菲特致股东的信》｜日常英语学习｜日记本写完啦 🎉](https://www.bilibili.com/video/BV1Kf421i7r4)
