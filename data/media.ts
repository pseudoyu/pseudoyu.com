export type MediaType = 'anime' | 'book' | 'movie' | 'drama' | 'game'
export type MediaState = 'done' | 'doing' | 'todo'

export interface MediaRecord {
  name: string
  creator?: string
  state?: MediaState
  date?: string
  note?: string
  lang?: string
}

export const anime: MediaRecord[] = [
  {
    name: '葬送的芙莉莲',
    creator: '铃木智寻',
    date: '2023',
  },
  {
    name: '我推的孩子',
    creator: '平牧大辅',
    date: '2023',
  },
  {
    name: '四叠半神话大系',
    creator: '汤浅政明',
    date: '2010',
  },
  {
    name: '灵能百分百',
    creator: '立川让',
    date: '2016',
  },
  {
    name: '她和她的猫',
    creator: '新海诚',
    date: '2016',
  },
  {
    name: '狼的孩子雨和雪',
    creator: '细田守',
    date: '2012',
  },
  {
    name: '夏日重现',
    creator: '渡边步',
    date: '2022',
  },
  {
    name: '英雄联盟：双城之战',
    creator: 'Riot Games',
    date: '2021',
  },
  {
    name: '辉夜大小姐想让我告白',
    creator: '畠山守',
    date: '2019',
  },
  {
    name: '瑞克和莫蒂',
    creator: '贾斯汀·罗兰',
    date: '2013',
  },
  {
    name: '擅长捉弄的高木同学',
    creator: '赤城博昭',
    date: '2018',
  },
  {
    name: '萤火之森',
    creator: '大森贵弘',
    date: '2011',
  },
  {
    name: '千与千寻',
    creator: '宫崎骏',
    date: '2001',
  },
]

export const book: MediaRecord[] = [
  {
    name: '福格行为模型',
    creator: 'B.J.福格',
  },
  {
    name: '創作者的日常生活',
    creator: 'Mason Currey',
  },
  {
    name: '静寂工人：码头日与夜',
    creator: '魏明毅 ',
  },
  {
    name: '我的职业是小说家',
    creator: '村上春树',
  },
  {
    name: '毛姆读书随笔',
    creator: 'W.S.毛姆',
  },
  {
    name: '悉达多',
    creator: '赫尔曼·黑塞',
  },
  {
    name: '送你一颗子弹',
    creator: '刘瑜',
  },
  {
    name: '斯通纳',
    creator: '约翰·威廉斯',
  },
  {
    name: '杀死一只知更鸟',
    creator: '哈珀·李',
  },
  {
    name: '霍乱时期的爱情',
    creator: '加西亚·马尔克斯',
  },
  {
    name: '漫长的告别',
    creator: '雷蒙德·钱德勒',
  },
  {
    name: '圆圈正义',
    creator: '罗翔',
  },
  {
    name: '道林·格雷的画像',
    creator: '奥斯卡·王尔德',
  },
  {
    name: '罪与罚',
    creator: '陀思妥耶夫斯基',
  },
  {
    name: '洞穴奇案',
    creator: '彼得·萨伯',
  },
  {
    name: '自卑与超越',
    creator: '阿尔弗雷德·阿德勒',
  },
]

