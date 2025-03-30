---
title: "周报 #89 - 博客改版与 TheWan App 发布"
date: 2025-03-30T20:30:00.000+0800
lang: zh
duration: 10min
---

## 前言

![weekly_review_89](https://image.pseudoyu.com/images/weekly_review_89.png)

本篇是对 `2025-03-25` 到 `2025-03-30` 这周生活的记录与思考。

这周最大的变化就是根据 Antfu 的开源博客主题改版了我的博客，也加上了一些模块，折腾得很开心；开发了两年几度放弃的一个 iOS App TheWan 也终于发布了，依然很基础，UI 设计和细节也并不满意，但总算迈出了第一步；还有很多有意思的事。

## 博客改版

我是一个博客折腾爱好者，前前后后写过十几篇关于如何搭建 Hugo 博客及一些周边服务的文章（详见[「周报 #68 - 关于写博客这件事与我生活的色彩」](https://www.pseudoyu.com/zh/2024/08/18/weekly_review_20240818)），也有不少朋友是通过这些教程才了解到我的博客的。

但随着博客内容的增加以及想要呈现和分享的形态越来越丰富，虽然网站主题是我之前很喜欢的那种古早台湾风，但早在四五年前就已经不再维护，期间我有提过几个 pr 新增了一些模块，但终究还是受 Hugo 框架的制约，没办法很好地满足我的定制化需求。

但因为早期我的博客 slug 是 `/zh/yy/mm/dd/:slug` 这样的路由形式，以及 Remark42 是根据完整的 url 匹配的，所以如果要迁移到新主题/框架要做很多额外的处理和重定向，所以一直搁置着没有折腾。

但最近因为偶尔会把一些博文转到朋友圈，有不少朋友反馈说打开很慢甚至完全加载不出来，除了因为部署在海外的原因外，博客本身的一些素材/性能问题也逐渐显现出来了，但也很难排查和解决，于是又动了迁移的心思，看了看其他的一些框架，大同小异，也都不算满意，但自己也不想太折腾用 Astro 之类的重新写一个。

![antfu_blog_os](https://image.pseudoyu.com/images/antfu_blog_os.png)

恰好翻到了 Antfu 的博客 [antfu.me](https://antfu.me/)，是他自己定制的框架主题，性能自然不用多说，风格简洁美观且功能丰富，还有我一直想要的摄影展示模块，是我理想中的博客了，于是在跟他确认授权之后，着手开始了迁移。

### 博客分区

我之前的网站定位在一个博客而不是主页，所以其实只有文章展示，也趁着这次机会重新划分了一下分区，目前有以下几个模块：

- [Homepage](https://www.pseudoyu.com/)
- [Blog](https://www.pseudoyu.com/posts)
- [Notes](https://www.pseudoyu.com/notes)
- [Projects](https://www.pseudoyu.com/projects)
- [Talks](https://www.pseudoyu.com/talks)
- [Podcasts](https://www.pseudoyu.com/podcasts)
- [Photos](https://www.pseudoyu.com/photos)
- [Sponsors](https://www.pseudoyu.com/sponsors-list)
- [Friends](https://www.pseudoyu.com/friends)
- [Let's Chat](https://www.pseudoyu.com/chat)

#### Homepage

![pseudoyu_homepage_new](https://image.pseudoyu.com/images/pseudoyu_homepage_new.png)

**[Homepage](https://www.pseudoyu.com/)** 是我的个人主页，主要展示简单的个人介绍、履历和各个平台的联系方式。

#### Blog

![pseudoyu_blog](https://image.pseudoyu.com/images/pseudoyu_blog.png)

**[Blog](https://www.pseudoyu.com/posts)** 是我的博文板块，分为了两个类别，[Blog](https://www.pseudoyu.com/posts) 与 [Notes](https://www.pseudoyu.com/notes)。

Blog 主要会是周报及一些更完整的技术文章/教程等，并提供 RSS 输出，可以在 {Folo} 等 RSS 阅读器中订阅；而后者 Notes 模块则可能是一些零散的不足以成文但却有一定价值的笔记，也可以供查看但并不会包含在 RSS 中以免造成一些干扰。

#### Projects, Talks 与 Poscasts

![pseudoyu_projects](https://image.pseudoyu.com/images/pseudoyu_projects.png)

**[Projects](https://www.pseudoyu.com/projects)** 展示了自己工作、开源以及一些折腾的 Side Projects，其实把这些年零散做的一些大小项目汇集到一起很有成就感

不过这部分我去掉了 Antfu 的 TOC 目录，每看一次他的项目页面就多一次震撼，~~我项目什么时候能多到需要目录导航呀。~~

![pseudoyu_talks](https://image.pseudoyu.com/images/pseudoyu_talks.png)

**[Talks](https://www.pseudoyu.com/talks)** 是我的一些课程/演讲。这两年其实还比较热衷于作为分享者参加一些线下的分享、课程和 Workshop 等，大多数其实都是和 [OpenBuild](https://openbuild.xyz/) 合作的，梳理了一下一些录屏、课件等，发现不知不觉已经沉淀了不少。

还跟学姐开玩笑说可能我今年分享怎么写 Solidity 的时长已经超过我真正写 Solidity 的时间了，常常会有一些隐隐的惭愧、焦虑和冒名顶替综合征。

尤其在 AI Coding 发展到已经相对成熟的当下，应用开发已经不再是门槛了，但真正服务的架构、性能等却更依赖开发者自身的判断，所以今年想更多沉淀一些基础知识了。

![pseudoyu_podcasts](https://image.pseudoyu.com/images/pseudoyu_podcasts.png)

**[Podcasts](https://www.pseudoyu.com/podcasts)** 部分目前还很单薄，其实我只有几年前在技术播客节参加的一期，当时思路和分享深度也很有限，但却也还是享受播客这种形式的，今年会多参与甚至自己尝试做一些。

#### Photos

![pseudoyu_photos](https://image.pseudoyu.com/images/pseudoyu_photos.png)

**[Photos](https://www.pseudoyu.com/photos)** 也是主题里我很喜欢的一个板块，之前就一直很想在个人网站上有一个类似 Unplash 这样的个人摄影展示模块，也算是能够激励自己出门多拍一些，尝试过用 Ghost 搭建一些子站之类的，总觉得不是很方便，现在能够直接集成到博客里了。

#### Let's Chat 与 Sponsors

![pseudoyu_chat](https://image.pseudoyu.com/images/pseudoyu_chat.png)

**[Let's Chat](https://www.pseudoyu.com/chat)** 是一个聊天/咨询板块，我之前其实偶尔也会邮件或是各个平台收到一些咨询，一般就是解决一些博客搭建的问题或简单聊一些关于技术学习、成长相关的困惑，最近也趁着博客改版，放了一个单独的[咨询页面](https://www.pseudoyu.com/chat)，也算是轻咨询的一次个人尝试。

![pseudoyu_sponsor](https://image.pseudoyu.com/images/pseudoyu_sponsor.png)

以及所有的 [Sponsors](https://www.pseudoyu.com/sponsors-list) 会展示在这个页面以示感谢。

#### Friends

![pseudoyu_friends](https://image.pseudoyu.com/images/pseudoyu_friends.png)

把之前添加的友链页面也迁移过来了，也欢迎大家交换。

### 博客组件

其实大部分的页面都是基于 Antfu 的已经很完善的框架来微调内容的，除了一些个人的页面外，我主要做了两个调整。

第一个就是 OG 图的生成没有用之前的 svg 替换文字的方式，而是用了他更推荐的 [satori](https://github.com/vercel/satori) 开源项目来动态生成，样式和灵活性更高一些。

另外就是把我之前的 Remark42 评论系统与 GoatCounter 访问统计系统集成进来了并且保持了原有的数据。

并且发现了 Netlify 非常好用的[重定向功能](https://docs.netlify.com/routing/redirects/)，只需要在目录下添加一个 `_redirects` 文件就可以自动化解决了我兼容之前的一些旧链接的问题，不需要在 DNS 层面做其他配置，例如以下的格式：

```plaintext
/zh https://www.pseudoyu.com/posts 301!
/zh/about https://www.pseudoyu.com/about 301!
/zh/links https://www.pseudoyu.com/friends 301!

/en https://www.pseudoyu.com/posts 301
/en/* https://www.pseudoyu.com/zh/:splat 301
```

所以服务部署也放到了 Netlify，依然是每次 commit 代码都会自动部署。

## 关于 TheWan iOS App

2022 年下半年，我看了 [Reorx](https://reorx.com/) 的一篇关于 n8n 的文章 —— 「[使用自动化工作流聚合信息摄入和输出](https://reorx.com/blog/sharing-my-footprints-automation/)」，被他所说的「赛博空间」这一概念所吸引，搭建了我的一个 Telegram 频道 —— 「[Yu's Life](https://t.me/s/pseudoyulife)」，自动化同步我文章收藏、豆瓣记录、B 站投币、YouTube/Spotify 点赞等各个平台的记录，聚合了我在网络空间的数字痕迹。

当时一位颇为有缘的学弟找到我说想一起做一个这样的应用，每个人都可以建立自己的专属聚合频道但却不用去折腾 n8n、rsshub、telegram bot 这类繁琐的技术细节，我很感兴趣，一拍即合。

一开始信心很足，花了一个多月做了一个网站和配套的 api 与同步服务，还写了详细的文档，想着春节就能上线，但节后我的个人生活发生了很大的变化，我换了工作、搬家回了杭州，暂搁置了一阵子，再捡起时却已经缺乏了那一股劲。

随后的两年里这个产品既没有消亡却也未能如期上线，一次次跳票。甚至为了说服自己继续开发下去，我把它当成了一个技术 Playgroud —— 用 Rust 写了 api 服务，Go 写了同步服务，产品本身也从一个网页端迭代成了用 SwiftUI 写的原生 iOS App。

期间也有很多有意思的事。产品背后同步用的是 {RSSHub}，未曾想到自己现在也成为了项目的 maintainer，前段时间遇到一个小宇宙同步问题直接去上游一条龙修完了；以及期间也诞生了 {Folo}，功能有些重合的点，一度让我对产品丧失了一大半的动力。

不过总觉得更多由于自己的原因跳票至今有些对不住一起的伙伴，所以在今年年初杭州和内蒙两场婚礼之间久违的空隙时间里完成了一个基础版本的开发，再经过和 Apple 审核近两周的 Battle 之下，终于上架了 App Store。

![tujunjie_thewan](https://image.pseudoyu.com/images/tujunjie_thewan.png)

上午跟一位最早期就加入了 waitlist 并且日常有不少沟通的读者朋友讲了这个消息，他说：

> 不知不觉，这两年我娃都快一岁，你也结婚了，真快呀。

自己很早之前就在博客里说过，想拥有一个自己的产品，后来真正开始做了才慢慢发现，即使是一个仅 1.1M 的小 App，从想法萌芽到最后打包上架都很不容易，但总之先迈出了第一步，回头看看，轻舟已过万重山。

欢迎感兴趣的朋友在 App Store 搜索「TheWan」或点击[下载链接](https://apps.apple.com/cn/app/thewan/id6670795669)体验。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。并且把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [21st.dev – The NPM for Design Engineers](https://21st.dev/)
- [GitHub - antfu/antfu.me](https://github.com/antfu/antfu.me)

#### 文章

- [学会闭嘴 | So!azy](https://blog.solazy.me/20250326/)，感觉我以前就会有太努力想成为一个别人眼中的 nice person 而错过了和他人真正交心的机会，这几年才慢慢开始学会多思考和适时地说一点。
- [在 ChatWise 中使用 MCP 工具](https://egoist.dev/chatwise-mcp)，Chatwise 真的是现在最好最快的 MCP AI 客户端了。
- [How to Write Blog Posts that Developers Read](https://refactoringenglish.com/chapters/write-blog-posts-developers-read/)，技术写作的一些技巧。
- [人生体验与记忆股息](https://laike9m.com/blog/memory-dividend,163/)，体验也往往就是人生意义本身了。

#### 视频

- [向鲁迅、梁实秋学习怎么“多骂架 骂好架”](https://www.bilibili.com/video/BV1QkoiYuEeN)
- [攻略全白做！北海道旅行翻车实录](https://www.bilibili.com/video/BV1S9ZGYqEEr)
