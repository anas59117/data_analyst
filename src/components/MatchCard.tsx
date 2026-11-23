import { useState } from 'react'
import type { Match, Pronostic } from '@/types'

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
        marginBottom: '12px',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          J{match.journee}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{dateStr}</span>
        {match.status === 'finished' && (
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'var(--success)',
            color: '#fff',
            fontWeight: 600,
          }}>
            Terminé
          </span>
        )}
        {match.status === 'live' && (
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'var(--danger)',
            color: '#fff',
            fontWeight: 600,
          }}>
            En cours
          </span>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ textAlign: 'right', fontWeight: 600, fontSize: '0.95rem' }}>
          {match.homeTeam}
        </div>

        {match.status === 'finished' || match.status === 'live' ? (
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.3rem',
            fontWeight: 700,
            minWidth: '60px',
            textAlign: 'center',
          }}>
            {match.homeScore} - {match.awayScore}
          </div>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', textAlign: 'center' }}>
            vs
          </div>
        )}

        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
          {match.awayTeam}
        </div>
      </div>

      {onSave && canEdit && (
        <div style={{
          marginTop: '14px',
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
