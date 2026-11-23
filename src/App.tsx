import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext, useAuthState } from '@/hooks/useAuth'
import Layout from '@/components/Layout'
import LoginPage from '@/pages/LoginPage'
import HomePage from '@/pages/HomePage'
import GrillePage from '@/pages/GrillePage'
import RankingPage from '@/pages/RankingPage'
import ProfilePage from '@/pages/ProfilePage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthState()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  const authState = useAuthState()

  if (authState.loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        color: 'var(--fg-muted)',
      }}>
        Chargement...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={authState}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            authState.user ? <Navigate to="/" replace /> : <LoginPage />
          } />
          <Route element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route path="/" element={<HomePage />} />
            <Route path="/grille" element={<GrillePage />} />
            <Route path="/classement" element={<RankingPage />} />
            <Route path="/profil" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
