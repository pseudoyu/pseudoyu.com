import { dirname, join } from 'node:path'
import fs from 'fs-extra'
import satori from 'satori'
import sharp from 'sharp'

interface OGImageOptions {
  title: string
  author?: string
  website?: string
}

const FONTS_ASSETS_DIR = join(process.cwd(), 'public/assets/fonts')
const FONTS_CACHE_DIR = join(process.cwd(), '.cache/fonts')

export async function generateOGImage(options: OGImageOptions, outputPath: string) {
  const { title, author = 'pseudoyu' } = options

  // Font file paths - prioritize assets, fallback to cache
  const notoSansRegularAsset = join(FONTS_ASSETS_DIR, 'noto-sans-sc-400.woff')
  const notoSansBoldAsset = join(FONTS_ASSETS_DIR, 'noto-sans-sc-700.woff')
  const notoSansRegularCache = join(FONTS_CACHE_DIR, 'noto-sans-sc-400.ttf')
  const notoSansBoldCache = join(FONTS_CACHE_DIR, 'noto-sans-sc-700.ttf')

  // Using a direct approach with known URLs for Noto Sans SC
  const notoSansRegularUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&display=swap'
  const notoSansBoldUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&display=swap'

  // Load font data with local-first strategy
  const loadFontData = async (
    assetPath: string,
    cachePath: string,
    fontUrl: string,
    fontName: string,
  ): Promise<Buffer> => {
    // Priority 1: Check assets directory
    if (await fs.pathExists(assetPath)) {
      console.log(`✅ Using local font: ${assetPath}`)
      return fs.readFile(assetPath)
    }

    // Priority 2: Check cache directory
    if (await fs.pathExists(cachePath)) {
      console.log(`📦 Using cached font: ${cachePath}`)
      return fs.readFile(cachePath)
    }

    // Priority 3: Download from network (fallback)
    console.log(`🌐 Downloading ${fontName} from network...`)
    console.log(`💡 Tip: Run 'pnpm run download-fonts' to avoid network downloads`)

    // Ensure cache directory exists
    await fs.ensureDir(FONTS_CACHE_DIR)

    try {
      // First get the CSS
      const cssResponse = await fetch(fontUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
      })
      const css = await cssResponse.text()

      // Extract the actual font file URL from the CSS
      const fontFileUrl = css.match(/src: url\((.+?)\)/)?.[1]

      if (!fontFileUrl) {
        throw new Error(`Could not extract font URL from CSS: ${css}`)
      }

      // Fetch the font file with retry mechanism
      let fontArrayBuffer: ArrayBuffer
      let retryCount = 0
      const maxRetries = 3

      while (retryCount < maxRetries) {
        try {
          const fontResponse = await fetch(fontFileUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            },
          })
          fontArrayBuffer = await fontResponse.arrayBuffer()
          break
        }
        catch (error) {
          retryCount++
          if (retryCount >= maxRetries) {
            throw error
          }
          console.log(`Retry ${retryCount}/${maxRetries} for font download...`)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount))
        }
      }

      // Convert to Buffer for Node.js compatibility
      const fontBuffer = Buffer.from(fontArrayBuffer!)

      // Cache the font file for future use
      await fs.writeFile(cachePath, fontBuffer)
      console.log(`💾 Font cached to: ${cachePath}`)

      return fontBuffer
    }
    catch (error) {
      console.error(`❌ Failed to load ${fontName}:`, error)
      console.log(`🔄 Falling back to system font...`)

      // 返回一个空的 Buffer 来使用系统字体
      return Buffer.alloc(0)
    }
  }

  // Load both font weights
  const [notoSansRegular, notoSansBold] = await Promise.all([
    loadFontData(notoSansRegularAsset, notoSansRegularCache, notoSansRegularUrl, 'Noto Sans SC Regular'),
    loadFontData(notoSansBoldAsset, notoSansBoldCache, notoSansBoldUrl, 'Noto Sans SC Bold'),
  ])

  // Prepare fonts array - only include fonts that were loaded successfully
  const fonts: Array<{ name: string, data: Buffer, weight: number, style: string }> = []

  if (notoSansRegular.length > 0) {
    fonts.push({
      name: 'Noto Sans SC',
      data: notoSansRegular,
      weight: 400,
      style: 'normal',
    })
  }

  if (notoSansBold.length > 0) {
    fonts.push({
      name: 'Noto Sans SC',
      data: notoSansBold,
      weight: 700,
      style: 'normal',
    })
  }

  // If no fonts loaded, use a fallback font name that Satori can handle
  const fontFamily = fonts.length > 0 ? 'Noto Sans SC' : 'Arial, sans-serif'

  // Create SVG using Satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111 40%, #222 100%)',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Glow effect
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(100, 100, 255, 0.15) 0%, rgba(50, 50, 100, 0.05) 50%, transparent 70%)',
                top: '-150px',
                right: '-100px',
                filter: 'blur(40px)',
              },
            },
          },
          // Second glow effect
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 100, 100, 0.1) 0%, rgba(100, 50, 50, 0.05) 50%, transparent 70%)',
                bottom: '-200px',
                left: '-100px',
                filter: 'blur(50px)',
              },
            },
          },
          // Dot pattern overlay
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `radial-gradient(#333 1px, transparent 0),
                                  radial-gradient(#333 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
                opacity: 0.5,
              },
            },
          },
          // Content container
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                padding: '80px',
                zIndex: 10,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily,
                            fontSize: '36px',
                            color: '#aaaaaa',
                            marginBottom: '5px',
                          },
                          children: author,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily,
                            fontSize: '48px',
                            color: '#ffffff',
                            lineHeight: 1.1,
                            maxWidth: '1000px',
                            whiteSpace: 'nowrap',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                          },
                          children: title,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          // Highlight accent
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '60px',
                right: '80px',
                padding: '15px 30px',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)',
                borderRadius: '40px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily,
                fontSize: '24px',
                color: '#ffffff',
                letterSpacing: '0.5px',
              },
              children: 'Ideas • Code • Photos',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    },
  )

  // Ensure output directory exists
  await fs.ensureDir(dirname(outputPath))

  // Convert SVG to PNG using Sharp
  const png = await sharp(Buffer.from(svg))
    .png()
    .toBuffer()

  // Write to file
  await fs.writeFile(outputPath, png)
}
