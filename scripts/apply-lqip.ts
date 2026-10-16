/** Generate cached image placeholders and apply them to the built HTML. */
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'
import { parse } from 'node-html-parser'
import sharp from 'sharp'
import { base } from '../src/config'

const distDir = 'dist'
const mapPath = 'src/assets/lqip-map.json'
type LqipMap = Record<string, string>

async function forEachBatch<T>(items: T[], processItem: (item: T) => Promise<void>) {
  for (let offset = 0; offset < items.length; offset += 10) {
    await Promise.all(items.slice(offset, offset + 10).map(processItem))
  }
}

async function readCache(): Promise<LqipMap> {
  try {
    return JSON.parse(await fs.readFile(mapPath, 'utf8')) as LqipMap
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return {}
    }
    throw error
  }
}

async function generatePlaceholder(filePath: string): Promise<string> {
  const pixels = await sharp(filePath)
    .resize(3, 3, { fit: 'fill' })
    .toColourspace('srgb')
    .removeAlpha()
    .raw()
    .toBuffer()

  // Store top-left and center in 11 bits each, bottom-right in 10 bits.
  function packPixel(index: number, redBits: number) {
    const offset = index * 3
    const red = Math.round(pixels[offset] / 255 * ((1 << redBits) - 1))
    const green = Math.round(pixels[offset + 1] / 255 * 15)
    const blue = Math.round(pixels[offset + 2] / 255 * 7)
    return (red << 7) | (green << 3) | blue
  }

  const packed = (BigInt(packPixel(0, 4)) << 21n)
    | (BigInt(packPixel(4, 4)) << 10n)
    | BigInt(packPixel(8, 3))
  return packed.toString(16).padStart(8, '0')
}

async function main() {
  await fs.access(distDir)
  const files = (await glob('_astro/**/*.webp', { cwd: distDir })).sort()
  const previous = await readCache()
  const placeholders: LqipMap = {}
  let generated = 0

  await forEachBatch(files, async (file) => {
    const url = `${base}/${file}`
    if (previous[url] !== undefined) {
      placeholders[url] = previous[url]
    }
    else {
      placeholders[url] = await generatePlaceholder(path.join(distDir, file))
      generated++
    }
  })

  // Stable ordering keeps the cache diff independent of task completion order.
  const sorted = Object.fromEntries(Object.entries(placeholders).sort(([a], [b]) => a.localeCompare(b)))
  if (JSON.stringify(sorted) !== JSON.stringify(previous)) {
    await fs.mkdir(path.dirname(mapPath), { recursive: true })
    await fs.writeFile(mapPath, `${JSON.stringify(sorted, null, 2)}\n`)
  }

  let applied = 0
  if (files.length) {
    const htmlFiles = await glob('**/*.html', { cwd: distDir })
    await forEachBatch(htmlFiles, async (file) => {
      const filePath = path.join(distDir, file)
      const html = await fs.readFile(filePath, 'utf8')
      if (!html.includes('<img')) {
        return
      }
      const root = parse(html)
      let changed = false
      for (const image of root.querySelectorAll('img[src]')) {
        const value = placeholders[image.getAttribute('src')!]
        const style = image.getAttribute('style') ?? ''
        if (value === undefined || style.includes('--lqip:')) {
          continue
        }
        image.setAttribute('style', `${style ? `${style}; ` : ''}--lqip:#${value}`)
        changed = true
        applied++
      }
      if (changed) {
        await fs.writeFile(filePath, root.toString())
      }
    })
  }
  console.log(`LQIP: ${files.length} images, ${generated} generated, ${applied} placeholders applied`)
}

main().catch((error) => {
  console.error('LQIP processing failed:', error)
  process.exitCode = 1
})
