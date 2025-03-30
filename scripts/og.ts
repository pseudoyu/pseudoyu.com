import { dirname } from 'node:path'
import fs from 'fs-extra'
import satori from 'satori'
import sharp from 'sharp'

interface OGImageOptions {
  title: string
  author?: string
  website?: string
}

export async function generateOGImage(options: OGImageOptions, outputPath: string) {
  const { title, author = 'pseudoyu' } = options

  // Using a direct approach with known URLs for Noto Sans SC
  const notoSansRegularUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&display=swap'
  const notoSansBoldUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@700&display=swap'

  // Fetch font data directly from Google Fonts
  const fetchFontData = async (fontUrl: string): Promise<Buffer> => {
    // First get the CSS
    const cssResponse = await fetch(fontUrl)
    const css = await cssResponse.text()

    // Extract the actual font file URL from the CSS
    const fontFileUrl = css.match(/src: url\((.+?)\)/)?.[1]

    if (!fontFileUrl) {
      throw new Error(`Could not extract font URL from CSS: ${css}`)
    }

    // Fetch the font file
    const fontResponse = await fetch(fontFileUrl)
    const fontArrayBuffer = await fontResponse.arrayBuffer()

    // Convert to Buffer for Node.js compatibility
    return Buffer.from(fontArrayBuffer)
  }

  // Fetch both font weights
  const [notoSansRegular, notoSansBold] = await Promise.all([
    fetchFontData(notoSansRegularUrl),
    fetchFontData(notoSansBoldUrl),
  ])

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
                            fontFamily: 'Noto Sans SC',
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
                            fontFamily: 'Noto Sans SC',
                            fontSize: '56px',
                            color: '#ffffff',
                            lineHeight: 1.2,
                            maxWidth: '900px',
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
                fontFamily: 'Noto Sans SC',
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
      fonts: [
        {
          name: 'Noto Sans SC',
          data: notoSansRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Noto Sans SC',
          data: notoSansBold,
          weight: 700,
          style: 'normal',
        },
      ],
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
