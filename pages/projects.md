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
    - name: 'RSSHub'
      link: 'https://github.com/DIYgod/RSSHub'
      desc: '🧡 Everything is RSSible'
    - name: 'Folo'
      link: 'https://github.com/RSSNext/Folo'
      desc: '🧡 Follow everything in one place'
    - name: 'RSS3 Node'
      link: 'https://github.com/RSS3-Network/Node'
      desc: 'The RSS3 Node, an RSS3 Data Sublayer (DSL) component'
  Design / Art:
    - name: 'In the Mood for Love'
      link: 'https://www.yuloveboyi.com'
      desc: 'An online exhibition for Boyi & Yu'

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
