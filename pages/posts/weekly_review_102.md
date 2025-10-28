---
title: "周报 #102 - 我是如何使用 AI 的"
date: 2025-10-28T02:38:00.000+0800
lang: zh
duration: 5min
---

## 前言

![weekly_review_102](https://image.pseudoyu.com/images/weekly_review_102.png)

本篇是对 `2025-10-20` 到 `2025-10-27` 这周生活的记录与思考。

这周大部分时间在处理工作，还给公司内部团队分享了 LLMs 工作流和一些 AI 的日常实践，也看到了「[How I Use AI](https://labs.davidbauer.ch/how-i-use-ai/)」这个页面，刚好就在周报分享一下自己目前工作生活中使用 AI 的一些场景。

## Agents 工具

日常最高频的场景还是 AI Coding，从去年 7 月开始高频用 Cursor 开始，短短一年多竟然在模型和形态方面都有了天翻地覆的改变，自己也算是一个个体验过来，有些心得体悟。

### Cursor

![cursor_index_feature](https://image.pseudoyu.com/images/cursor_index_feature.png)

我在接近一年的时间里都在高频使用，每月 20 刀的额度还算慷慨，综合来讲很均衡，内置各类最新模型（Codex, Claude Sonnet 4.5 等），输出速度快、Tab 补全功能强、基于 IDE 的 UI 交互做得很好，且不断迭代，能很方便地管理规则和记忆，引入外部文档作为上下文，可视化 MCP 配置等，Checkpoint 功能强大，能很方便地回滚到各个存档点，可以放心 Vibe。

但感觉全局代码理解能力不够强，主要还是基于上下文而不是 grep/rg 等命令行工具实时搜索文档，需要持续提供与调整，并且在一个会话过长后幻觉比较严重，上下文压缩不够智能。

因为 Cursor 的输出质量相对稳定，且自己比较方便管理上下文，适合在现有项目某个模块基础上比较清晰的功能开发或 bug 修复，也很适合做一些 UI 开发（例如结合 figma mcp 等）。

### Claude Code

![cc_mate_claude_code](https://image.pseudoyu.com/images/cc_mate_claude_code.png)

今年 7 月开始高频使用 Claude Code，也经历了从惊艳到失望，再到习惯的心路历程。

Claude Code 是第一个比较完善的模型第一方命令行工具，可以灵活用各种 bash/shell 脚本来自己补足上下文或进行测试，配合 Opus 4.1/Sonnet 4.5 结合编程能力强 + 输出稳定，在相对明确指令/需求文档下执行较为准确。

且因为命令/生态功能相对丰富，有类似 [SuperClaude](https://github.com/SuperClaude-Org/SuperClaude_Framework) 这样的拓展项目，也有大量的 Commands, Skills 和 Plugins，且有像是 Randy 开发的 [CC Mate](https://randynamic.org/ccmate) 这样的 UI 工具来可视化配置，已经极大补足了与 Cursor 之间的差距。

但毕竟是基于命令行，回滚功能不太好，通过指令进行回滚有时候不太准确，需要自己用 git 进行版本管理。并且随着 Anthropic 政策的更改，即使是 Claude Max Plan，整体额度也偏少，Opus 4.1 费用高 + 额度少，有事会在做到一半的时候限额了，时常会影响开发流。

因为 Claude 深耕 Coding Agent 领域比较久，虽然依然受制于命令行工具的形态，但功能已经较为完备，很适合通过明确的需求文档 + 指令进行一些新功能开发或是 bug 修复，可以采用 [PRP](https://github.com/coleam00/context-engineering-intro/tree/main/PRPs) 的 [Context Engineering](https://github.com/coleam00/context-engineering-intro) 的模式。

我的日常使用命令：

```bash
claude --dangerously-skip-permissions
```

### Codex

![codex5_start](https://image.pseudoyu.com/images/codex5_start.png)

原本我以为 Claude Code 已经足够强大了，没想到近两个月 OpenAI 厚积薄发，依靠 gpt-5 和后来的 gpt-5-codex 模型后来居上。

我在近一个月也开始高频使用，能感觉到它对上下文的理解和关联能力很强，且可通过命令行参数开启 web 搜索，综合 One Shot 能力非常强，适合做一些创新解决方案或是从零完成一个需求。

但由于同样是基于命令行，依然有回滚功能不强的问题。但 Codex 的命令行工具相对 Claude Code 更为简陋，功能不够丰富，生态支持也偏少。

另外还有个硬伤就是实在太慢了，所以我更多在一些更完整独立需求的时候使用，并且经常会用来做方案调研或是写文档，日常的一些明确需求依然用 Claude Code 偏多。

我的日常使用命令：

```bash
codex -m gpt-5-codex -c model_reasoning_effort='high' --yolo --search
```

### Warp.dev

![warp_cherry_pick](https://image.pseudoyu.com/images/warp_cherry_pick.png)

Warp 是独立的命令行工具应用，我在「[Warp，iTerm2 还是 Alacritty？我的终端折腾小记](https://www.pseudoyu.com/zh/2022/07/10/my_config_and_beautify_solution_of_macos_terminal)」一文中就介绍过。

最近就新增了 Coding Agent 功能，但我最常用的是通过自然语言生成一些命令行，例如 kill 一些占用端口的应用或是一些 git 复杂指令，我在开发中经常用到的是我在某个 feature 分支的多个提交 cherry pick 到测试分支/主分支等。

### v0.dev

![v0dev_sample](https://image.pseudoyu.com/images/v0dev_sample.png)

同类的平台有很多，例如 Replt.it, Bolt.new 和 Lovable 等，我唯一在用的是 Vercel 官方出品的 v0.dev，它与 Next.js 及 Shadcn 深度集成，很适合通过自然语言对话的方式去实现一些小的 MVP、Landing Page 等。

![v0_shadcn_cli](https://image.pseudoyu.com/images/v0_shadcn_cli.png)

可以通过 shadcn 命令行一键添加到自己的项目进行二次开发，比较适合有 figma 设计稿或是参考网页的快速复刻或是独立开发一些全栈项目时的初版，后续可以基于生成的整体代码进行二次开发和优化。

v0 生成 UI 的质感整体还是审美很在线的，比一般 LLMs 生成的要有质感得多，可惜就还是后续没有很好的工作流和正在开发的代码集成，所以更多还是做一些小的 PoC 玩具和做一些小模块设计。

### Gamma

![gamma_import](https://image.pseudoyu.com/images/gamma_import.png)

除了开发外，我偶尔还有一些做分享的需求，通常会在 ChatGPT 或是 Claude 中生成我所想要讲的主题和大纲，并使用 [Gamma](https://gamma.app/) 这一工具进行 PPT 制作。

![gamma_slide](https://image.pseudoyu.com/images/gamma_slide.png)

可以通过大纲一键生成不同风格主题的 Slides 文稿，并且提供了 Agent 模式，有类 Cursor 的 PPT 制作体验，可以不用自己手动调整模板等。

### Toki

![toki_sample](https://image.pseudoyu.com/images/toki_sample.png)

另一个日常使用到的是 AI 应用是一个 TG Bot，原来叫 Dola，最近改名为 [Toki](https://yestoki.com/) 了，关联了 Google Calendar 后，可以很方便可以通过对话来管理日程，虽说很多 LLMs 应用或是 MCP 都能做到，但用了两年左右感觉 Toki 的易用性和稳定性都很强，配合 Notion Calendar，基本上不会错过什么日程了，算是一个小众但实用的工具了。

## 我的 LLMs 开发工作流实践

![llm_coding_workflow](https://image.pseudoyu.com/images/llm_coding_workflow.png)

当开始一个新的功能开发/需求时，我会首先定位到这个需求是基于哪个仓库开发，并同时打开 Claude Code 与 Codex 进行初始化，形成各个 Agent 对项目代码仓库的基础的文档沉淀。

如果是需要协同多个仓库开发的场景，可以定义一个外部的例如 `feat-xxx/` 文件夹，并将相关的 git repo 都置于这个文件夹目录下，并进行初始化，后续 agent 都会在这个项目目录下执行，要注意的是，需要将每一个 repo 都切换到对应 feat 分支进行开发，以免后续代码版本管理混乱。

接着向 codex 描述清楚相应的需求，让 codex 总结成详细的 feature 描述，并根据实际需求让 codex 进行调整，如果需求相对清晰简单，可以直接让 codex 执行即可。

如果牵扯到代码复杂度较高，可以采用 Claude Code 的[自定义命令](https://github.com/coleam00/context-engineering-intro/tree/main/.claude/commands)，生成较为详细的 [PRPs/](https://github.com/coleam00/context-engineering-intro/tree/main/PRPs) 文档，主要流程为：

- 在 Claude Code 中执行 `/generate-prp` 命令，在命令之后输入 codex 生成的 feature 描述
- Claude Code 命令会根据模板和提供的功能需求生成一份详尽的需求文档，会在 `PRPs/feat-xxx.md` 中，可以继续在对话中进行修改调整，需求完成后， 调用 `/clear` 命令来清理当前上下文
- 通过 Claude Code 执行 `/execute-prp PRPs/feat-xxx.md` 命令来完成需求，时间相对比较长，如因网络等问题中断，可以重复执行命令（进度与 TODO 会在文档中标注）

PRP 大体框架如下：

```plaintext
# Product Requirements Document (PRD)

## Objective
- [Clearly defined, measurable feature goals]

## Technical Constraints
- [Non-negotiable technical decisions]
- [Architectural principles that must be followed]

## Quality Standards
- [Performance benchmarks]
- [Maintainability requirements]
- [Test coverage criteria]

## Integration Requirements
- [External dependencies inventory]
- [Interface specifications]

## Deliverables Definition
- [Code organization patterns]
- [Documentation requirements]
```

这种方式看似只是现在各类 Agent Plan Mode 的延续，但基于 PRPs 文档，通过上下文消除 Agent 生成代码的不确定性，并且在多人协同开发时能够共享 AI 文档库，后续开发需求也会将既有 PRP 文档作为上下文，保持代码的稳定性。

我目前基于这样的开发工作流模式，已经将绝大多数精力放在了梳理需求与 Review 代码而不是代码的实际开发，效率提升了很多倍，但其实也少了很多写代码纯粹的快乐与心流的感觉，或许也是一种代价吧。

## 有趣的事与物

### 输入

虽然大部分有意思的输入会在 「[Yu's Life](https://t.me/s/pseudoyulife)」 Telegram 频道里自动同步，不过还是挑选一部分在这里列举一下，感觉更像一个 newsletter 了。

我把 Telegram Channel 消息作为内容源搭建了一个微博客 —— 「[daily.pseudoyu.com](https://daily.pseudoyu.com/)」，可以更方便浏览了。

#### 收藏

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)
- [How I Use AI](https://labs.davidbauer.ch/how-i-use-ai/)

#### 文章

- [我使用 Claude Code 开发 Rolldown 的体验](https://hyf.me/blog/claude-code-in-rolldown)
