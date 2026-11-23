import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getMatchesByJournee } from '@/services/firestoreService'
import { savePronostic, getPronostic } from '@/services/pronosticService'
import type { Match, Pronostic } from '@/types'
import MatchCard from '@/components/MatchCard'

export default function GrillePage() {
  const { user } = useAuth()
  const [journee, setJournee] = useState(1)
  const [matches, setMatches] = useState<Match[]>([])
  const [pronostics, setPronostics] = useState<Record<string, Pronostic>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  const loadJournee = useCallback(async (j: number) => {
    setLoading(true)
    try {
      const m = await getMatchesByJournee(j)
      setMatches(m)

      if (user) {
        const pronoMap: Record<string, Pronostic> = {}
        for (const match of m) {
          const p = await getPronostic(user.uid, match.id)
          if (p) pronoMap[match.id] = p
        }
        setPronostics(pronoMap)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadJournee(journee)
  }, [journee, loadJournee])

  async function handleSave(matchId: string, home: number, away: number, matchDate: Date) {
    if (!user) return
    setSaving(matchId)
    try {
      await savePronostic(user.uid, matchId, home, away, matchDate)
      setPronostics((prev) => ({
        ...prev,
        [matchId]: {
          id: `${user.uid}_${matchId}`,
          userId: user.uid,
          matchId,
          homeScore: home,
          awayScore: away,
          matchDate,
        },
      }))
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(null)
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <h1 style={{ fontSize: '1.5rem' }}>Journée {journee}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setJournee((j) => Math.max(1, j - 1))}
            disabled={journee <= 1}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            ← Précédente
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setJournee((j) => Math.min(38, j + 1))}
            disabled={journee >= 38}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Suivante →
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--fg-muted)' }}>Chargement...</p>
      ) : matches.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ color: 'var(--fg-muted)' }}>Aucun match pour cette journée.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              pronostic={pronostics[match.id]}
              onSave={handleSave}
              saving={saving === match.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
