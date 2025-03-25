<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #111 40%, #222 100%)',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Glow effect */}
  <div
    style={{
      position: 'absolute',
      width: '400px',
      height: '400px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(100, 100, 255, 0.15) 0%, rgba(50, 50, 100, 0.05) 50%, transparent 70%)',
      top: '-120px',
      right: '-80px',
      filter: 'blur(30px)',
    }}
  />

  {/* Second glow effect */}
  <div
    style={{
      position: 'absolute',
      width: '480px',
      height: '480px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 100, 100, 0.1) 0%, rgba(100, 50, 50, 0.05) 50%, transparent 70%)',
      bottom: '-160px',
      left: '-80px',
      filter: 'blur(40px)',
    }}
  />

  {/* Dot pattern overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(#333 1px, transparent 0),
                        radial-gradient(#333 1px, transparent 0)`,
      backgroundSize: '30px 30px',
      backgroundPosition: '0 0, 15px 15px',
      opacity: 0.5,
    }}
  />

  {/* Content container */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      padding: '60px',
      zIndex: 10,
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontFamily: 'Noto Sans SC',
          fontSize: '28px',
          color: '#aaaaaa',
          marginBottom: '4px',
        }}
      >
        pseudoyu
      </div>

      <div
        style={{
          fontFamily: 'Noto Sans SC',
          fontSize: '42px',
          color: '#ffffff',
          lineHeight: 1.2,
          maxWidth: '800px',
          textShadow: '0 3px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        a web3 enthusiast, blockchain developer & indie hacker.
      </div>
    </div>
  </div>

  {/* Highlight accent */}
  <div
    style={{
      position: 'absolute',
      bottom: '45px',
      right: '60px',
      padding: '12px 24px',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)',
      borderRadius: '30px',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      fontFamily: 'Noto Sans SC',
      fontSize: '18px',
      color: '#ffffff',
      letterSpacing: '0.4px',
    }}
  >
    Ideas • Code • Photos
  </div>
</div>
