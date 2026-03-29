---
title: "周报 #106 - OpenClaw 实践、搬家与生活的能量"
date: 2026-03-29T23:09:00.000+0800
lang: zh
duration: 8min
---

## 前言

![weekly_review_106](https://image.pseudoyu.com/images/weekly_review_106.png)

本篇是对 `2026-01-14` 到 `2026-03-29` 这两月生活的记录与思考。

短短两个多月过去，随着 Claude Opus 4.6 模型更迭和 OpenClaw 的热潮，工作与生活模式似乎又有了极大的变化，在效率与创造力提升的同时，却也更加模糊了生活的界限；直到半月前搬家，把更多目光投向生活与健康本身，才重新又拾回了生活的能量；还有很多有意思的事。

## 基于 OpenClaw 与 Obsidian 的个人知识体系

1 月初 OpenClaw 刚兴起热潮的时候就早早尝试了，一开始很兴奋，尝试了各种 Skills 和好玩的用法，当时也想着马上写一些实践文，但新鲜了几天后，便开始思考它与我自己原来的工作流的结合，后来又读到了「[创造一只龙虾，需要些什么?](https://frostming.com/posts/2026/create-a-claw/)」和后来的「[Tape Systems](https://tape.systems/)」，渐渐基于 Obsidian 形成了自己的 AI Native 的个人助理。

实践了近两个月，依然觉得 OpenClaw 是一个不错的形态，但不想破坏自己原有的知识库体系，也不能作为一个完全自治的 Agent 来代替自己做一些自动化事务，因此做的最大的一个改动就是基于 Tape Systems 重新梳理了自己的 Obsidian 知识库。

两年前我之前在「[个人信息获取与知识管理系统（Heptabase + Logseq + Readwise）](https://www.pseudoyu.com/zh/2023/09/05/my_personal_pkm_input_output_system)」中形成了自己的一套知识管理系统，后来虽然三个软件都不用了，而是转向 Obsidian + Pinboard，但整体的思路一直都延续了。然而随着这两年大模型的日益强大，基于本地笔记/文档的这一套知识获取与管理系统很快就被颠覆了，很少再真的手动记录一些知识条目，而是更多是和 Claude 与 GPT 的交流记录，然而这些交流的记录如果要再自己重新梳理沉淀又反而会耗费大量时间，也不可持续。

![obsidian_graph_view](https://image.pseudoyu.com/images/obsidian_graph_view.png)

后来看了像是 [Nowledge Mem](https://mem.nowledge.co/) 这类的全局知识库，已经很接近我想要的形态，不过鉴于之前已经沉淀了好几年的笔记与周报等，所以我还是在 Obsidian 基础上进行改造。

![obsidian_base](https://image.pseudoyu.com/images/obsidian_base.png)

根据「[How I use Obsidian](https://stephango.com/vault)」的实践简化整理了自己原有的笔记内容和文件编排，有了 Claude Code 和 Codex 这类 Agents 之后，已经不需要前置思考太多笔记位置，而开始使用自带的 Daily Notes 来记录每天思考沉淀，根据内容智能打类别与主题标签，并使用 base 数据库来更好地管理和呈现。

![telegram_openclaw_channel](https://image.pseudoyu.com/images/telegram_openclaw_channel.png)

在 OpenClaw 这一侧，我部署在一台 7\*24 小时独立运行的 Macbook Air 上，使用 Telegram 作为入口，在一个 Group 中分类多个 Topics，加上不同的 System Prompts 来区分用途，所有的产品讨论、文章解读、开发任务等都以 Telegram 为唯一入口，每一句聊天都由 LLMs 自动判断有价值的内容同时提取到 OpenClaw 的记忆系统与 Obsidian，每天与每周也都会蒸馏所有的对话历史，提取出连贯的主题沉淀到记忆中，而之后对话也都会同时查阅两个记忆系统。

有了 OpenClaw 的内置系统与 Obsidian 外挂“大脑”，随着对话越来越多，也会越来越智能。除此之外我也将 Beancount 记账、订阅管理、日程管理等通过自己梳理过的 Skills 调用相应 Cli/Api 进行操作，通过慢雾的「[OpenClaw Security Practice Guide](https://github.com/slowmist/openclaw-security-practice-guide)」进行安全风控与审计，保障我们所有的操作。

鉴于 OpenClaw 功能和安全性都不太可控，而 Claude Cowork 也已经支持 Telegram Plugin、定时任务等，考虑把这些实践平移一下，后续看看也会记录一下。

## 个人生活剪影

![github_contribution_weekly_review_106](https://image.pseudoyu.com/images/github_contribution_weekly_review_106.png)

最近几个月由于太沉迷写代码而没有太多生活的部分可以记录，基本周末也是忙于工作和项目，也对 Agentic Coding 有了更深的理解和实践，所幸倒也是没有过多因此而焦虑，以 200 刀 Claude Max + 200 刀 ChatGPT Pro 为主，配合着一些 Cursor、AMP 的额度，Token 不再是瓶颈，可以尽情探索各种实践，也切实体会到模型能力上限的提升。

![zheti_new_house](https://image.pseudoyu.com/images/zheti_new_house.jpg)

最近刚换租搬家，感觉每次搬家也是对当下生活方式的一次整理，虽然用了日式搬家省了好多事，但也花了接近一周才慢慢收拾完，也在客厅布置了一个办公区，深夜在窗景 Coding 也有一种沉静的氛围，莫名美好。

![zheti_cat](https://image.pseudoyu.com/images/zheti_cat.jpg)

还有三只松弛的小猫在新家乱跑，很欢乐。

![999day_gift](https://image.pseudoyu.com/images/999day_gift.jpg)

和学姐在一起 999 天了！

![999day](https://image.pseudoyu.com/images/999day.jpg)

现在调整了自己的作息节奏，基本上晚上 12 点前睡，早上 5 点起床，持续三个多月了，再加上最近在新家也开始尽量自己做饭，感觉比之前健康了很多，后续打算慢慢再恢复运动，生活的能量似乎来自来自生活中的这些点滴小事。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/s/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。

我把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [Web Interface Guidelines | Vercel](https://vercel.com/design/guidelines)
- [/rams - Design Engineer for Claude Code, Cursor, and OpenCode](https://www.rams.ai/)
- [The Agent Skills Directory](https://skills.sh/)
- [Pencil -- Design on canvas. Land in code.](https://www.pencil.dev/downloads)
- [supabase/agent-skills](https://github.com/supabase/agent-skills)
- [kepano/flexoki](https://github.com/kepano/flexoki)
- [timescale/pg_textsearch](https://github.com/timescale/pg_textsearch)
- [ibelick/ui-skills](https://github.com/ibelick/ui-skills)
- [Clawdbot -- Personal AI Assistant](https://clawd.bot/)
- [antfu/skills](https://github.com/antfu/skills)
- [AGENTS.md outperforms skills in our agent evals - Vercel](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)
- [PsiACE/skills](https://github.com/PsiACE/skills)
- [tw93/Kaku](https://github.com/tw93/Kaku)
- [0xdres/astro-devosfera](https://github.com/0xdres/astro-devosfera)
- [Polymarket/polymarket-cli](https://github.com/Polymarket/polymarket-cli)
- [vercel/chat](https://github.com/vercel/chat)
- [bubbuild/bub](https://github.com/bubbuild/bub)
- [Designing delightful frontends with GPT-5.4](https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4)
- [OneKeyHQ/app-monorepo .claude/skills](https://github.com/OneKeyHQ/app-monorepo/tree/x/.claude/skills)
- [那些买刚需房的年轻人](https://mp.weixin.qq.com/s/h_NKu5Hf63sj9Jgonol1gQ)

#### 书籍

- [**天幕红尘**](https://book.douban.com/subject/37871916/)，想表达的东西可能更宏大，政治、哲学，不过反而被其中九几年的预制菜商业模式吸引了，算是还挺切合热点的。
- [**大雪将至**](https://book.douban.com/subject/27115714/)，最近在读。

#### 播客

- [S1E19 - 半年了！Vibe Coding 現在怎麼了?](https://www.youtube.com/watch?v=fPxH1LIwF2U)

#### 文章

- [Shipping at Inference Speed](https://steipete.me/posts/2025/shipping-at-inference-speed)，不知不觉就读完了，强烈推荐给每个正在或打算使用 coding agent 开发的人。
- [Scaling PostgreSQL to power 800 million ChatGPT users | OpenAI](https://openai.com/index/scaling-postgresql/)，最近刚好在做数据库优化，很必要！
- [How we rebuilt Next.js with AI in one week | Cloudflare](https://blog.cloudflare.com/vinext/)，从 Rewrite in Rust 发展到 Rewrite using AI 了。

#### 视频

- [High School Dropout to OpenAI Researcher - Gabriel Petersson Interview](https://www.youtube.com/watch?v=vq5WhoPCWQ8)
- [图灵的猫：AI进化的”加速度”其实正在变快【老蒋播客 07】](https://www.bilibili.com/video/BV1oKBxBZEYa)
- [我又拿百大了！这次是躺着……2025年终总结](https://www.bilibili.com/video/BV16xz5BuE95)
- [20万粉第一条日语vlog：请回答2025](https://www.bilibili.com/video/BV1b1zdBqEbG)
- [深度访谈十年 ECharts 开发者，程序员如何把副业做成主业 | Anyway.FM 对谈羡辙](https://www.bilibili.com/video/BV1g4FCz9EHb)
- [也没人跟我说延吉能这么玩啊！](https://www.bilibili.com/video/BV1cuFezLEE2)
- [拍了30年照片后，妈妈的相册里都有啥？](https://www.bilibili.com/video/BV1ZccFz1Ey1)
- [美国超市就能买到枪？比买菜更简单！](https://www.bilibili.com/video/BV1AYwQzzEbV)
- [跨国恋的尽头是跨物种恋，从甜蜜浪漫到每天害怕](https://www.bilibili.com/video/BV1TRwezhEAm)
- [在性产业”合法”的地方，我们看到了...](https://www.bilibili.com/video/BV1k9wDzKEvS)

#### 剧集

- [**东京大饭店**](https://movie.douban.com/subject/33464695/)，虽然剧情算不上多新颖，但是很喜欢节奏和每个人物的性格！！！
- [**我的天才女友 第一季**](https://movie.douban.com/subject/28427782/)，很贴切又有带着些窒息的小镇叙事。

#### 电影

- [**幼豹成长记**](https://movie.douban.com/subject/36875044/)，最后长大后的幼豹以一样的姿态像是传承一样从树上落下的时候莫名还有些感动。
- [**徒手攀岩**](https://movie.douban.com/subject/30167509/)，前段时间爬台北 101 的 Alex 的纪录片，看纪录片倒是有了更多对于热爱、爱情、生活这些的新视角。

#### 动漫

- [**葬送的芙莉莲 第二季**](https://movie.douban.com/subject/36829083/)，在追。