export const movie: MediaRecord[] = [
  {
    name: '爱情神话',
    creator: '邵艺辉',
    date: '2021',
  },
  {
    name: '生活多美好',
    creator: '弗兰克·卡普拉',
    date: '1946',
  },
  {
    name: '戏梦巴黎',
    creator: '贝纳尔多·贝托鲁奇',
    date: '2003',
  },
  {
    name: '人生果实',
    creator: '伏原健之',
    date: '2017',
  },
  {
    name: '奥本海默',
    creator: '克里斯托弗·诺兰',
    date: '2023',
  },
  {
    name: '千寻小姐',
    creator: '今泉力哉',
    date: '2023',
  },
  {
    name: '互联网之子',
    creator: '布莱恩·耐本伯格',
    date: '2014',
  },
  {
    name: '爱乐之城',
    creator: '达米恩·查泽雷',
    date: '2016',
  },
  {
    name: '花样年华',
    creator: '王家卫',
    date: '2000',
  },
  {
    name: '驴得水',
    creator: '周申',
    date: '2016',
  },
  {
    name: '罗马假日',
    creator: '威廉·惠勒',
    date: '1953',
  },
  {
    name: '偶然与想象',
    creator: '滨口龙介',
    date: '2021',
  },
  {
    name: '步履不停',
    creator: '是枝裕和',
    date: '2008',
  },
  {
    name: '斯图尔特：倒带人生',
    creator: '戴维·阿特伍德',
    date: '2007',
  },
  {
    name: '花束般的恋爱',
    creator: '土井裕泰',
    date: '2021',
  },
  {
    name: '波西米亚狂想曲',
    creator: '布莱恩·辛格',
    date: '2018',
  },
  {
    name: '布达佩斯大饭店',
    creator: '韦斯·安德森',
    date: '2014',
  },
  {
    name: '卢旺达饭店',
    creator: '特瑞·乔治',
    date: '2004',
  },
  {
    name: '爱在黎明破晓前',
    creator: '理查德·林克莱特',
    date: '1995',
  },
  {
    name: '社交网络',
    creator: '大卫·芬奇',
    date: '2010',
  },
  {
    name: '两杆大烟枪',
    creator: '盖·里奇',
    date: '1998',
  },
  {
    name: '素媛',
    creator: '李濬益',
    date: '2013',
  },
  {
    name: '窃听风暴',
    creator: '弗洛里安·亨克尔·冯·多纳斯马',
    date: '2006',
  },
  {
    name: '教宗的承继',
    creator: '安东尼·麦卡滕',
    date: '2019',
  },
  {
    name: '爱尔兰人',
    creator: '马丁·斯科塞斯',
    date: '2019',
  },
  {
    name: '乔乔的异想世界',
    creator: '塔伊加·维迪提',
    date: '2019',
  },
  {
    name: '小妇人',
    creator: '格蕾塔·葛韦格',
    date: '2019',
  },
  {
    name: '阳光普照',
    creator: '钟孟宏',
    date: '2019',
  },
  {
    name: '婚姻故事',
    creator: '诺亚·鲍姆巴赫',
    date: '2019',
  },
  {
    name: '小丑',
    creator: '托德·菲利普斯',
    date: '2019',
  },
  {
    name: '聚焦',
    creator: '托马斯·麦卡锡',
    date: '2015',
  },
  {
    name: '小偷家族',
    creator: '是枝裕和',
    date: '2018',
  },
  {
    name: '奇迹男孩',
    creator: '斯蒂芬·卓博斯基',
    date: '2017',
  },
  {
    name: '房间',
    creator: '伦尼·阿伯拉罕森',
    date: '2015',
  },
  {
    name: '二十二',
    creator: '郭柯',
    date: '2015',
  },
  {
    name: '恋恋笔记本',
    creator: '尼克·卡索维茨',
    date: '2004',
  },
  {
    name: '模仿游戏',
    creator: '莫滕·泰杜姆',
    date: '2014',
  },
  {
    name: '纵横四海',
    creator: '吴宇森',
    date: '1991',
  },
  {
    name: '爆裂鼓手',
    creator: '达米恩·查泽雷',
    date: '2014',
  },
  {
    name: '英雄本色',
    creator: '吴宇森',
    date: '1986',
  },
  {
    name: '血战钢锯岭',
    creator: '梅尔·吉布森',
    date: '2016',
  },
  {
    name: '恐怖直播',
    creator: '金秉祐',
    date: '2013',
  },
  {
    name: '7号房的礼物',
    creator: '李焕庆',
    date: '2013',
  },
  {
    name: '致命ID',
    creator: '詹姆斯·曼高德',
    date: '2003',
  },
  {
    name: '海蒂和爷爷',
    creator: '阿兰·葛斯彭纳',
    date: '2015',
  },
  {
    name: '绿皮书',
    creator: '彼得·法雷利',
    date: '2018',
  },
  {
    name: '猫鼠游戏',
    creator: '史蒂文·斯皮尔伯格',
    date: '2002',
  },
  {
    name: '黑客帝国',
    creator: '安迪·沃卓斯基',
    date: '1999',
  },
  {
    name: '美丽心灵',
    creator: '朗·霍华德',
    date: '2001',
  },
  {
    name: '我不是药神',
    creator: '文牧野',
    date: '2018',
  },
  {
    name: '搏击俱乐部',
    creator: '大卫·芬奇',
    date: '1999',
  },
  {
    name: '天堂电影院',
    creator: '朱塞佩·托纳多雷',
    date: '1988',
  },
  {
    name: '飞屋环游记',
    creator: '彼特·道格特',
    date: '2009',
  },
  {
    name: '寻梦环游记',
    creator: '李·昂克里奇',
    date: '2017',
  },
  {
    name: '控方证人',
    creator: '比利·怀尔德',
    date: '1957',
  },
  {
    name: '蝙蝠侠：黑暗骑士',
    creator: '克里斯托弗·诺兰',
    date: '2008',
  },
  {
    name: '怦然心动',
    creator: '罗伯·莱纳',
    date: '2010',
  },
  {
    name: '当幸福来敲门',
    creator: '加布里尔·穆奇诺',
    date: '2006',
  },
  {
    name: '熔炉',
    creator: '黄东赫',
    date: '2011',
  },
  {
    name: '三傻大闹宝莱坞',
    creator: '拉吉库马尔·希拉尼',
    date: '2011',
  },
  {
    name: '海上钢琴师',
    creator: '朱塞佩·托纳多雷',
    date: '1998',
  },
  {
    name: '忠犬八公的故事',
    creator: '拉斯·霍尔斯道姆',
    date: '2009',
  },
  {
    name: '盗梦空间',
    creator: '克里斯托弗·诺兰',
    date: '2010',
  },
  {
    name: '辛德勒的名单',
    creator: '史蒂文·斯皮尔伯格',
    date: '1993',
  },
  {
    name: '美丽人生',
    creator: '罗伯托·贝尼尼',
    date: '1997',
  },
  {
    name: '这个杀手不太冷',
    creator: '吕克·贝松',
    date: '1994',
  },
  {
    name: '霸王别姬',
    creator: '陈凯歌',
    date: '1993',
  },
  {
    name: '肖申克的救赎',
    creator: '弗兰克·德拉邦特',
    date: '1994',
  },
]

