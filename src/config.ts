import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  // 网站信息 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  site: {
    // 网站标题
    title: 'Retypeset',
    // 网站副标题
    subtitle: 'Revive the beauty of typography',
    // 网站描述
    description: 'Retypeset is a static blog theme based on the Astro framework. Inspired by Typography, Retypeset establishes a new visual standard and reimagines the layout of all pages, creating a reading experience reminiscent of paper books, reviving the beauty of typography. Details in every sight, elegance in every space.',
    // 使用 src/i18n/ui.ts 中的 i18n 标题/副标题/描述，而不是上面的静态文本
    i18nTitle: true, // true | false
    // 作者名称
    author: 'mercury',
    // 网站 URL
    url: 'https://blog.gxqmars.dpdns.org',
    // 基础路径
    // 所有页面和资源的根目录
    base: '/', // 例如：'/blog', '/docs'
    // 网站图标 URL
    // 推荐格式：svg、png 或 ico
    favicon: '/icons/favicon.svg', // 或 https://example.com/favicon.svg
  },
  // 网站信息 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 颜色设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  color: {
    // 默认主题模式
    mode: 'auto', // light | dark | auto
    light: {
      // 主色调
      // 用于标题、悬停效果等
      // oklch 颜色选择器：https://oklch.com/
      primary: 'oklch(0.24 0.0172 280.05)',
      // 次要颜色
      // 用于文章文本
      secondary: 'oklch(0.40 0.0172 280.05)',
      // 背景颜色
      background: 'oklch(0.98 0.0172 280.05)',
      // 高亮颜色
      // 用于导航栏、选中文本等
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)',
    },
    dark: {
      // 主色调
      primary: 'oklch(0.92 0.0172 280.05)',
      // 次要颜色
      secondary: 'oklch(0.79 0.0172 280.05)',
      // 背景颜色
      background: 'oklch(0.24 0.0172 280.05)',
      // 高亮颜色
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)',
    },
  },
  // 颜色设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 全局设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  global: {
    // 默认语言
    locale: 'zh', // de | en | es | fr | ja | ko | pl | pt | ru | zh | zh-tw
    // 更多语言
    // 不要重复填写上面的语言代码，可以是空数组 []
    moreLocales: ['en'], // ['de', 'en', 'es', 'fr', 'ja', 'ko', 'pl', 'pt', 'ru', 'zh', 'zh-tw']
    // 文章字体样式
    fontStyle: 'sans', // sans | serif
    // 文章日期格式
    dateFormat: 'YYYY-MM-DD', // YYYY-MM-DD | MM-DD-YYYY | DD-MM-YYYY | MMM D YYYY | D MMM YYYY
    // 启用目录
    toc: true, // true | false
    // 启用 katex 数学公式渲染
    katex: true, // true | false
    // 减少动画效果
    reduceMotion: false, // true | false
  },
  // 全局设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 评论设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  comment: {
    // 启用评论系统
    enabled: false, // true | false
    // giscus
    // https://giscus.app/
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
    },
    // twikoo
    // https://twikoo.js.org/
    twikoo: {
      envId: '',
      // 版本：前端版本可以在 package.json 中更改
    },
    // waline
    // https://waline.js.org/en/
    waline: {
      // 服务器 URL
      serverURL: '',
      // 表情符号 URL
      emoji: [
        // 'https://unpkg.com/@waline/emojis@1.2.0/tw-emoji',
        // 'https://unpkg.com/@waline/emojis@1.2.0/bmoji',
        // 更多表情符号：https://waline.js.org/en/guide/features/emoji.html
      ],
      // GIF 搜索
      search: false, // true | false
      // 图片上传器
      imageUploader: false, // true | false
    },
  },
  // 评论设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // SEO 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  seo: {
    // @twitter ID
    twitterID: '@radishzz_',
    // 网站验证
    verification: {
      // Google 搜索控制台
      // https://search.google.com/search-console
      google: 'AUCrz5F1e5qbnmKKDXl2Sf8u6y0kOpEO1wLs6HMMmlM',
      // Bing 网站管理员工具
      // https://www.bing.com/webmasters
      bing: '64708CD514011A7965C84DDE1D169F87',
      // Yandex 网站管理员
      // https://webmaster.yandex.com
      yandex: '',
      // 百度搜索
      // https://ziyuan.baidu.com
      baidu: '',
    },
    // Google Analytics
    // https://analytics.google.com
    googleAnalyticsID: '',
    // Umami Analytics
    // https://cloud.umami.is
    umamiAnalyticsID: 'dab0e4b9-9cbf-43c3-af60-b09d3b545c38',
    // Follow 验证
    // https://follow.is/
    follow: {
      // Feed ID
      feedID: '',
      // 用户 ID
      userID: '',
    },
    // Apiflash 访问密钥
    // 为开放图谱图像生成网站截图
    // 获取访问密钥：https://apiflash.com/
    apiflashKey: '',
  },
  // SEO 设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 页脚设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  footer: {
    // 社交链接
    links: [
      {
        name: 'RSS',
        url: '/atom.xml', // 或 /rss.xml
      },
      {
        name: 'GitHub',
        url: 'https://github.com/Aiubg',
      },
      {
        name: 'Email',
        url: 'gxqmars@gmail.com',
      },
    ],
    // 网站起始年份
    startYear: 2025,
  },
  // 页脚设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 预加载设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  preload: {
    // 图片托管 URL
    // 优化远程图片并生成低质量占位符
    imageHostURL: 'image.radishzz.cc',
    // 自定义 Google Analytics JavaScript
    // 用于将跟踪脚本代理到自定义域的用户
    // 参见 https://gist.github.com/xiaopc/0602f06ca465d76bd9efd3dda9393738
    customGoogleAnalyticsJS: '',
    // 自定义 Umami Analytics JavaScript
    // 用于自部署 Umami 或将跟踪脚本代理到自定义域的用户
    // 参见 https://umami.is/docs/bypass-ad-blockers
    customUmamiAnalyticsJS: 'https://views.radishzz.cc/script.js',
  },
  // 预加载设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束

  // 音效设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 开始
  sound: {
    // 启用音效
    enabled: true, // true | false
    // 点击音效设置
    click: {
      // 启用点击音效
      enabled: true, // true | false
      // 点击音效音量 (0.0 - 1.0)
      volume: 0.8, // 0.0 - 1.0
    },
    // 打字音效设置
    typing: {
      // 启用打字音效
      enabled: true, // true | false
      // 打字音效音量 (0.0 - 1.0)
      volume: 1, // 0.0 - 1.0
    },
    // 在移动设备上启用音效
    mobileEnabled: false, // true | false
    // 音效文件基础路径
    basePath: '/sounds', // 例如：'/sounds', '/audio', 'https://example.com/sounds'
  },
  // 音效设置 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 结束
}

export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base.replace(/\/$/, '')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
