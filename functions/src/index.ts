import { onSchedule } from 'firebase-functions/v2/scheduler'
import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import * as admin from 'firebase-admin'

admin.initializeApp()

const FOOTBALL_API_KEY = defineSecret('FOOTBALL_API_KEY')
const API_BASE = 'https://api.football-data.org/v4'
const LIGUE1_CODE = 'FL1'

interface ApiMatch {
  id: number
  utcDate: string
  matchday: number
  status: string
  homeTeam: { name: string; crest: string }
  awayTeam: { name: string; crest: string }
  score: {
    fullTime: { home: number | null; away: number | null }
  }
}

function mapStatus(apiStatus: string): 'scheduled' | 'live' | 'finished' {
  switch (apiStatus) {
    case 'FINISHED':
      return 'finished'
    case 'IN_PLAY':
    case 'PAUSED':
    case 'HALFTIME':
      return 'live'
    default:
      return 'scheduled'
  }
}

async function syncLigue1Matches(apiKey: string): Promise<number> {
  const res = await fetch(`${API_BASE}/competitions/${LIGUE1_CODE}/matches`, {
    headers: { 'X-Auth-Token': apiKey },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`)
  }

  const data = await res.json() as { matches: ApiMatch[] }
  const db = admin.firestore()

  const BATCH_LIMIT = 500
  let count = 0

  for (let i = 0; i < data.matches.length; i += BATCH_LIMIT) {
    const chunk = data.matches.slice(i, i + BATCH_LIMIT)
    const batch = db.batch()

    for (const match of chunk) {
      const docRef = db.collection('matches').doc(`fl1_${match.id}`)
      batch.set(docRef, {
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        homeLogo: match.homeTeam.crest || null,
        awayLogo: match.awayTeam.crest || null,
        homeScore: match.score.fullTime.home,
        awayScore: match.score.fullTime.away,
        date: admin.firestore.Timestamp.fromDate(new Date(match.utcDate)),
        journee: match.matchday,
        status: mapStatus(match.status),
      }, { merge: true })
      count++
    }

    await batch.commit()
  }

  return count
}

// Sync tous les jours à 6h du matin (UTC)
export const scheduledSync = onSchedule({
  schedule: 'every day 06:00',
  timeZone: 'Europe/Paris',
  secrets: [FOOTBALL_API_KEY],
  region: 'europe-west1',
}, async () => {
  const count = await syncLigue1Matches(FOOTBALL_API_KEY.value())
  console.log(`Synced ${count} Ligue 1 matches`)
})

// Endpoint HTTP pour sync manuelle
export const syncNow = onRequest({
  secrets: [FOOTBALL_API_KEY],
  region: 'europe-west1',
  cors: true,
}, async (req, res) => {
  try {
    const count = await syncLigue1Matches(FOOTBALL_API_KEY.value())
    res.json({ success: true, matchesSynced: count })
  } catch (err) {
    console.error('Sync failed:', err)
    res.status(500).json({ success: false, error: (err as Error).message })
  }
})