export const drama: MediaRecord[] = [
  {
    name: '企鹅群里有特务',
    date: '2013',
  },
  {
    name: '西部世界',
    date: '2016',
  },
  {
    name: '做工的人',
    date: '2020',
  },
  {
    name: '硅谷',
    date: '2014',
  },
  {
    name: '火花',
    date: '2016',
  },
  {
    name: '彩排',
    date: '2022',
  },
  {
    name: '黑袍纠察队',
    date: '2019',
  },
  {
    name: '普通人',
    date: '2020',
  },
  {
    name: '黑客军团',
    date: '2015',
  },
  {
    name: '我的解放日志',
    date: '2022',
  },
  {
    name: '人世间',
    date: '2022',
  },
  {
    name: 'Love, Death & Robots',
    date: '2019',
  },
  {
    name: '老友记',
    date: '1994',
  },
  {
    name: '我可能不会爱你',
    date: '2011',
  },
  {
    name: '健听女孩',
    date: '2021',
  },
  {
    name: '非自然死亡',
    date: '2018',
  },
  {
    name: '亮剑',
    date: '2005',
  },
  {
    name: '琅琊榜',
    date: '2015',
  },
  {
    name: '请回答1988',
    date: '2015',
  },
  {
    name: '从宫本到你',
    date: '2018',
  },
  {
    name: '想见你',
    date: '2019',
  },
]

export const game: MediaRecord[] = [
  {
    name: 'Factorio',
    creator: 'Wube Software',
    date: '2013',
  },
  {
    name: 'Zelda: Breath of the Wild',
    creator: 'Nintendo',
    date: '2017',
  },
  {
    name: 'Pokémon Sword',
    creator: 'Game Freak',
    date: '2019',
  },
  {
    name: 'Pokémon Brilliant Diamond',
    creator: 'Game Freak',
    date: '2021',
  },
  {
    name: 'Pokémon Legends Arceus',
    creator: 'Game Freak',
    date: '2022',
  },
  {
    name: 'Fire Emblem: Three Houses',
    creator: 'Intelligent Systems',
    date: '2019',
  },
  {
    name: 'Life is Strange',
    creator: 'Dontnod Entertainment',
    date: '2015',
  },
  {
    name: 'Catherine Full Body',
    creator: 'Atlus',
    date: '2021',
  },
  {
    name: 'Disco Elysium',
    creator: 'Zachary Hill',
    date: '2019',
  },
  {
    name: '13 Sentinels: Aegis Rim',
    creator: 'Atlus',
    date: '2021',
  },
  {
    name: 'Octopath Traveler',
    creator: 'Square Enix',
    date: '2018',
  },
  {
    name: 'To the Moon',
    creator: 'Freebird Games',
    date: '2011',
  },
  {
    name: 'Undertale',
    creator: 'Toby Fox',
    date: '2015',
  },
]

export const media: Record<MediaType, MediaRecord[]> = {
  book,
  movie,
  drama,
  anime,
  game,
}
