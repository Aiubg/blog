import type { CollectionEntry } from 'astro:content'
import type { Language } from '@/i18n/config'
import type { Post } from '@/types'
import { createHash } from 'node:crypto'
import { getCollection, render } from 'astro:content'
import { allLocales, defaultLocale } from '@/config'
import { langMap } from '@/i18n/config'
import { memoize } from '@/utils/cache'

const metaCache = new Map<string, { minutes: number }>()

/**
 * Add metadata including reading time to a post
 *
 * @param post The post to enhance with metadata
 * @returns Enhanced post with reading time information
 */
async function addMetaToPost(post: CollectionEntry<'posts'>): Promise<Post> {
  const cacheKey = `${post.id}-${getPostLang(post) || 'universal'}`
  const cachedMeta = metaCache.get(cacheKey)
  if (cachedMeta) {
    return {
      ...post,
      remarkPluginFrontmatter: cachedMeta,
    }
  }

  const { remarkPluginFrontmatter } = await render(post)
  const meta = remarkPluginFrontmatter as { minutes: number }
  metaCache.set(cacheKey, meta)

  return {
    ...post,
    remarkPluginFrontmatter: meta,
  }
}

export function getPostLang(post: CollectionEntry<'posts'>): '' | Language {
  const id = post.id
  const segments = id.split('/')
  const first = segments.length > 1 ? segments[0] : ''
  if (first === '_all') {
    return ''
  }
  if (Object.prototype.hasOwnProperty.call(langMap, first)) {
    return first as Language
  }
  return ''
}

export function getPostGroupKey(post: CollectionEntry<'posts'>): string {
  const customId = (post.data as { id?: string }).id
  if (customId && customId.trim()) {
    return customId.trim()
  }
  const id = post.id
  const segments = id.split('/')
  const last = segments[segments.length - 1] || id
  const base = last.replace(/\.(md|mdx)$/i, '')
  const langs = Object.keys(langMap) as readonly string[]
  for (const lang of langs) {
    if (base.endsWith(`-${lang}`)) {
      return base.slice(0, -(lang.length + 1))
    }
    if (base.endsWith(`.${lang}`)) {
      return base.slice(0, -(lang.length + 1))
    }
  }
  return base
}

function shortHash(input: string): string {
  return createHash('sha1').update(input).digest('hex').slice(0, 10)
}

export function getPostSlug(post: CollectionEntry<'posts'>): string {
  const key = getPostGroupKey(post)
  return shortHash(key)
}

/**
 * Find duplicate post slugs within the same language
 *
 * @param posts Array of blog posts to check
 * @returns Array of descriptive error messages for duplicate slugs
 */
export async function checkPostSlugDuplication(posts: CollectionEntry<'posts'>[]): Promise<string[]> {
  const slugMap = new Map<string, Set<string>>()
  const duplicates: string[] = []

  posts.forEach((post) => {
    const lang = getPostLang(post)
    const slug = getPostSlug(post)

    let slugSet = slugMap.get(lang || 'universal')
    if (!slugSet) {
      slugSet = new Set()
      slugMap.set(lang || 'universal', slugSet)
    }

    if (!slugSet.has(slug)) {
      slugSet.add(slug)
      return
    }

    if (!lang) {
      duplicates.push(`Duplicate slug "${slug}" found in universal posts`)
    }
    else {
      duplicates.push(`Duplicate slug "${slug}" found in "${lang}" language posts`)
    }
  })

  return duplicates
}

/**
 * Get all posts (including pinned ones, excluding drafts in production)
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Posts filtered by language, enhanced with metadata, sorted by date
 */
async function _getPosts(lang?: Language) {
  const currentLang = lang || defaultLocale

  const filteredPosts = await getCollection(
    'posts',
    (post: CollectionEntry<'posts'>) => {
      const shouldInclude = import.meta.env.DEV || !post.data.draft
      const pLang = getPostLang(post)
      return shouldInclude && (pLang === currentLang || pLang === '')
    },
  )

  const enhancedPosts = await Promise.all(filteredPosts.map(addMetaToPost))

  return enhancedPosts.sort((a, b) =>
    b.data.published.valueOf() - a.data.published.valueOf(),
  )
}

