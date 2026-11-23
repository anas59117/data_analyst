import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  onSnapshot,
  type QueryConstraint,
  type Unsubscribe,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Match, User } from '@/types'

function toMatch(id: string, data: Record<string, unknown>): Match {
  return {
    id,
    homeTeam: data.homeTeam as string,
    awayTeam: data.awayTeam as string,
    homeScore: (data.homeScore as number) ?? null,
    awayScore: (data.awayScore as number) ?? null,
    date: (data.date as { toDate: () => Date }).toDate(),
    journee: data.journee as number,
    status: data.status as Match['status'],
    homeLogo: data.homeLogo as string | undefined,
    awayLogo: data.awayLogo as string | undefined,
  }
}

export async function getMatchesByJournee(journee: number): Promise<Match[]> {
  const q = query(
    collection(db, 'matches'),
    where('journee', '==', journee),
    orderBy('date', 'asc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => toMatch(d.id, d.data()))
}

export function subscribeMatches(
  constraints: QueryConstraint[],
  callback: (matches: Match[]) => void,
): Unsubscribe {
  const q = query(collection(db, 'matches'), ...constraints)
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => toMatch(d.id, d.data())))
  })
}

export async function getScheduledMatches(): Promise<Match[]> {
  const q = query(
    collection(db, 'matches'),
    where('status', '==', 'scheduled'),
    orderBy('date', 'asc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => toMatch(d.id, d.data()))
}

export async function getRanking(): Promise<User[]> {
  const snap = await getDocs(collection(db, 'users'))
  const users = snap.docs.map((d) => ({
    uid: d.id,
    ...d.data(),
  })) as User[]
  return users.sort((a, b) => b.points - a.points)
}
