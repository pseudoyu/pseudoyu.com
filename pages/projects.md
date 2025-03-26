---
title: Projects - pseudoyu
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Current Focus:
    - name: 'Web3Insights'
      link: 'https://github.com/Web3Insights/Web3Insights'
      desc: 'A comprehensive metric system for Web3'
    - name: 'OpenAgent'
      link: 'https://github.com/webisopen/OpenAgent'
      desc: 'The Web3 AI Agent Solution'
    - name: 'RSS3 Node'
      link: 'https://github.com/RSS3-Network/Node'
      desc: 'The RSS3 Node, an RSS3 Data Sublayer (DSL) component'
  RSS Next:
    - name: 'RSSHub'
      link: 'https://github.com/DIYgod/RSSHub'
      desc: '🧡 Everything is RSSible'
    - name: 'Folo'
      link: 'https://github.com/RSSNext/Folo'
      desc: '🧡 Follow everything in one place'
  Smart Contracts:
    - name: 'RSS3 Network'
      link: 'https://rss3.io/'
      desc: 'Smart contracts for the RSS3 Network'
    - name: 'Crossbell'
      link: 'https://crossbell.io/'
      desc: 'The protocol for an ownership platform'
    - name: 'OpenBuild SkillHub'
      link: 'https://openbuild.xyz/shilling'
      desc: 'Smart contracts for the OpenBuild SkillHub'
  Design:
    - name: 'In the Mood for Love'
      link: 'https://www.yuloveboyi.com'
      desc: 'An online exhibition for Boyi & Yu'
  Applications:
    - name: 'EpubKit'
      link: 'https://epubkit.app/'
      desc: 'The best tool to convert web to ebook'
    - name: 'Wan - The Final Sea'
      link: 'https://testflight.apple.com/join/V7znTvCD'
      desc: '个人信息流聚合 App (iOS only)'
    - name: 'YoJoe'
      link: 'https://yojoe.isfool.app/'
      desc: '游酒 - Homebar 解决方案'
    - name: 'Flashydeal'
      link: 'https://flashydeal.com/'
      desc: 'Daily Deals, Coupon and more discounts'
    - name: 'House-Tree-Person Analyzer'
      link: 'https://htp.pseudoyu.com/'
      desc: '基于 Gemini 2.0 Pro 的绘画投射测验平台'
    - name: '小仙帮忙'
      link: 'https://xiaoxian.isfool.app/'
      desc: '基于 Deepseek R1 的八字算命助手'
  Websites:
    - name: 'FAOA'
      link: 'https://faoaglobal.org/'
      desc: 'The official website of FAOA Global'
    - name: 'Tingtanmei'
      link: 'https://www.tingtanmei.com/'
      desc: 'The official website of Tingtanmei'
    - name: 'Ting Community'
      link: 'https://rental.tingtanmei.com/'
      desc: 'The rental page of Ting Community'
  Productivity:
    - name: 'Yu Tools'
      link: 'https://github.com/pseudoyu/yu-tools'
      desc: 'A collection of tools for productivity'
  Books:
    - name: '区块链入门指南'
      link: 'https://guide.pseudoyu.com'
      desc: '区块链/Web3 基础知识与实践'

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
