---
title: "周报 #98 - 生活之书与 Agentic Coding"
date: 2025-07-08T08:30:00.000+0800
lang: zh
duration: 6min
---

## 前言

![weekly_review_98](https://image.pseudoyu.com/images/weekly_review_98.png)

本篇是对 `2025-06-09` 到 `2025-07-08` 这月生活的记录与思考。

收到了一本关于我生活的“书”；聊聊对 Claude Code 和各类 Agentic Coding 工具的想法和使用方式；还有很多有意思的事。

## 生活之书

![yulife_cover](https://image.pseudoyu.com/images/yulife_cover.jpg)

和友邻 [Reorx’s Forge](https://t.me/reorx_share) 一样收到了好友[涂俊杰](https://blog.tujunjie.com/)寄来的礼物，把 2022.5.28 这个频道创建的第一条消息一直到 2025.6.6 日我今年的生日总结文章打印成了小册子，一本名为 Yu‘s Life 的书。

![yulifebook_firstpage](https://image.pseudoyu.com/images/yulifebook_firstpage.jpg)

在现今这个把一切实体的东西电子化的时代，把这个频道纸质化，变为一本能翻阅的实体书是一件很神奇的事，恰如我的频道名，我这三年的人生与生活似乎也因此有了触感和厚度，随机翻到一页，都是过去的时间碎片。

我这个频道 fork 自 reorx 的频道，第一条消息就是 star 他的 n8n workflows，其中的大部分工作流沿用至今，稳稳地跑了三年，当时涂俊杰看到我的频道来问我是怎么做的，我把 reorx 的 使用自动化工作流聚合信息摄入和输出 这篇文章推给了他，如今，我们像是散落在赛博空间的节点一样连接在了一起，很有趣，也很感动。

![yulife_wedding](https://image.pseudoyu.com/images/yulife_wedding.jpg)

想到当下度过的每一天每个想法都会在未来成为一行文字，似乎现在分享的哪怕微不足道的小想法也变得浪漫了起来。

不由得想到，如果再过三年，这本书大概会生长得更加枝繁叶茂吧，心里也对未知的生活少了一些迷茫和焦虑，甚至隐隐期待了起来，大概这也是输出与分享所带来的能量的回流吧。❤️

## Agentic Coding

![ccusage](https://image.pseudoyu.com/images/ccusage.png)

这大半个月也顺应“潮流”开始使用 Claude Code，又对 Agentic Coding 有了更深的一些认识。

我是从 GitHub Copilot 最开始 Technical Review 补全的时候就有开始用，帮我在工作中“偷懒”了许多，后来 ChatGPT 出来后也是开始复制粘贴代码到聊天对话框解决代码问题，再到后来深度使用了一年 Cursor，看着它从一个小众工具上了神坛，也夹杂着体验了 Roo Code + Gemini 2.5 Pro 的超长上下文，使用过 Augment，又到现在更智能的 Claude Code 等等。

其实我倒是没有像很多人那样觉得 Claude Code 太激进或是惊艳，想来可能是因为我在 Cursor 最早期出了 YOLO 模式（Agent 模式的前生）的时候就已经打开并且配置了几乎所有命令行的 Auto Run，在我目前维护的不少项目里 AI 代码的含量可能达到了 80%+，甚至有部分小项目是纯 Vibe 的，几乎没有自己手写过代码，也有一些静态项目直接用 v0.dev 和 lovable 对着截图直接生成了。

所以其实没有像自媒体说的那样“安装 Claude Code 5 分钟后，我卸载了 Cursor”，但确实感受到了一些进步，似乎自己可以不再去维护那么多提示词或是给足上下文，它也能够完成大部分明确的需求，短短几天就感觉到了 Claude Code 这类工具形态的巨大潜力，或是 Agentic Coding 未来的可能性。

现在的 Agent Coding 工具有了更多员工或是“实习生”的感觉，并不是说代码能力（~~我感觉他们在部分领域或是特定环境下的代码力比我强不少~~），而是“性格”，当我遇到一个技术问题或是像实现什么功能时，我会先思考这是一个什么样的项目和需求，然后选择不同的工具。

比如是像 Folo 这样庞大而复杂的项目中实现一个完整功能，我会优先使用 Roo Code 外加 1M 上下文 & 思考拉满的 Gemini 2.5 Pro，他像是一个代码能力扎实的新员工那样，在接手一个新项目时会先最大程度理解代码的原有结构，它可能并不定如 Claude 模型那样生成那么高质量的代码或是一次搞定，但通常不会偏离具体的需求太远，而对这些新代码带来的一些小 bug 或是可优化的点则可以直接交给 Cursor 配合 Claude 4 Sonnet Thinking。

而像是 RSSHub 这样一个代码虽然庞大，但是比如新增或是修复一个路由时，其实只需要关注这一个网站的相关逻辑，最多十来个问题，这种情况下其实在自己搞清楚如何去获取网站内容的技术方案之后，直接交给 Claude Code 是很不错的选择，他能够像一个聪明的实习生那样，写出很漂亮的代码甚至给出一些创新的方案，还会自动去 debug 调试。

而对于一些比较独立/常规的比如前端、API 或是 CRUD 类项目，我通常会交给 Cursor，他则更像是一个项目中的老员工，有着最聪明的 Claude Sonnet 4 Thinking 模型，UI 交互、代码回滚这些做得很好，总会为我们的一些大刀阔斧的改动去兜底。

仅在一年前我还难以想象写代码能够有这样“富裕”的选择空间，这大概也是应用开发者的好时代吧。

### Claude Code

![cc_limit](https://image.pseudoyu.com/images/cc_limit.jpg)

最开始使用的两天新鲜劲很足，会算着刷新时间起来继续前一天晚上没做完的活，有点像是游戏化设计等着在新手村复活。

![vibemeter_cc](https://image.pseudoyu.com/images/vibemeter_cc.png)

有使用 [Vibe Meter](https://vibemeter.ai/) 这一工具统计用量，感觉虽然用得不像各个博主那样动辄一天上百刀，但也切实解决了我不少实际工作中的问题，远超所值。

![claudecode_paste_img](https://image.pseudoyu.com/images/claudecode_paste_img.jpg)

Claude Code 粘贴图片技巧 —— `Cmd` + `c` 复制之后在 Claude Code 终端直接 `Ctrl` + `v` 就行，解决了高频使用问题！🔥

### n8n

充值了 Claude Pro 之后除了用 Claude Code 外，还可以在客户端用还算慷慨的 Claude Opus 4 模型。

![n8n_ai_workflow](https://image.pseudoyu.com/images/n8n_ai_workflow.png)

最近发现它用来写 n8n workflows 很不错，对于刚做的一个还算复杂的 AI 功能，基本上详细描述完需求之后用它生成的 json workflow 文件直接导入都已经很可用了，后续再在这个基础上微调或者再继续让 Opus 4 调整、重新生成、导入，可以做到 vibe no coding 了 🤣

## 个人生活剪影

![swimming_board](https://image.pseudoyu.com/images/swimming_board.jpg)

和学姐一起加了一个杭州的游泳俱乐部的成人培训班，每周一三六练晚上 7-9 练两个小时，我是基础班里最菜的 😭 乖乖拿着浮板重新规范动作了

![nice_cloud_1](https://image.pseudoyu.com/images/nice_cloud_1.jpg)

![nice_cloud_2](https://image.pseudoyu.com/images/nice_cloud_2.jpg)

最近抬头看到的云都好好看！

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/s/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。

我把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [v0 in Cursor](https://vercel.com/docs/v0/cursor)
- [The Thiings Collection](https://www.thiings.co/things)
- [cameroncooke/XcodeBuildMCP](https://github.com/cameroncooke/XcodeBuildMCP)
- [Afilmory/afilmory](https://github.com/Afilmory/afilmory)
- [hyperliquid-dex/hyperliquid-rust-sdk](https://github.com/hyperliquid-dex/hyperliquid-rust-sdk)
- [nektos/act](https://github.com/nektos/act)
- [SeaQL/sea-orm](https://github.com/SeaQL/sea-orm)
- [steipete/VibeMeter](https://github.com/steipete/VibeMeter)
- [The Best Way To Learn A New Language - Refold](https://refold.la/)
- [Dreaming Spanish – Learn with Comprehensible Input](https://www.dreamingspanish.com/)
- [pola-rs/polars](https://github.com/pola-rs/polars)
- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

#### 文章

- [工作周年与 AI 焦虑：成长与挑战并存](https://innei.in/notes/192)，开发群里永远在线的 Innei 🔥 太强了。
- [从 Claude 4 发布和 Windsurf 并购案，看 AI 的终局](https://mp.weixin.qq.com/s/D8WvnDN8xfDhYlnSxjTo7g)，大厂拼模型，中厂拼收购，小厂拼效率。整体来说也还是应用开发者和普通用户的黄金时代了。
- [镜头与代码的交响：打造个人线上画廊与假期随笔](https://innei.in/notes/193)，富士赛高！
- [我对各种 AI Coding Agent 工具的看法](https://yachen.com/2025/06/06/2025-ai/)，我对各种 AI Coding Agent 工具的看法。
- [2025 年的 AI 协助编程观察](https://xxchan.me/ai/2025/06/08/ai-coding.html)，深度使用过文中提到的大部分工具，很准确，对 agent coding 的思考也很前瞻。
- [关于 AI 辅助编程的一些实践和思考](https://limboy.me/posts/ai-assisted-coding)，AAC 是 multiper 这一点深有感触，在惊叹 “Cursor 把我一小时的活十分钟做完了”和无语“明明十分钟能搞定的需求它绕了一个小时”之间反复横跳。
- [The State of React and the Community in 2025](https://blog.isquaredsoftware.com/2025/06/react-community-2025/)，react 发展现状、历程和误解。
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)，刚开始体验 Claude Code。
- [聊聊 AI 和 MCP](https://blog.cong.moe/post/2025-06-17-ai-and-mcp/)，依然没找到什么实际生产生活中的用例，还在观望 MCP 的发展。
- [Labubu 哪有泡沫？](https://1q43.blog/post/11388/)，解答了我对 Labubu 热度的很多疑惑。
- [How to automate development journaling with Claude Code](https://www.devas.life/how-to-automate-development-journaling-with-claude-code/)，感觉可以搞一个 obsidian 版本的 🧐。
- [译：拥抱苦差事](https://www.piglei.com/articles/embrace-the-grind-cn-translation/)，我们总是追求事半功倍，但有时其实做枯燥的“苦差事”甚至是做一些貌似“事倍功半”的事也是解决问题的另一种方式。
- [How I Vibe Coding?](https://xuanwo.io/2025/03-how-i-vibe-coding/)，最近尝试了下 Claude Code 写 Rust 确实超出预期。

#### 视频

- [谁说《交响情人梦》是爱情喜剧？](https://www.bilibili.com/video/BV1t1juzhEHN)
- [《 妈 de 新 西 兰 》](https://www.bilibili.com/video/BV1s27VzgEZZ)
- [别学我，拖了两千年才来敦煌！](https://www.bilibili.com/video/BV13tTezmE5i)
- [10 分钟带你从 0 配置最强命令行](https://www.bilibili.com/video/BV1fdTfzeE8X)
- [Andrej Karpathy: Software Is Changing (Again)](https://www.youtube.com/watch?v=LCEmiRjPEtQ)
- [起初我只是想遛狗轻松一点...](https://www.bilibili.com/video/BV1xhKAznEVZ)
- [-LKs- 《创作，是一种长期主义》](https://www.bilibili.com/video/BV15YNEz3EVG)
- [从第 1 天到第 3650 天，我们的爱情发生了什么？](https://www.bilibili.com/video/BV1ErKHz4EDV)
- [我被新西兰总理盯上了……从免费到上千，旅游局定制项目评测！](https://www.bilibili.com/video/BV1MrKRzvEpL)
- [凌晨 4 点，上百人在这里排队等候……](https://www.bilibili.com/video/BV1VDKhz3EgH)
- [【何同学】五年前，我见到了微软的秘密手机...](https://www.bilibili.com/video/BV11YNQzJEQY)

#### 剧集

- [**杀戮人机**](https://movie.douban.com/subject/36689654/)，机器人喜剧，意外地还不错。
- [**潜伏**](https://movie.douban.com/subject/3314870/)，很喜欢的谍战题材，前段时间看了沈醉回忆录和袁殊之后也更了解这一段历史中的因果，结局有些遗憾却也真实，少了一些爽文的部分，却也更让人思考到底值不值得。
- [**一杆入魂**](https://movie.douban.com/subject/36809268/)，试用了 Apple TV 三个月，首页看到的，算是中年励志+公路片？感觉下饭还可以。
- [**康熙王朝**](https://movie.douban.com/subject/1830590/)，最近补的剧也是越来越老了。
