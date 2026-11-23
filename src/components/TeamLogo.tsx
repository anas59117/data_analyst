import { useState } from 'react'
import { getTeamInfo } from '@/utils/teams'

interface Props {
  name: string
  logoUrl?: string
  size?: number
}

export default function TeamLogo({ name, logoUrl, size = 44 }: Props) {
  const [imgError, setImgError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)
  const team = getTeamInfo(name)

  const resolvedUrl = logoUrl || team.logo
  const showImage = resolvedUrl && !imgError
  const showFallbackImage = !logoUrl && imgError && team.logo && !fallbackError

  if (showImage || showFallbackImage) {
    const url = showFallbackImage ? team.logo! : resolvedUrl!
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}>
        <img
          src={url}
          alt={name}
          onError={() => showFallbackImage ? setFallbackError(true) : setImgError(true)}
          style={{
            width: size * 0.72,
            height: size * 0.72,
            objectFit: 'contain',
          }}
        />
      </div>
    )
  }

  const fontSize = size < 32 ? '0.5rem' : size < 44 ? '0.6rem' : '0.65rem'

  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${team.color} 60%, ${team.color2} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 800,
        color: '#fff',
        fontFamily: 'var(--font-heading)',
        letterSpacing: '-0.02em',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}
    >
      {team.abbr}
    </div>
  )
}
