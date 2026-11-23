export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number | null
  awayScore: number | null
  date: Date
  journee: number
  status: 'scheduled' | 'live' | 'finished'
  homeLogo?: string
  awayLogo?: string
}

export interface User {
  uid: string
  displayName: string
  email: string
  points: number
  pronosticsCount: number
}

export interface Pronostic {
  id: string
  userId: string
  matchId: string
  homeScore: number
  awayScore: number
  matchDate: Date
  points?: number
}
