---
title: "[译] 是什么让 Golang 如此受欢迎？语言创造者的回顾"
date: 2022-06-06T18:21:45.000+0800
lang: zh
type: note
duration: 9min
---

## 前言

自从 2009 年开源以来，[Go 语言](https://go.dev/)的人气一直在增长。其最初创建时背后的五位谷歌软件工程师回顾了[是什么推动了这种增长](https://cacm.acm.org/magazines/2022/5/260357-the-go-programming-language-and-environment/fulltext#R16)。

Go 的五位创造者在《ACM 通讯》中写道，即使是他们，最早的工作也“极大受益于谷歌许多同事的建议和帮助”，而论文的第二句话强调，它现在是一个公共项目，“有成千上万的个人和几十家公司的贡献”。

在强大的社区支持下，Go 已经实现了不可否认的广泛普及。最近的 [Tiobe 指数](https://www.tiobe.com/tiobe-index/)对世界上最受欢迎的编程语言进行了评估，Go 排名第 14 位。

他们的论文指出，[Docker](https://thenewstack.io/category/containers/) 和 [Kubernetes](https://thenewstack.io/category/kubernetes/) 都是用 Go 编写的，并补充说，这种语言也是“主要云服务供应商的关键基础设施的基础，并且是[云原生计算基金会](https://cncf.io/?utm_content=inline-mention)托管的大多数项目的实现方式。”

但更有趣的问题是，为什么 Go 会变得如此流行...

该论文认为，正是 Go 的“以开发为中心的理念”推动其社区蓬勃发展，然后归功于该社区以及它所构建的技术，最终使 Go 成为“现代云计算环境的重要组成部分”。

简而言之，当回顾过去的 13 年，Go 的创造者们认为，Go 因其对软件工程化的“整体环境”的关注而获得成功。“Go 的方法是不将语言特性看作比环境特性更重要”。

论文作者为 [Russ Cox](https://twitter.com/_rsc?lang=en), [Robert Griesemer](https://github.com/griesemer), [Rob Pike](https://twitter.com/rob_pike?lang=en), [Ian Lance Taylor](https://www.linkedin.com/in/ianlancetaylor/) 和 [Ken Thompson](https://www.computer.org/profiles/kenneth-thompson)。

## 早期发展

Go 语言源自谷歌，但这并不影响它的发展，因为自这家搜索引擎公司 1998 年成立到推出 Go，才刚刚过了 10 年。Go 的二进制文件也更容易部署，因为与 Java 的二进制文件不同，Go 的二进制不需要单独的运行时环境来执行。

其他语言特性也使其更具吸引力，因为 Go 是包含“垃圾回收”功能的语言之一，可以自动释放不再被变量使用的内存。论文指出，为此，Go 语言利用了新的多核处理器，在一个专门的内核上运行其垃圾回收，以降低对延迟的影响。

这种并发性是作为语言的核心部分而不是一个独立的可选库提供的。事实上，这在很大程度上解释了为什么 Go 是以这种方式构建的。论文中有一节题为“起源”，描述了 Go 是如何从谷歌的经验中成长起来的，谷歌有一个庞大的多语言代码库，由大约 4000 名活跃的开发人员共享。

他们的日常经验表明，需要一种更好的方式来利用新型多核芯片的性能来处理大规模的负载。回顾过去，该语言的创造者们写道，Go 是他们对“应对这些挑战而设计的语言可能是什么样子”这一问题的回答。Go 是专门为提供一流的并发和并行支持而设计的，这意味着 Go 不仅可以有效地处理多个任务，还可以同时执行多个任务。

在 Go 语言出现，工程师们一直被迫使用笨拙的语法和“大的、固定大小的线程栈”。论文认为，启用并发的线程不受欢迎，因为它们难以创建、使用和管理。一个脚注甚至提到了 [1995 年的论文](https://web.stanford.edu/~ouster/cgi-bin/papers/threads.pdf)，该论文来自 TCl 脚本语言的创造者 John Ousterhout，题为“为什么线程是一个坏主意（对于大多数目的）”。

他们写道：“解决这种矛盾关系是创建 Go 的主要动机之一，后来他们称这是该语言的“主要不寻常属性”。

## 语言设计之外

该文件还称，Go 今天的流行是由于更广泛的科技行业现在经常使用云服务提供商以及它们所实现的大规模生产环境（Go 就是为解决这个问题而设计的），除此之外还有一些其他明显的优势。

后来，该文件指出，Go “移除了在 C 和 C++ 程序中引起大量问题的未定义行为”。(例如，如果代码试图做一些危险的事情，如解引用空指针或使用超出数组、分片界限的索引，Go 会简单地抛出一个运行时异常并停止运行程序。)

但 Go 的创造者们将 Go 的流行归功于其他方面。他们强调，“更重要的是早期的工作，为打包、依赖、构建测试、部署和其他软件开发领域的日常任务建立了基础，这些方面通常在语言设计中并不重要”，这些特性吸引了那些开发者通过有用的包在他们的生态系统中“播种”。虽然最初的版本只支持 Linux 和 MacOS X，但这个热情的社区很快就为 Go 的编译器和库创建了 Windows 版本，并将它们移植到其他操作系统。

该论文认为，对开发者的关注应该贯穿语言的开发。例如，它在早期就注意到 Go 的高质量密码学库（包括对安全通信协议 SSL 和 TLS 的支持）。Go 的标准库还包括了一个内置的 HTTPS 客户端和服务端，用于与其他系统进行在线交互。

但更重要的是 Go 处理库的方式。Go 的编译器被设计成克制地导入必要的库，包含在其二进制文件中。这避免了在其他语言中看到的行为，即只是为了确保包含一个必要的功能就要导入整个库。

考虑到开发人员的需求，Go 允许从其他领域轻松导入外部库（同时包含自动检查兼容版本的方式）。论文指出，“作为一种分布式计算的语言，Go 中没有必须发布 Go 软件包的一个中心化服务器”。(虽然现在有一个可用的 Go 软件包公共镜像，以及包含加密签名的日志）

Go 在标准发行版中还拥有对程序剖析等优化技术的支持，以及对模糊处理等测试功能的支持。该论文指出，Go 甚至有一个代码布局的惯例(Go 的 `gofmt` 工具将源代码解析成这种标准化的布局)。这和其他内置工具能使它更容易建立从 IDE 插件和调试器到框架和构建自动程序的一切。Go 的创造者认为，他们的语言是专门为鼓励创建工具和自动化而设计的，“因此，Go 世界有一个丰富的、不断扩展的、互操作的工具包”。

他们的论文认为，语言只是其吸引力的一部分。“完整的故事必须涉及整个 Go 环境：库、工具、惯例和软件工程的整体方法”。

## 保持一致性

他们论文的另一部分也吹捧了语言的一致性。Go 的创造者们承认，在它最早的几年里，“我们在每一个周的版本中都对它进行修补和调整，用户在更新到新的 Go 版本时，常常不得不改变他们的程序”。

但自 2012 年以来（随着 Go 1 版本的正式发布），“我们公开承诺只对语言和标准库进行向后兼容的修改，因此程序在用较新的 Go 版本编译时将继续运行，不会有任何变化。”

结果如何呢？从那时起，这门语言“几乎被冻结了”，论文解释说。但工具却有了戏剧性的增长，具体来说，就是“更好的编译器，更强大的构建和测试工具，以及改进的依赖性管理，更不用说支持 Go 的大量开源工具了”。论文认为，这有助于鼓励创建教学材料，并吸引用户和“第三方软件包蓬勃发展的生态系统”。

> “虽然大多数语言的设计都集中在语法、语义或类型的创新上，但 Go 却专注于软件开发过程本身”。

> [The Go Programming Language and Environment | May 2022 | Communications of the ACM](https://cacm.acm.org/magazines/2022/5/260357-the-go-programming-language-and-environment/fulltext)

该论文的的一个观点甚至认为 Go 精心平衡的功能集避免了语言开发者的过度扩张。但是，论文的结尾处提到了这一规则的例外情况，即 Go 确实增加了一个重要的新功能。仅仅两个月前，Go 增加了[参数多态性](https://github.com/golang/proposal/blob/4a54a00950b56dd0096482d0edae46969d7432a6/design/go2draft-contracts.md)，它是“为适应 Go 的其他部分而定制的”。

“在坚持一致性、完整性和社区性原则的前提下进行如此大的语言变化，将是对这种方法的严峻考验。”

Go 的创造者们认识到，需要一个社区来维持一种编程语言，也许还需要一个社区来建立一个。论文最后感谢了他们在谷歌的同事，感谢他们在 Go 最早的时候提供的建议和支持，他们预示着社区的支持将如潮水般涌来。“自公开发布以来，由于 Google 的 Go 团队扩大了，再加上一批巨大的开源贡献者，Go 得到了发展和改进。Go 现在是由成千上万的人共同完成的，在此无法一一列举”。

"我们感谢所有帮助 Go 发展到今天的人"。

## 参考资料

> 1. 原文作者：David Cassel
> 2. [原文地址](https://thenewstack.io/what-made-golang-so-popular-the-languages-creators-look-back/)
> 3. [本文永久链接](https://github.com/gocn/translator/blob/master/2022/w18_Golang_creators_look_back.md)
> 4. [译者：张宇](https://github.com/pseudoyu)
> 5. [校对：cvley](https://github.com/cvley)
