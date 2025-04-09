---
title: "周报 #90 - OVH 服务器、Coolify 与对 AI Coding 的思考"
date: 2025-04-09T10:44:00.000+0800
lang: zh
duration: 6min
---

## 前言

![weekly_review_90](https://image.pseudoyu.com/images/weekly_review_90.png)

本篇是对 `2025-03-31` 到 `2025-04-06` 这周生活的记录与思考。

搬回杭州已经接近一年了，租的房子也差不多到期了，于是火速看了两天房子，最终在不远处选了另一套，虽然又要经历一次痛苦的搬家，但新家的空间布局还挺满意的，也当作一种生活状态的调整了。

除了物理意义上的搬家外，我的所有服务/数据也经历了一次从 AWS 到 OVH 的迁移，也是一波三折，好在最后也都无缝完成了，刚好也梳理一下。

最近高强度地用 Cursor 和 Windsurf 进行 Vibe Coding，确实有能感觉到对以往开发模式的颠覆；还有很多有意思的事。

## OVH 与 Coolify

### OVH Mystery Box

我之前一直算是个 Serverless 平台的爱好者，热衷于在 Vercel、Netlify、Cloudflare Pages、Zeabur、~~fly.io~~、~~Railway~~ 等平台部署和管理自己的大部分服务，大多数情况下也够用，但随着 Zeabur 的涨价以及各个平台政策的变更，成本不断上涨到十几美元甚至几十美元一个月，感觉已经失去了优势。

再加上之前参加一个黑客松获奖送了几千美元的 AWS Credits，所以有很长一段时间我都把服务部署在 AWS 香港机房的一台 EC2 实例上，也稳稳地跑了四五个月了，不过随着 Credits 即将到期，再加上自己也想一劳永逸保障服务的稳定性，于是打算找一些独服长期续费。

主要考虑的就是 Webp Cloud 团队在「[Hetzner CAX 系列 ARM64 服务器性能简评以及 WebP Cloud Services 在其上的实践](https://blog.webp.se/hetzner-arm64-zh/)」一文中强推的 Hetzner 的 ARM64 服务器和另一家极致性价比的 OVH 了。

原本已经打算用 Hetzner 了，但刚好看到 OVH 推出了一个 Mystery Box 盲盒活动，22.99 欧元/月，基础款配置为

- Intel Xeon E5-1650v3
- 64G 内存
- 2 \* 480G SSD SATA Soft RAID
- 1Gbit/s 带宽

原本就是一个还挺划算的配置，但有意思的在于它可能会随机开出更高 CPU、内存和硬盘的机器，但价格不变，一下子就理解了买 Pop Mart 的朋友们的感受，~~这谁忍得住啊~~。

共计买了四台，前两台都是基础款，第三台开出一个 CPU 与内存中奖的加拿大 bhs 机房的机器

- Intel Xeon E5-1650v4
- 128G 内存

当时已经感觉很满意了，于是折腾了一晚上迁移服务，包括全量数据库的数据，搞定后才收到邮件说第四台机器也安装好了，于是去测了一下配置，惊喜地发现真的开到隐藏款了

![ovh_perf](https://image.pseudoyu.com/images/ovh_perf.png)

- AMD EPYC 7351P
- 128G 内存
- 2 \* 1T NVMe
- 法国 GRA 机房 1Gbit/s 上行 + 10Gbit/s 下行带宽

前一天还在和朋友说我肯定没这个运气了，不蹲了。

![chat_with_seefs_ovh](https://image.pseudoyu.com/images/chat_with_seefs_ovh.png)

一时看着刚迁移好的服务有些哭笑不得，不过也是幸福的烦恼了，于是又作为一个熟练的服务搬运工开始折腾，花了半个晚上迁移完了所有服务，这个价格&配置应该也很足够当传家宝了，~~真的再也不搬了~~。

机房在法国，线路一般，因此大部分对外的服务我都套上了 Cloudflare Proxy，算是能有一些优化，作为个人使用来说也比较足够了，或许后面考虑一些对国内访问要求更高的服务会再用 nginx 套一层线路更好的 nginx 反代吧。

### Coolify 管理

顺便也趁机优化/梳理了一下服务管理的方案。

之前用过 [Zeabur](https://zeabur.com/) 的托管，不过感觉面板上还是有不少 bug，并且通过 k3s 进行部署和调度的方式略有些黑盒，没办法很方便地通过 ServerCat 等工具看到每个容器的一些状态，再加上数据备份、挂载等操作还是有很大的局限。

![coolify_services](https://image.pseudoyu.com/images/coolify_services.png)

我也有一些服务是托管在朋友搭的 [Coolify](https://github.com/coollabsio/coolify) 面板上的，用得很习惯，尤其是能够将数据库定时备份到 S3 上的功能很强大，所以这次还是选择了 Coolify，直接在面板中配置上服务器的 ssh 就一键管理了。

## Vibe Coding

最近很流行一个词叫 Vibe Coding，是对 AI 辅助编程的一种调侃式的说法，不过正经地聊聊，作为一个在 21 年 GitHub Copilot Technical Preview 的时候就高强度使用，后来也陆续使用 ChatGPT、Claude 这类 AI Chat 平台生成代码，并从去年 7 月开始年付 Cursor 并高强度使用至今的 AI Coding 重度爱好者，我确实有感觉到 AI Coding 对我们开发模式的极大颠覆。

虽然没有准确统计过，但感觉我工作与个人开发中目测大概至少有 70% 以上的代码是通过 AI 辅助生成的了，大部分时间用的是 Cursor 的 Agent 模式。

很多人对于 AI 生成的代码抱有偏见，觉得会生成一堆难以维护的“一次性”代码，但我依然觉得即使是 AI 有着更高自主权的 Agent 模式，生成代码的质量也依然要靠开发者自己来把控，当给 AI 的提示词足够准确的时候，它会成为很好的帮手，甚至能写出比自己更优的代码。

![cursor_refactor](https://image.pseudoyu.com/images/cursor_refactor.jpg)

我前段时间曾做过一个尝试，把一个个人项目进行了一波涉及到几十个文件的后端 API 重构，如果我自己去写或许要 2-3 小时的工作量与大量的耐心，但把需求和对应的参考文档告诉 Cursor 后，它一次生成的代码就可以使用，但漏了一个组件，再经过两次追问已经完全实现了我的需求，总共花费的时间不到 20 分钟（甚至大部分时间都花在 Claude 3.7 Sonnet 的 Thinking 等待中），这次实践也让我对 AI 所能做的能力边界有了更深的理解。

我始终觉得 AI Coding 最大价值并不是帮助我们成为更顶尖的程序员，任何一个领域想要深耕都需要花很长的时间去沉淀和实践，10000 小时定律依然适用，甚至更有价值了，AI 写出的“不可控”的代码更需要开发者的自身知识储备与判断力。

但 AI 能够让我们更快/更好地实践自己的想法、做出一个小产品或是参与到一些开源贡献中了，我作为一个后端开发，并不需要 10000 小时才能写一个简单的前端页面，而是可以快速做出一个“全栈”的项目，甚至可能比自己设计得要更好。

甚至我还很习惯于阅读 AI 生成的代码来学习那些组件和语法，自己找到一些可以优化的地方去调整修改。AI 更像是一个耐心的 mentor，会帮助我们学习不熟悉的技术栈，解答遇到的问题，并将其内化为自己的技术积累。

尤其是在 Claude 3.7 Sonnet (Thinking) 推出后，惊讶于其代码能力的跃迁之余，我开始在 AI 为我省下的 Coding 时间里打开了之前还未看完的 cs193p SwiftUI 开发课程与 Rust 教材开始从头学习，愈发觉得或许再几个月、半年过去，模型本身的能力已经不再是瓶颈，而开发者本身的技术储备、系统设计能力、对架构的理解和业务的抽象能力才是那个短板。

~~另外由于习惯提示词都是英文，感觉这几个月代码能力没提升多少，英文表达能力倒是进步了 🤣。~~

## 博客改版

既上次改版之后，又发现 Anthony Fu 新增了一个 [Media](https://www.pseudoyu.com/media) 页面，火速把我的也集成上了，现在会展示我看的书籍、电影、剧集、动漫和游戏了。

![blog_media_book](https://image.pseudoyu.com/images/blog_media_book.png)

![blog_media_movie](https://image.pseudoyu.com/images/blog_media_movie.png)

![blog_media_drama](https://image.pseudoyu.com/images/blog_media_drama.png)

![blog_media_anime](https://image.pseudoyu.com/images/blog_media_anime.png)

![blog_media_game](https://image.pseudoyu.com/images/blog_media_game.png)

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。并且把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [GitHub - djyde/browser-mcp](https://github.com/djyde/browser-mcp)

#### 文章

- [我们高估了智力的重要性](https://lutaonan.com/blog/oi/)，我曾经最“卷”的一段时间会给自己排许多看似不可能完成的任务和苛刻的 DDL，甚至都是一些很重要的失败会付出不少代价的项目，用这种方式强迫着自己去快速学习，现在想想敢于这么做其实更多就是信任自我效能，而这种信心也是可以滚动积累的。
- [6000 字+6 个案例：写给普通人的 MCP 入门指南](https://mp.weixin.qq.com/s/BjsoBsUxCzeqXZq46_nrog)，依然没找到什么特别刚需的 MCP 场景，figma 生成网页的感觉还比较有意思。

#### 视频

- [AI Coding 时代：用 Agent 构建数据库 MCP，并应用于 CMS 系统](https://www.bilibili.com/video/BV12iZCYnEdf)
- [mac 下最强虚拟机软件：OrbStack](https://www.bilibili.com/video/BV1gGdFYcEiL)
- [手把手带你实现反向代理：Rust + Pingora 网络编程实战](https://www.bilibili.com/video/BV11GRkYTEJ4)
