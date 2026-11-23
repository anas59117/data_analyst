import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Pronostic } from '@/types'

function toPronostic(id: string, data: Record<string, unknown>): Pronostic {
  return {
    id,
    userId: data.userId as string,
    matchId: data.matchId as string,
    homeScore: data.homeScore as number,
    awayScore: data.awayScore as number,
    matchDate: (data.matchDate as { toDate: () => Date }).toDate(),
    points: data.points as number | undefined,
  }
}

export async function savePronostic(
  userId: string,
  matchId: string,
  homeScore: number,
  awayScore: number,
  matchDate: Date,
) {
  const pronoId = `${userId}_${matchId}`
  await setDoc(doc(db, 'pronostics', pronoId), {
    userId,
    matchId,
    homeScore,
    awayScore,
    matchDate,
  })
}

export async function getPronostic(userId: string, matchId: string): Promise<Pronostic | null> {
  const pronoId = `${userId}_${matchId}`
  const snap = await getDoc(doc(db, 'pronostics', pronoId))
  if (!snap.exists()) return null
  return toPronostic(snap.id, snap.data())
}

export async function getUserPronostics(userId: string): Promise<Pronostic[]> {
  const q = query(
    collection(db, 'pronostics'),
    where('userId', '==', userId),
    orderBy('matchDate', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => toPronostic(d.id, d.data()))
}
