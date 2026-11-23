import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getRanking } from '@/services/firestoreService'
import type { User } from '@/types'

export default function RankingPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRanking()
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p style={{ color: 'var(--fg-muted)' }}>Chargement...</p>
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Classement</h1>

      {users.length === 0 ? (
        <p style={{ color: 'var(--fg-muted)' }}>Aucun joueur pour le moment.</p>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid var(--border)',
                textAlign: 'left',
              }}>
                <th style={{ padding: '14px 16px', width: '50px', color: 'var(--fg-muted)', fontWeight: 500 }}>#</th>
                <th style={{ padding: '14px 16px', color: 'var(--fg-muted)', fontWeight: 500 }}>Joueur</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--fg-muted)', fontWeight: 500 }}>Pronos</th>
                <th style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--fg-muted)', fontWeight: 500 }}>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => {
                const isMe = u.uid === currentUser?.uid
                return (
                  <tr
                    key={u.uid}
                    style={{
                      borderBottom: i < users.length - 1 ? '1px solid var(--border)' : 'none',
                      background: isMe ? 'var(--bg-input)' : 'transparent',
                    }}
                  >
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 700,
                      color: i < 3 ? 'var(--accent)' : 'var(--fg-muted)',
                    }}>
                      {i + 1}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: isMe ? 700 : 400,
                    }}>
                      {u.displayName}
                      {isMe && <span style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', marginLeft: '8px' }}>(toi)</span>}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--fg-muted)' }}>
                      {u.pronosticsCount}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      textAlign: 'right',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                    }}>
                      {u.points}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
