import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getScheduledMatches } from '@/services/firestoreService'
import type { Match } from '@/types'
import MatchCard from '@/components/MatchCard'

export default function HomePage() {
  const { user } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getScheduledMatches()
      .then(setMatches)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const upcoming = matches.slice(0, 5)

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>
          Salut {user?.displayName} !
        </h1>
        <p style={{ color: 'var(--fg-muted)' }}>
          Bienvenue sur Gwin, fais tes pronostics pour la Ligue 1.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <Link to="/grille" className="card" style={{
          textDecoration: 'none',
          color: 'var(--fg)',
          textAlign: 'center',
          transition: 'border-color 0.15s',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</div>
          <h3 style={{ fontSize: '1rem' }}>Grille</h3>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Remplis tes pronos
          </p>
        </Link>

        <Link to="/classement" className="card" style={{
          textDecoration: 'none',
          color: 'var(--fg)',
          textAlign: 'center',
          transition: 'border-color 0.15s',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ fontSize: '1rem' }}>Classement</h3>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Vois ta position
          </p>
        </Link>

        <Link to="/profil" className="card" style={{
          textDecoration: 'none',
          color: 'var(--fg)',
          textAlign: 'center',
          transition: 'border-color 0.15s',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👤</div>
          <h3 style={{ fontSize: '1rem' }}>Profil</h3>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            Tes stats perso
          </p>
        </Link>
      </div>

      <section>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
          Prochains matchs
        </h2>

        {loading ? (
          <p style={{ color: 'var(--fg-muted)' }}>Chargement...</p>
        ) : upcoming.length === 0 ? (
          <p style={{ color: 'var(--fg-muted)' }}>Aucun match à venir pour le moment.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcoming.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {matches.length > 5 && (
          <Link
            to="/grille"
            style={{
              display: 'inline-block',
              marginTop: '16px',
              fontSize: '0.9rem',
              fontWeight: 600,
            }}
          >
            Voir tous les matchs →
          </Link>
        )}
      </section>
    </div>
  )
}