export const getPosts = memoize(_getPosts)

/**
 * Get all non-pinned posts
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Regular posts (non-pinned), filtered by language
 */
async function _getRegularPosts(lang?: Language) {
  const posts = await getPosts(lang)
  return posts.filter(post => !post.data.pin)
}

export const getRegularPosts = memoize(_getRegularPosts)

/**
 * Get pinned posts sorted by pin priority
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Pinned posts sorted by pin value in descending order
 */
async function _getPinnedPosts(lang?: Language) {
  const posts = await getPosts(lang)
  return posts
    .filter(post => post.data.pin && post.data.pin > 0)
    .sort((a, b) => (b.data.pin ?? 0) - (a.data.pin ?? 0))
}

export const getPinnedPosts = memoize(_getPinnedPosts)

/**
 * Group posts by year and sort within each year
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Map of posts grouped by year (descending), sorted by date within each year
 */
async function _getPostsByYear(lang?: Language): Promise<Map<number, Post[]>> {
  const posts = await getRegularPosts(lang)
  const yearMap = new Map<number, Post[]>()

  posts.forEach((post: Post) => {
    const year = post.data.published.getFullYear()
    let yearPosts = yearMap.get(year)
    if (!yearPosts) {
      yearPosts = []
      yearMap.set(year, yearPosts)
    }
    yearPosts.push(post)
  })

  // Sort posts within each year by date
  yearMap.forEach((yearPosts) => {
    yearPosts.sort((a, b) => {
      const aDate = a.data.published
      const bDate = b.data.published
      return bDate.getMonth() - aDate.getMonth() || bDate.getDate() - aDate.getDate()
    })
  })

  return new Map([...yearMap.entries()].sort((a, b) => b[0] - a[0]))
}

export const getPostsByYear = memoize(_getPostsByYear)

/**
 * Group posts by their tags
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Map where keys are tag names and values are arrays of posts with that tag
 */
async function _getPostsGroupByTags(lang?: Language) {
  const posts = await getPosts(lang)
  const tagMap = new Map<string, Post[]>()

  posts.forEach((post: Post) => {
    post.data.tags?.forEach((tag: string) => {
      let tagPosts = tagMap.get(tag)
      if (!tagPosts) {
        tagPosts = []
        tagMap.set(tag, tagPosts)
      }
      tagPosts.push(post)
    })
  })

  return tagMap
}

export const getPostsGroupByTags = memoize(_getPostsGroupByTags)

/**
 * Get all tags sorted by post count
 *
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Array of tags sorted by popularity (most posts first)
 */
async function _getAllTags(lang?: Language) {
  const tagMap = await getPostsGroupByTags(lang)
  const tagsWithCount = Array.from(tagMap.entries())

  tagsWithCount.sort((a, b) => b[1].length - a[1].length)
  return tagsWithCount.map(([tag]) => tag)
}

export const getAllTags = memoize(_getAllTags)

/**
 * Get all posts that contain a specific tag
 *
 * @param tag The tag name to filter posts by
 * @param lang The language code to filter by, defaults to site's default language
 * @returns Array of posts that contain the specified tag
 */
async function _getPostsByTag(tag: string, lang?: Language) {
  const tagMap = await getPostsGroupByTags(lang)
  return tagMap.get(tag) ?? []
}

export const getPostsByTag = memoize(_getPostsByTag)

/**
 * Check which languages support a specific tag
 *
 * @param tag The tag name to check language support for
 * @returns Array of language codes that support the specified tag
 */
async function _getTagSupportedLangs(tag: string): Promise<Language[]> {
  const posts = await getCollection(
    'posts',
    post => !post.data.draft,
  )
  const langs = new Set<Language>()
  posts.forEach((post) => {
    if (post.data.tags?.includes(tag)) {
      const pLang = getPostLang(post)
      if (!pLang) {
        (allLocales as readonly Language[]).forEach(l => langs.add(l))
      }
      else {
        langs.add(pLang)
      }
    }
  })
  return [...langs].sort((a, b) => allLocales.indexOf(a) - allLocales.indexOf(b))
}

export const getTagSupportedLangs = memoize(_getTagSupportedLangs)
