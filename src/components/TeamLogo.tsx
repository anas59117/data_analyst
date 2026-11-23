import { useState } from 'react'
import { getTeamInfo } from '@/utils/teams'

interface Props {
  name: string
  logoUrl?: string
  size?: number
}

export default function TeamLogo({ name, logoUrl, size = 36 }: Props) {
  const [imgError, setImgError] = useState(false)
  const team = getTeamInfo(name)

  if (logoUrl && !imgError) {
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
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <img
          src={logoUrl}
          alt={name}
          onError={() => setImgError(true)}
          style={{
            width: size * 0.7,
            height: size * 0.7,
            objectFit: 'contain',
          }}
        />
      </div>
    )
  }

  const fontSize = size < 32 ? '0.5rem' : size < 44 ? '0.6rem' : '0.7rem'

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
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {team.abbr}
    </div>
  )
}
