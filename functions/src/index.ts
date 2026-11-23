import { onSchedule } from 'firebase-functions/v2/scheduler'
import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import * as admin from 'firebase-admin'

admin.initializeApp()

const API_FOOTBALL_KEY = defineSecret('API_FOOTBALL_KEY')
const API_HOST = 'v3.football.api-sports.io'
const LIGUE1_ID = 61

interface ApiFixture {
  fixture: {
    id: number
    date: string
    status: { short: string; long: string }
  }
  league: { round: string }
  teams: {
    home: { id: number; name: string; logo: string }
    away: { id: number; name: string; logo: string }
  }
  goals: { home: number | null; away: number | null }
}

function mapStatus(shortStatus: string): 'scheduled' | 'live' | 'finished' {
  switch (shortStatus) {
    case 'FT':
    case 'AET':
    case 'PEN':
      return 'finished'
    case '1H':
    case '2H':
    case 'HT':
    case 'ET':
    case 'BT':
    case 'P':
    case 'LIVE':
      return 'live'
    default:
      return 'scheduled'
  }
}

function extractJournee(round: string): number {
  const match = round.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : 1
}

async function syncLigue1(apiKey: string, season?: number): Promise<number> {
  const currentSeason = season ?? new Date().getFullYear()

  const res = await fetch(
    `https://${API_HOST}/fixtures?league=${LIGUE1_ID}&season=${currentSeason}`,
    {
      headers: {
        'x-apisports-key': apiKey,
      },
    },
  )

  if (!res.ok) {
    throw new Error(`API-Football error ${res.status}: ${await res.text()}`)
  }

  const data = await res.json() as { response: ApiFixture[]; errors: Record<string, string> }

  if (Object.keys(data.errors).length > 0) {
    throw new Error(`API-Football errors: ${JSON.stringify(data.errors)}`)
  }

  const fixtures = data.response
  if (!fixtures || fixtures.length === 0) {
    // Si la saison en cours ne retourne rien, essayer l'année précédente
    if (!season) {
      return syncLigue1(apiKey, currentSeason - 1)
    }
    return 0
  }

  const db = admin.firestore()
  const BATCH_LIMIT = 500

  let count = 0

  for (let i = 0; i < fixtures.length; i += BATCH_LIMIT) {
    const chunk = fixtures.slice(i, i + BATCH_LIMIT)
    const batch = db.batch()

    for (const f of chunk) {
      const docRef = db.collection('matches').doc(`apif_${f.fixture.id}`)
      batch.set(docRef, {
        homeTeam: f.teams.home.name,
        awayTeam: f.teams.away.name,
        homeLogo: f.teams.home.logo || null,
        awayLogo: f.teams.away.logo || null,
        homeScore: f.goals.home,
        awayScore: f.goals.away,
        date: admin.firestore.Timestamp.fromDate(new Date(f.fixture.date)),
        journee: extractJournee(f.league.round),
        status: mapStatus(f.fixture.status.short),
      }, { merge: true })
      count++
    }

    await batch.commit()
  }

  return count
}

// Sync tous les jours à 6h du matin (heure de Paris)
export const scheduledSync = onSchedule({
  schedule: 'every day 06:00',
  timeZone: 'Europe/Paris',
  secrets: [API_FOOTBALL_KEY],
  region: 'europe-west1',
}, async () => {
  const count = await syncLigue1(API_FOOTBALL_KEY.value())
  console.log(`Synced ${count} Ligue 1 matches`)
})

// Endpoint HTTP pour sync manuelle
export const syncNow = onRequest({
  secrets: [API_FOOTBALL_KEY],
  region: 'europe-west1',
  cors: true,
}, async (req, res) => {
  try {
    const count = await syncLigue1(API_FOOTBALL_KEY.value())
    res.json({ success: true, matchesSynced: count })
  } catch (err) {
    console.error('Sync failed:', err)
    res.status(500).json({ success: false, error: (err as Error).message })
  }
})
