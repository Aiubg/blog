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
    subtitle: 'Ein tiefer, kalter Hof – Besucher müssen aufrichtig sein',
    description: 'Ein persönlicher Blog mit eleganter Typografie, der sich auf Schreiben und Reflexion konzentriert.',
    posts: 'Artikel',
    tags: 'Tags',
    about: 'Über',
    archives: 'Archiv',
    toc: 'Inhaltsverzeichnis',
  },
  'en': {
    title: 'Mercury',
    subtitle: 'The courtyard is deep and cold; visitors must be sincere',
    description: 'A personal blog centered on elegant typography, focusing on writing and reflection.',
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    archives: 'Archives',
    toc: 'Table of Contents',
  },
  'es': {
    title: 'Mercury',
    subtitle: 'El patio es profundo y frío; los visitantes deben ser sinceros',
    description: 'Un blog personal centrado en una tipografía elegante, enfocado en la escritura y la reflexión.',
    posts: 'Artículos',
    tags: 'Etiquetas',
    about: 'Acerca de',
    archives: 'Archivos',
    toc: 'Tabla de Contenidos',
  },
  'fr': {
    title: 'Mercury',
    subtitle: 'La cour est profonde et froide ; les visiteurs doivent être sincères',
    description: 'Un blog personnel centré sur une typographie élégante, axé sur l’écriture et la réflexion.',
    posts: 'Articles',
    tags: 'Étiquettes',
    about: 'À propos',
    archives: 'Archives',
    toc: 'Table des Matières',
  },
  'ja': {
    title: 'Mercury',
    subtitle: '門庭深く冷え、来訪者は誠実でなければならない',
    description: '洗練されたタイポグラフィを軸とする個人ブログ。文章と思索に焦点を当てています。',
    posts: '記事',
    tags: 'タグ',
    about: 'について',
    archives: 'アーカイブ',
    toc: '目次',
  },
  'ko': {
    title: 'Mercury',
    subtitle: '뜰은 깊고 차갑습니다. 방문객은 진실해야 합니다',
    description: '세련된 타이포그래피를 중심으로 한 개인 블로그로, 글쓰기와 성찰에 집중합니다.',
    posts: '게시물',
    tags: '태그',
    about: '소개',
    archives: '아카이브',
    toc: '목차',
  },
  'pl': {
    title: 'Mercury',
    subtitle: 'Dziedziniec jest głęboki i zimny; goście muszą być szczerzy',
    description: 'Osobisty blog oparty na eleganckiej typografii, skoncentrowany na pisaniu i refleksji.',
    posts: 'Artykuły',
    tags: 'Tagi',
    about: 'O mnie',
    archives: 'Archiwum',
    toc: 'Spis treści',
  },
  'pt': {
    title: 'Mercury',
    subtitle: 'O pátio é profundo e frio; os visitantes devem ser sinceros',
    description: 'Um blog pessoal centrado em tipografia elegante, focado em escrita e reflexão.',
    posts: 'Artigos',
    tags: 'Tags',
    about: 'Sobre',
    archives: 'Arquivos',
    toc: 'Índice',
  },
  'ru': {
    title: 'Mercury',
    subtitle: 'Двор глубок и холоден; посетители должны быть искренними',
    description: 'Персональный блог, основанный на изящной типографике, сосредоточенный на письме и размышлениях.',
    posts: 'Статьи',
    tags: 'Теги',
    about: 'О блоге',
    archives: 'Архив',
    toc: 'Оглавление',
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
    subtitle: '門庭深冷，來者需誠',
    description: '一個以優雅排版為核心的個人部落格，專注於書寫與思考。',
    posts: '文章',
    tags: '標籤',
    about: '關於',
    archives: '歸檔',
    toc: '目錄',
  },
}
