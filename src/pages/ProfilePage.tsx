import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getUserProfile } from '@/services/authService'
import { getUserPronostics } from '@/services/pronosticService'
import type { Pronostic } from '@/types'

export default function ProfilePage() {
  const { user } = useAuth()
  const [points, setPoints] = useState(0)
  const [pronostics, setPronostics] = useState<Pronostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    Promise.all([
      getUserProfile(user.uid),
      getUserPronostics(user.uid),
    ])
      .then(([profile, pronos]) => {
        if (profile && 'points' in profile) setPoints((profile as unknown as { points: number }).points)
        setPronostics(pronos)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return <p style={{ color: 'var(--fg-muted)' }}>Chargement...</p>
  }

  const withPoints = pronostics.filter((p) => p.points !== undefined)
  const totalCorrect = withPoints.filter((p) => (p.points ?? 0) > 0).length

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Profil</h1>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'var(--font-heading)',
          }}>
            {user?.displayName?.charAt(0).toUpperCase() ?? '?'}
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem' }}>{user?.displayName}</h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem' }}>{user?.email}</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          textAlign: 'center',
        }}>
          <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--accent)',
            }}>
              {points}
            </div>
            <div style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Points</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}>
              {pronostics.length}
            </div>
            <div style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Pronos</div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--success)',
            }}>
              {totalCorrect}
            </div>
            <div style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginTop: '4px' }}>Bons</div>
          </div>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Derniers pronostics</h2>
        {pronostics.length === 0 ? (
          <p style={{ color: 'var(--fg-muted)' }}>Aucun pronostic enregistré.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pronostics.slice(0, 20).map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>
                  {p.homeScore} - {p.awayScore}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--fg-muted)',
                }}>
                  {p.matchDate.toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
                {p.points !== undefined && (
                  <span style={{
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    color: (p.points ?? 0) > 0 ? 'var(--success)' : 'var(--fg-muted)',
                  }}>
                    +{p.points}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
