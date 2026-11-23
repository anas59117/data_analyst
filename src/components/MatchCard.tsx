import { useState } from 'react'
import type { Match, Pronostic } from '@/types'
import TeamLogo from '@/components/TeamLogo'

interface Props {
  match: Match
  pronostic?: Pronostic
  onSave?: (matchId: string, home: number, away: number, matchDate: Date) => void
  saving?: boolean
}

export default function MatchCard({ match, pronostic, onSave, saving }: Props) {
  const [home, setHome] = useState(pronostic?.homeScore ?? 0)
  const [away, setAway] = useState(pronostic?.awayScore ?? 0)

  const isPast = match.date < new Date()
  const canEdit = !isPast && match.status === 'scheduled'

  const dateStr = match.date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="card" style={{ padding: '16px 20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--accent)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          background: 'rgba(59,130,246,0.1)',
          padding: '3px 8px',
          borderRadius: '4px',
        }}>
          J{match.journee}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{dateStr}</span>
        {match.status === 'finished' && (
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'rgba(34,197,94,0.15)',
            color: 'var(--success)',
            fontWeight: 600,
          }}>
            Terminé
          </span>
        )}
        {match.status === 'live' && (
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '4px',
            background: 'rgba(239,68,68,0.15)',
            color: 'var(--danger)',
            fontWeight: 600,
          }}>
            En cours
          </span>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
      }}>
        {/* Equipe domicile */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          minWidth: 0,
        }}>
          <TeamLogo name={match.homeTeam} logoUrl={match.homeLogo} size={44} />
          <span style={{
            fontWeight: 600,
            fontSize: '0.8rem',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {match.homeTeam}
          </span>
        </div>

        {/* Score central */}
        <div style={{
          minWidth: '72px',
          textAlign: 'center',
          padding: '0 8px',
        }}>
          {match.status === 'finished' || match.status === 'live' ? (
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              {match.homeScore} <span style={{ color: 'var(--fg-muted)', fontSize: '1rem' }}>-</span> {match.awayScore}
            </div>
          ) : (
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--fg-muted)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              vs
            </div>
          )}
        </div>

        {/* Equipe extérieur */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          minWidth: 0,
        }}>
          <TeamLogo name={match.awayTeam} logoUrl={match.awayLogo} size={44} />
          <span style={{
            fontWeight: 600,
            fontSize: '0.8rem',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {match.awayTeam}
          </span>
        </div>
      </div>

      {onSave && canEdit && (
        <div style={{
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>Ton prono :</span>
          <input
            type="number"
            min={0}
            max={20}
            value={home}
            onChange={(e) => setHome(Math.max(0, parseInt(e.target.value) || 0))}
            style={{
              width: '48px',
              padding: '6px',
              textAlign: 'center',
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--fg)',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          />
          <span style={{ fontWeight: 700 }}>-</span>
          <input
            type="number"
            min={0}
            max={20}
            value={away}
            onChange={(e) => setAway(Math.max(0, parseInt(e.target.value) || 0))}
            style={{
              width: '48px',
              padding: '6px',
              textAlign: 'center',
              background: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--fg)',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => onSave(match.id, home, away, match.date)}
            disabled={saving}
            style={{ padding: '6px 16px', fontSize: '0.8rem' }}
          >
            {saving ? '...' : pronostic ? 'Modifier' : 'Valider'}
          </button>
        </div>
      )}

      {pronostic && !canEdit && (
        <div style={{
          marginTop: '14px',
          paddingTop: '14px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '0.85rem',
          color: 'var(--fg-muted)',
        }}>
          <span>Ton prono :</span>
          <span style={{ fontWeight: 700, color: 'var(--fg)' }}>
            {pronostic.homeScore} - {pronostic.awayScore}
          </span>
          {pronostic.points !== undefined && (
            <span style={{
              fontWeight: 700,
              color: (pronostic.points ?? 0) > 0 ? 'var(--success)' : 'var(--fg-muted)',
              marginLeft: '8px',
            }}>
              +{pronostic.points} pts
            </span>
          )}
        </div>
      )}
    </div>
  )
}
