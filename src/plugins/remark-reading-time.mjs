import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'
import { visit } from 'unist-util-visit'

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    data.astro.frontmatter.minutes = Math.max(1, Math.round(readingTime.minutes))
    data.astro.frontmatter.hasMath = false
    visit(tree, ['math', 'inlineMath'], () => {
      data.astro.frontmatter.hasMath = true
    })
  }
}
