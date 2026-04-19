---
title: "周报 #107 - 基于 Multica 与 Impeccable 的开发/设计工作流"
date: 2026-04-19T23:15:00.000+0800
lang: zh
duration: 8min
---

## 前言

![weekly_review_107](https://image.pseudoyu.com/images/weekly_review_107.png)

本篇是对 `2026-03-30` 到 `2026-04-19` 这三周生活的记录与思考。

清明假期没出门，在家窝着写代码，清掉了很多 TODO，久违地感受到 Vibe Coding 带来的快乐；用 [Impeccable](https://impeccable.style/) 把 Web3Insight 还有一些网站重新设计了一下，效果出乎意料地好；也开始用 Multica 重新梳理了自己各个项目的工作流，是自己很满意的 Agent 协作形态了，很沉迷；陪学姐去江阴参加了游泳比赛；还有很多有意思的事。

## 基于 Multica 的 Agent 开发工作流

之前 Xuanwo 在做一个叫 [Luban](https://github.com/Xuanwo/luban) 的 IDE 工具，其中就主要使用了看板这一形态，当时重度使用，也参与了一些贡献，一直觉得这也是未来 Agentic 开发的新形态，不过后来没再更新了，于是在等 Linear 是否会推出能够连本地 Coding Agent 的工具。

然后突然在 Twitter 上看到了一个很有意思的开源项目 [Multica](https://multica.ai/)，是 Devv 的创始人做的，很早期但功能已经可用，开源第一天我就尝试自部署用上了，很惊喜，稍作配置就融合了我原本的开发工作流。

![multica_runtime](https://image.pseudoyu.com/images/multica_runtime.png)

它最巧妙的设计是通过 `multica` 命令行连接自部署的 server 端，把本机设备设置成一个 Runtime，而不需要自己单独去重新配置各种 Rules、MCP 等。

![multica_agents](https://image.pseudoyu.com/images/multica_agents.png)

注册了 Runtime 之后，就可以创建 Agents，可以为每个 Agent 设置不同的指令、Skills、自定义参数，这样可以自定义一个 “AI 员工”，为它配置工作职责范围与技能等。

![multica_new_issue](https://image.pseudoyu.com/images/multica_new_issue.png)

而后续在新建 Issues 的时候就可以直接指定给 Agent 员工，由于各个 Agent 员工的工作记录都在 Multica 平台中记录着，这样等于所有不同同事们的本地 Agent 奇妙地有了一个共享知识库和上下文，在一些关联性比较高的协作任务中尤其有用。

![multica_autopilot](https://image.pseudoyu.com/images/multica_autopilot.png)

Multica 做得最好的其实还是克制，起初并没有过多去增加太多看板相关的功能，甚至连搜索功能都没有，而是更多放在了与本地 Agents 的链接上，而这三周也陆续增加了 Projects 以及 Autopilot 功能，可以在 Workspace 中区分项目，以及可以自动地做一些定时/重复性的任务，现在也还在快速更新迭代中，期待能够有更多贴合工作流的功能。

还在将自己更多项目实践引入 Multica，以及尝试和新搭建的 Hermes Agent 进行结合，后续看看能不能把开发、测试、预发布验证和正式发布流程更加完善。

## Impeccable 设计工作流

其实之前就使用过 [Frontend Design](https://claude.com/plugins/frontend-design)、[web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) 和 [ui-ux-pro-max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) 插件与 Skills 来进行 UI/UX 的交互优化设计，但其实只是一些最佳实践的辅助，并没有很系统性地做一些风格设计等，大部分都还是基于 [v0.dev](https://v0.app/) 的基础设计能力。

而最近看到另一个项目 [Impeccable](https://impeccable.style/)，在 Web3Insight 项目上尝试了一下，效果出乎意料地好。

![web3insight_ai_01](https://image.pseudoyu.com/images/web3insight_ai_01.png)

![web3insight_ai_02](https://image.pseudoyu.com/images/web3insight_ai_02.png)

![web3insight_ai_03](https://image.pseudoyu.com/images/web3insight_ai_03.png)

![web3insight_dash_01](https://image.pseudoyu.com/images/web3insight_dash_01.png)

![web3insight_dash_02](https://image.pseudoyu.com/images/web3insight_dash_02.png)

详细视频可以看[这条动态](https://t.me/pseudoyulife/4398)或者直接访问如下网站：

- [Web3Insight.ai](https://web3insight.ai/)，Landing Page
- [Web3Insight Dashboard](https://dash.web3insight.ai/)，主站/数据面板

Impeccable 很好的一点是把抽象的 UI 设计拆成了几个步骤，在新设计/改动原有项目设计之前，会先通过 `/impeccable teach` 对项目进行分析，形成一份 `.impeccable.md` 文档，就像是使用 Claude Code 或者 Codex 进行开发时的 `CLAUDE.md` 与 `AGENTS.md`，但这份文档并不是记录详细设计细节，而是对网站的用户画像、使用习惯、品牌调性等进行分析，这些会更宏观地影响整个设计风格，例如对 Web3Insight 网站的[分析](https://github.com/web3insight-ai/web3insight.ai/blob/main/.impeccable.md)。

![impeccable_commands](https://image.pseudoyu.com/images/impeccable_commands.png)

后续的所有开发都会基于整体的设计原则和思路进行拓展，通过 `/impeccable craft` 来新设计页面/组件，通过 `/critique` 与 `/audit` 来分析和审计当前设计的问题，以及通过 `/polish`、`/optimize` 或是 `/animate` 等命令来针对特定设计方向进行针对性优化，这样能够生成更可持续复用的设计组件而不是为了某个页面优化引入的”一次性代码“。

## 个人生活剪影

![euka_launch](https://image.pseudoyu.com/images/euka_launch.jpg)

最近有很多工作任务到了收尾阶段，还经历了一次惊魂未定的「上线 -> Vercel Rollback -> 二次上线」 ，跟所有用户 Payment 有关的大重构上生产的体验真的太吓人了，从 5am 肝到了第二天 5am，但比起之前工作的忙碌，这次反而不觉得累，果然工作成就感和热情才是最影响工作状态的。

![boyi_swimming_jiang_yin](https://image.pseudoyu.com/images/boyi_swimming_jiang_yin.png)

这几周也由于一直忙项目几乎没怎么出门，周末护送学姐去江阴参加了一场游泳比赛，两天密集的行程有些累，但学姐得了个第五名，有种家长带小孩去参加兴趣班和比赛的成就感。

活动本身的话，我自己不算是游泳爱好者，但也有被现场的活力和体育精神感染到，更加下定决心开始规律运动了。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/s/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。

我把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [用開源專案建立職涯：從 Ruby 使用者到維護者的經驗分享](https://st0012.dev/zh-tw/building-a-career-with-open-source/)，AI 时代开源更加容易却也更加可贵了。
- [tape x topic: 我对智能体上下文的组织方式](https://blog.scnace.me/post/tapextopic/)，最近也在研究怎么样使用 Tape Systems 结合进团队级的应用场景，很实用的文章。
- [Agent Interaction Guidelines (AIG) – Linear Developers](https://linear.app/developers/aig)，Linear 来制定这个 Guideline 很有信服力。
- [multica-ai/multica](https://github.com/multica-ai/multica)，感觉很适合作为小团队实践。
- [Supabase docs over SSH](https://supabase.com/blog/supabase-docs-over-ssh)，很新奇的文档方式，试试看和 Skills 以及 CLI 相比有什么差异。
- [Vibe Island - Dynamic Island for Your AI Agents](https://vibeisland.app/)，这个时代最有付费意愿的是好看 & 有趣的软件了。

#### 文章

- [我们为什么要重写 bub? | Frost's Blog](https://frostming.com/posts/2026/why-rewrite-bub/)，我没有自己部署 bub，但是现在所有 Agent 的理念和设计模式都是按照 bub 和 tape.systems 来构建的，影响了很多。

#### 视频

- [賺錢和理想人生？一家三口存款五萬，客廳有榻榻米和日式地爐【誰來晚餐16-2】](https://www.youtube.com/watch?v=33FwONNsIMk)
- [穿过五代十国，看懂《太平年》。｜吴越｜钱弘俶｜北宋｜赵匡胤｜五代十国](https://www.youtube.com/watch?v=PBMCymn7rmg)
- [职场打工人都得掌握的字体审美，少走五年弯路！？](https://www.bilibili.com/video/BV18o9nBVEUq)
- [带着 100 万，我们揭开了赌场的秘密…](https://www.bilibili.com/video/BV1Nn9TBhEYR)
- [Multica.ai Compared: Paperclip, Vibe Kanban & AI Workflows](https://www.youtube.com/watch?v=sJJGs5ze-WI)

#### 剧集

- [**爱的迫降**](https://movie.douban.com/subject/33425578/)，下饭看的，脑洞很大，还有一些有趣的跟《隐秘而伟大》的联动，看完有点想去了解下朝鲜/延吉的真实生活了。
- [**单身即地狱 第五季**](https://movie.douban.com/subject/37233693/)，第一次看韩国真人秀/恋综，太喜欢珉志了！感觉恋综最大的魅力还是在帮助自己重新关注到感情和生活里浪漫的部分，在为别人感情感动的同时也提醒自己不要忘记表达爱。
- [**莎拉的真伪人生**](https://movie.douban.com/subject/37019235/)，看到奈飞推荐好奇点开看的，剧情牵强但是节奏还算可以。
- [**我的天才女友 第二季 / 第三季 / 第四季**](https://movie.douban.com/subject/35785050/)，四季一口气看完有种陪着角色度过了整个人生的怅然，贫穷的小镇、暴力、金钱、政治，拥有平凡的一生常常也会是一种奢求。
- [**太平年**](https://movie.douban.com/subject/36317421/)，可能因为讲的是吴越，和看《大明王朝1566》杭州时候有一种莫名亲切感，虽然有矫饰和美化，但还是很能让人回到那段历史的正剧了，近几年都难得找到像水丘公的剧情那样让我整个人都被牵动了。
- [**黑袍纠察队 第五季**](https://movie.douban.com/subject/36343491/)，在看。
