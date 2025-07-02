import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createRequire } from 'node:module'

import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import { getIcons, getIconsCSS, stringToIcon } from '@iconify/utils'

const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sources = {
  json: [
    require.resolve('@iconify/json/json/tabler.json')
  ],
  svg: [
    /* {
      dir: 'src/assets/iconify-icons/svg',
      monotone: false,
      prefix: 'custom'
    } */
  ]
}

const target = join(__dirname, 'generated-icons.css')

const allIcons = []

if (sources.icons) {
  const sourcesJSON = sources.json || (sources.json = [])
  const organizedList = organizeIconsList(sources.icons)

  for (const prefix in organizedList) {
    const filename = require.resolve(`@iconify/json/json/${prefix}.json`)

    sourcesJSON.push({
      filename,
      icons: organizedList[prefix]
    })
  }
}

if (sources.json) {
  for (const item of sources.json) {
    const filename = typeof item === 'string' ? item : item.filename
    const content = JSON.parse(await fs.readFile(filename, 'utf8'))

    if (typeof item !== 'string' && item.icons?.length) {
      const filteredContent = getIcons(content, item.icons)

      if (!filteredContent) throw new Error(`Cannot find required icons in ${filename}`)
      allIcons.push(filteredContent)
    } else {
      allIcons.push(content)
    }
  }
}

if (sources.svg) {
  for (const source of sources.svg) {
    const iconSet = await importDirectory(source.dir, { prefix: source.prefix })

    await iconSet.forEach(async (name, type) => {
      if (type !== 'icon') return
      const svg = iconSet.toSVG(name)

      if (!svg) return iconSet.remove(name)

      try {
        await cleanupSVG(svg)

        if (source.monotone) {
          await parseColors(svg, {
            defaultColor: 'currentColor',
            callback: (attr, colorStr, color) => {
              return !color || isEmptyColor(color) ? colorStr : 'currentColor'
            }
          })
        }

        await runSVGO(svg)
      } catch (err) {
        console.error(`Error parsing ${name} from ${source.dir}:`, err)
        iconSet.remove(name)
        
return
      }

      iconSet.fromSVG(name, svg)
    })

    allIcons.push(iconSet.export())
  }
}

const cssContent = allIcons
  .map(iconSet => getIconsCSS(iconSet, Object.keys(iconSet.icons), { iconSelector: '.{prefix}-{name}' }))
  .join('\n')

await fs.mkdir(dirname(target), { recursive: true })
await fs.writeFile(target, cssContent, 'utf8')
console.log(`✅ Saved CSS to ${target}`)

function organizeIconsList(icons) {
  const sorted = Object.create(null)

  icons.forEach(icon => {
    const item = stringToIcon(icon)

    if (!item) return
    const prefix = item.prefix
    const name = item.name
    const list = sorted[prefix] || (sorted[prefix] = [])

    if (!list.includes(name)) list.push(name)
  })

  return sorted
}
