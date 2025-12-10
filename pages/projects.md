---
title: Projects - pseudoyu
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Current Focus:
    - name: 'Web3Insight'
      link: 'https://github.com/web3insight-ai/web3insight'
      desc: 'A comprehensive metric system for Web3'
    - name: 'Web3Insight Dashboard'
      link: 'https://dash.web3insight.ai/'
      desc: 'Web3Insight data metrics dashboard'
    - name: 'Web3Insight Dev Card'
      link: 'https://card.web3insight.ai/'
      desc: 'Web3Insight Dev Card'
  RSS3:
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
    - name: 'Wan - The Final Sea'
      link: 'https://apps.apple.com/cn/app/thewan/id6670795669'
      desc: 'A personal digital footprint aggregation tool that helps you easily and automatically collect valuable content (iOS only)'
    - name: 'EpubKit'
      link: 'https://epubkit.app/'
      desc: 'The best tool to convert web to ebook'
    - name: 'Flashydeal'
      link: 'https://flashydeal.com/'
      desc: 'Daily Deals, Coupon and more discounts'
  Websites:
    - name: 'YISH EDU'
      link: 'https://yishedu.com/'
      desc: 'the official website of YISH EDU'
    - name: 'FAOA'
      link: 'https://faoaglobal.org/'
      desc: 'The official website of FAOA Global'
    - name: 'Tingtanmei'
      link: 'https://www.tingtanmei.com/'
      desc: 'The official website of Tingtanmei'
  Productivity:
    - name: 'Yu Tools'
      link: 'https://github.com/pseudoyu/yu-tools'
      desc: 'A collection of tools for productivity'
  Books:
    - name: 'Blockchain Guide'
      link: 'https://guide.pseudoyu.com'
      desc: 'Blockchain/Web3 fundamentals'

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
