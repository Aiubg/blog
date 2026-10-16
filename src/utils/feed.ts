import type { APIContext, ImageMetadata } from 'astro'
import type { CollectionEntry } from 'astro:content'
import type { Language } from '@/i18n/config'
import { getImage } from 'astro:assets'
import { getCollection } from 'astro:content'
import { Feed } from 'feed'
import MarkdownIt from 'markdown-it'
import { parse } from 'node-html-parser'
import sanitizeHtml from 'sanitize-html'
import { base, defaultLocale, themeConfig } from '@/config'
import { ui } from '@/i18n/ui'
import { memoize } from '@/utils/cache'
import { getPostLang, getPostSlug } from '@/utils/content'
import { getPostDescription } from '@/utils/description'

const markdownParser = new MarkdownIt()
const { title, description, i18nTitle, url, author } = themeConfig.site
const { follow } = themeConfig.seo ?? {}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Dynamically import all images from /src/content/posts/_images
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/posts/_images/**/*.{jpeg,jpg,png,gif,webp}',
)

/**
 * Converts relative image paths to absolute URLs
 *
 * @param srcPath - Relative image path from markdown content
 * @param baseUrl - Site base URL
 * @returns Optimized image URL or null if processing fails
 */
async function _getAbsoluteImageUrl(srcPath: string, baseUrl: string) {
  // Remove relative path prefixes (../ and ./) from image source path
  const prefixRemoved = srcPath.replace(/^(?:\.\.\/)+|^\.\//, '')
  const absolutePath = `/src/content/posts/${prefixRemoved}`
  const imageImporter = imagesGlob[absolutePath]

  if (!imageImporter) {
    return null
  }

  const { default: imageMetadata } = await imageImporter()

  // Create optimized image from metadata
  const optimizedImage = await getImage({ src: imageMetadata })
  return new URL(optimizedImage.src, baseUrl).toString()
}

// Export memoized version
const getAbsoluteImageUrl = memoize(_getAbsoluteImageUrl)

/**
 * Fix relative image paths in HTML content
 *
 * @param htmlContent HTML content string
 * @param baseUrl Base URL of the site
 * @returns Processed HTML string with all image paths converted to absolute URLs
 */
async function fixRelativeImagePaths(htmlContent: string, baseUrl: string): Promise<string> {
  if (!htmlContent.includes('<img')) {
    return htmlContent
  }
  const htmlDoc = parse(htmlContent)
  await Promise.all(htmlDoc.querySelectorAll('img').map(async (image) => {
    const src = image.getAttribute('src')
    if (!src || (!src.startsWith('./') && !src.startsWith('../') && !src.startsWith('_images/'))) {
      return
    }
    const absoluteUrl = await getAbsoluteImageUrl(src, baseUrl)
    if (absoluteUrl) {
      image.setAttribute('src', absoluteUrl)
    }
  }))

  return htmlDoc.toString()
}

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * Generate a feed object supporting both RSS and Atom formats
 *
 * @param lang Language of the feed
 * @returns A Feed instance ready for RSS or Atom output
 */
async function createFeed(lang: Language) {
  const currentUI = ui[lang]
  const siteURL = lang !== defaultLocale ? `${url}${base}/${lang}/` : `${url}${base}/`

  // Create Feed instance
  const feed = new Feed({
    title: i18nTitle ? currentUI.title : title,
    description: i18nTitle ? currentUI.description : description,
    id: siteURL,
    link: siteURL,
    language: lang,
    copyright: `Copyright © ${new Date().getFullYear()} ${author}`,
    updated: new Date(),
    generator: 'Astro-Theme-Retypeset with Feed for Node.js',

    feedLinks: {
      rss: new URL(lang !== defaultLocale ? `${base}/${lang}/rss.xml` : `${base}/rss.xml`, url).toString(),
      atom: new URL(lang !== defaultLocale ? `${base}/${lang}/atom.xml` : `${base}/atom.xml`, url).toString(),
    },

    author: {
      name: author,
      link: `${url}${base}/`,
    },
  })

  // Filter posts by language and exclude drafts
  const posts = await getCollection(
    'posts',
    (post: CollectionEntry<'posts'>) => {
      const isNotDraft = !post.data.draft
      const pLang = getPostLang(post)
      const isCorrectLang = pLang === lang || pLang === ''
      return isNotDraft && isCorrectLang
    },
  )

  // Sort posts by published date in descending order and limit to the latest 25
  const recentPosts = [...posts]
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
    .slice(0, 25)

  // Add posts to feed
  for (const post of recentPosts) {
    const slug = getPostSlug(post)
    const link = new URL(`posts/${slug}/`, siteURL).toString()

    // Optimize content processing
    const postContent = post.body
      ? sanitizeHtml(
          await fixRelativeImagePaths(
            // Remove HTML comments before rendering markdown
            markdownParser.render(post.body.replace(/<!--[\s\S]*?-->/g, '')),
            `${url}${base}/`,
          ),
          {
            // Allow <img> tags in feed content
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          },
        )
      : ''

    // publishDate -> Atom:<published>, RSS:<pubDate>
    const publishDate = post.data.published
    // updateDate -> Atom:<updated>, RSS has no update tag
    const updateDate = post.data.updated ?? publishDate

    feed.addItem({
      title: post.data.title,
      id: link,
      link,
      description: getPostDescription(post, 'feed'),
      content: postContent,
      author: [{
        name: author,
        link: `${url}${base}/`,
      }],
      published: publishDate,
      date: updateDate,
    })
  }

  // Add follow verification if available
  if (follow?.feedID && follow?.userID) {
    feed.addExtension({
      name: 'follow_challenge',
      objects: {
        feedId: follow.feedID,
        userId: follow.userID,
      },
    })
  }

  return feed
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const generateFeed = memoize(createFeed)

// Generate RSS 2.0 format feed
export async function generateRSS(context: APIContext) {
  const feed = await generateFeed((context.params.lang as Language | undefined) ?? defaultLocale)

  // Add XSLT stylesheet to RSS feed
  let rssXml = feed.rss2()
  rssXml = rssXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    `<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="${base}/feeds/rss-style.xsl" type="text/xsl"?>`,
  )

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

// Generate Atom 1.0 format feed
export async function generateAtom(context: APIContext) {
  const feed = await generateFeed((context.params.lang as Language | undefined) ?? defaultLocale)

  // Add XSLT stylesheet to Atom feed
  let atomXml = feed.atom1()
  atomXml = atomXml.replace(
    '<?xml version="1.0" encoding="utf-8"?>',
    `<?xml version="1.0" encoding="utf-8"?>\n<?xml-stylesheet href="${base}/feeds/atom-style.xsl" type="text/xsl"?>`,
  )

  return new Response(atomXml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
