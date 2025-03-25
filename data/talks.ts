import type { Talk } from '~/types'

export const talks: Talk[] = [
  {
    title: '和 Web3 从业者聊聊天 by polebug',
    description: '',
    presentations: [
      {
        date: '2023-09-14',
        location: 'Bilibili',
        conference: '#4 从英语专业到智能合约开发的 pseudoyu 🐙',
        lang: 'zh',
        conferenceUrl: 'https://space.bilibili.com/58078997',
      },
    ],
  },
  {
    title: 'Solidity Bootcamp',
    description: 'Help ✦ Developers ✦ get on the Success Way to Web3',
    presentations: [
      {
        date: '2023-11-09',
        location: 'Online',
        conference: 'Solidity 基础与实战、Foundry 框架入门',
        lang: 'zh',
        conferenceUrl: 'https://openbuild.xyz/learn/challenges/',
      },
    ],
  },
  {
    title: 'Web3 前端训练营',
    description: '2024 成为 Web3 开发',
    presentations: [
      {
        date: '2024-06-04',
        location: 'Online',
        conference: '智能合约开发基础与实践',
        lang: 'zh',
        conferenceUrl: 'https://openbuild.xyz/learn/challenges/2036589711',
      },
    ],
  },
  {
    title: 'muChiangMai',
    description: 'the first web3 pop-up city in SEA',
    presentations: [
      {
        date: '2023-10-12',
        location: 'Chiang Mai',
        conference: 'Building a Full Stack Social ÐApp With Solidity On Crossbell Blockchain',
        lang: 'en',
        conferenceUrl: 'https://the-mu.xyz/blog/muchiangmai',
      },
    ],
  },
  {
    title: 'AdventureX 2024',
    description: '创造者的一次极限创造挑战',
    presentations: [
      {
        date: '2024-06-16',
        location: '杭州',
        conference: '使用 Solidity 与 React 构建全栈 AdventureX Badge Ðapp - 实战',
        lang: 'zh',
        conferenceUrl: 'https://txbkgr9c72.feishu.cn/minutes/obcnj2bb43746x7rdfq5e52c',
      },
      {
        date: '2024-06-16',
        location: '杭州',
        conference: '使用 Solidity 与 React 构建全栈 AdventureX Badge Ðapp - 基础',
        lang: 'zh',
        conferenceUrl: 'https://txbkgr9c72.feishu.cn/minutes/obcnj227gx2o18s95226uc3c',
      },
    ],
  },
  {
    title: 'Invisible Garden',
    description: 'Ethereum | Zero Knowledge | Artificial Inteligence | Cybersecurity',
    presentations: [
      {
        date: '2024-10-10',
        location: 'Chiang Mai',
        conference: 'EIPs, ERCs Explanation and Foundry Kickstart',
        lang: 'en',
        conferenceUrl: 'https://www.youtube.com/watch?v=9UZdzHhXhWI',
      },
      {
        date: '2024-10-12',
        location: 'Chiang Mai',
        conference: 'Foundry Framework',
        lang: 'en',
        conferenceUrl: 'https://www.youtube.com/watch?v=kMc1CwfZK8U',
      },
    ],
  },
  {
    title: 'Mantle Meetup 上海站',
    presentations: [
      {
        date: '2025-03-23',
        location: '上海',
        conference: 'Mantle APAC Hackathon 2024 获奖项目分享 —— Web3Insights',
        lang: 'zh',
        conferenceUrl: 'https://gamma.app/docs/Web3Insights-t4v0z20943sbn9b',
      },
    ],
  },
  {
    title: 'Monad 101 BootCamp',
    presentations: [
      {
        date: '2025-03-20',
        location: 'Twitter Space',
        conference: 'Monad Testnet AMA',
        lang: 'zh',
        conferenceUrl: 'https://x.com/i/spaces/1OdKrDnNLgQJX',
      },
      {
        date: '2025-03-18',
        location: 'Online',
        conference: 'Monad 101 第一讲：走进 Web3 世界',
        lang: 'zh',
        conferenceUrl: 'https://openbuild.xyz/learn/challenges/2060691796',
      },
      {
        date: '2025-03-25',
        location: 'Online',
        conference: 'Monad 101 第二讲：Solidity 快速入门',
        lang: 'zh',
        conferenceUrl: 'https://openbuild.xyz/learn/challenges/2060691796',
      },
    ],
  },
]

talks.forEach((talk) => {
  talk.presentations.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
})

talks.sort((a, b) => {
  return new Date(b.presentations[0].date).getTime() - new Date(a.presentations[0].date).getTime()
})
