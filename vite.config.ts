import type { PluginSimple as MarkdownItPlugin } from 'markdown-exit'
import { basename, resolve } from 'node:path'
import MarkdownItShiki from '@shikijs/markdown-exit'
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationWordHighlight } from '@shikijs/transformers'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import Vue from '@vitejs/plugin-vue'
import fs from 'fs-extra'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import GitHubAlerts from 'markdown-it-github-alerts'
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItMagicLink from 'markdown-it-magic-link'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Exclude from 'vite-plugin-optimize-exclude'
import SVG from 'vite-svg-loader'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'
import { generateOGImage } from './scripts/og'
import { slugify } from './scripts/slugify'

const promises: Promise<any>[] = []

export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    UnoCSS(),

    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
      // logs: true,
      extendRoute(route) {
        const path = route.components.get('default')
        if (!path)
          return

        if (!path.includes('projects.md') && path.endsWith('.md')) {
          const { data } = matter(fs.readFileSync(path, 'utf-8'))
          route.addToMeta({
            frontmatter: data,
          })
        }
      },
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Markdown({
      wrapperComponent: id => id.includes('/demo/')
        ? 'WrapperDemo'
        : 'WrapperPost',
      wrapperClasses: (id, code) => code.includes('@layout-full-width')
        ? ''
        : 'prose m-auto slide-enter-content',
      headEnabled: true,
      exportFrontmatter: false,
      exposeFrontmatter: false,
      exposeExcerpt: false,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      async markdownSetup(md) {
        md.use((await MarkdownItShiki({
          themes: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
          },
          defaultColor: false,
          cssVariablePrefix: '--s-',
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationWordHighlight(),
          ],
        })) as unknown as MarkdownItPlugin)

        md.use(anchor as unknown as MarkdownItPlugin, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes as unknown as MarkdownItPlugin, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          slugify,
          containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        })

        md.use(MarkdownItMagicLink as unknown as MarkdownItPlugin, {
          linksMap: {
            'RSS3': 'https://rss3.io',
            'Open Network': 'https://open.network',
            'edgeX Exchange': 'https://www.edgex.exchange/',
            'NaturalSelectionLabs': 'https://github.com/NaturalSelectionLabs',
            'RSS3-Network': 'https://github.com/RSS3-Network',
            'RSSNext': 'https://github.com/RSSNext',
            'WebisOpen': 'https://github.com/WebisOpen',
            'Web3Insight': 'https://github.com/web3insight-ai/web3insight',
            'RSSHub': 'https://github.com/DIYgod/RSSHub',
            'Folo': 'https://github.com/RSSNext/Folo',
            'Node': 'https://github.com/RSS3-Network/Node',
          },
          imageOverrides: [
            ['https://github.com/vuejs/core', 'https://vuejs.org/logo.svg'],
            ['https://github.com/nuxt/nuxt', 'https://nuxt.com/assets/design-kit/icon-green.svg'],
            ['https://github.com/vitejs/vite', 'https://vitejs.dev/logo.svg'],
            ['https://github.com/sponsors', 'https://github.com/github.png'],
            ['https://github.com/sponsors/antfu', 'https://github.com/github.png'],
            ['https://nuxtlabs.com', 'https://github.com/nuxtlabs.png'],
            [/opencollective\.com\/vite/, 'https://github.com/vitejs.png'],
            [/opencollective\.com\/elk/, 'https://github.com/elk-zone.png'],
          ],
        })

        md.use(GitHubAlerts as unknown as MarkdownItPlugin)
      },
      frontmatterPreprocess(frontmatter, options, id, defaults) {
        (() => {
          if (!id.endsWith('.md'))
            return
          const route = basename(id, '.md')
          if (route === 'index' || frontmatter.image || !frontmatter.title)
            return

          // Try to extract the first image from markdown content
          // Only match images hosted on image.pseudoyu.com/images/
          const content = fs.readFileSync(id, 'utf-8')
          const imageMatch = content.match(/!\[.*?\]\((https:\/\/image\.pseudoyu\.com\/images\/[^)]+)\)/)
          if (imageMatch) {
            frontmatter.image = imageMatch[1]
            return
          }

          // Fallback: generate OG image if no image found in content
          const path = `og/${route}.png`
          promises.push(
            fs.existsSync(`${id.slice(0, -3)}.png`)
              ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
              : generateOg(frontmatter.title!.trim(), `public/${path}`),
          )
          frontmatter.image = `https://www.pseudoyu.com/${path}`
        })()
        const head = defaults(frontmatter, options)
        return { head, frontmatter }
      },
    }),

    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
      defaultImport: 'url',
    }),

    Exclude(),

    {
      name: 'await',
      async closeBundle() {
        await Promise.all(promises)
      },
    },

    // Serve the Vercel functions in api/ during `pnpm dev`, with the /daily/feed.xml rewrite from vercel.json
    {
      name: 'vercel-api-dev',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url!, 'http://localhost')
          const path = url.pathname === '/daily/feed.xml' ? '/api/daily/feed' : url.pathname
          // Like Vercel, `_` and `.` names (shared code, tests) are not endpoints
          const isEndpoint = path.startsWith('/api/') && !/\/[_.]/.test(path)
          const file = [`.${path}.ts`, `.${path}/index.ts`].find(file => isEndpoint && fs.existsSync(file))
          if (!file)
            return next()
          try {
            const handler = await server.ssrLoadModule(file)
            const response: Response = await (handler.GET ?? handler.default)(new Request(url, { headers: req.headers as HeadersInit }))
            res.statusCode = response.status
            response.headers.forEach((value, key) => res.setHeader(key, value))
            res.end(Buffer.from(await response.arrayBuffer()))
          }
          catch (error) {
            next(error)
          }
        })
      },
    },
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: 'minify',
    // Daily posts load in the browser, so every /daily/:id shares one prerendered shell (rewritten in vercel.json)
    includedRoutes: paths => [...paths.filter(path => !path.includes(':') && !path.includes('*')), '/daily/0'],
  },
})

async function generateOg(title: string, output: string) {
  if (fs.existsSync(output))
    return

  await generateOGImage({ title }, output)
}
