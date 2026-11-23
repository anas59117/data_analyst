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
      <img
        src={logoUrl}
        alt={name}
        onError={() => setImgError(true)}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: '50%',
        }}
      />
    )
  }

  const fontSize = size < 32 ? '0.55rem' : size < 44 ? '0.65rem' : '0.75rem'

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
        border: '2px solid rgba(255,255,255,0.1)',
      }}
    >
      {team.abbr}
    </div>
  )
}
