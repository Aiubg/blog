import type { Language } from '@/i18n/config'

interface Translation {
  title: string
  subtitle: string
  description: string
  posts: string
  tags: string
  about: string
  archives: string
  toc: string
}

export const ui: Record<Language, Translation> = {
  'de': {
    title: 'Mercury',
    subtitle: '',
    description: 'Ein persönlicher Blog mit eleganter Typografie, der sich auf Schreiben und Reflexion konzentriert.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'en': {
    title: 'Mercury',
    subtitle: '',
    description: 'A personal blog centered on elegant typography, focusing on writing and reflection.',
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    archives: 'Archives',
    toc: 'Table of Contents',
  },
  'es': {
    title: 'Mercury',
    subtitle: '',
    description: 'Un blog personal centrado en una tipografía elegante, enfocado en la escritura y la reflexión.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'fr': {
    title: 'Mercury',
    subtitle: '',
    description: 'Un blog personnel centré sur une typographie élégante, axé sur l’écriture et la réflexion.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'ja': {
    title: 'Mercury',
    subtitle: '',
    description: '洗練されたタイポグラフィを軸とする個人ブログ。文章と思索に焦点を当てています。',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'ko': {
    title: 'Mercury',
    subtitle: '',
    description: '세련된 타이포그래피를 중심으로 한 개인 블로그로, 글쓰기와 성찰에 집중합니다.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'pl': {
    title: 'Mercury',
    subtitle: '',
    description: 'Osobisty blog oparty na eleganckiej typografii, skoncentrowany na pisaniu i refleksji.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'pt': {
    title: 'Mercury',
    subtitle: '',
    description: 'Um blog pessoal centrado em tipografia elegante, focado em escrita e reflexão.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'ru': {
    title: 'Mercury',
    subtitle: '',
    description: 'Персональный блог, основанный на изящной типографике, сосредоточенный на письме и размышлениях.',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
  'zh': {
    title: 'Mercury',
    subtitle: '门庭深冷，来者需诚',
    description: '一个以优雅排版为核心的个人博客，专注于写作与思考。',
    posts: '文章',
    tags: '标签',
    about: '关于',
    archives: '归档',
    toc: '目录',
  },
  'zh-tw': {
    title: 'Mercury',
    subtitle: '',
    description: '一個以優雅排版為核心的個人部落格，專注於書寫與思考。',
    posts: '',
    tags: '',
    about: '',
    archives: '',
    toc: '',
  },
}
